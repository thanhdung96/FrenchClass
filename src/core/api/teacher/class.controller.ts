import { AbstractCrudController } from '@app/base/base.controller';
import {
  ClassDto,
  ClassEnrollDto,
  CreateClassDto,
} from '@app/core/dto/class.dto';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { ApiResponseDto } from '@app/core/dto/response.dto';
import { StudentDto } from '@app/core/dto/student.dto';
import { ClassService } from '@app/core/module/class/class.service';
import { StudentService } from '@app/core/module/student/student.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Class } from '@prisma/client';

@Controller('classes')
@ApiTags('classes')
export class ClassController extends AbstractCrudController {
  constructor(
    private readonly classService: ClassService,
    private readonly studentService: StudentService,
  ) {
    super(classService);
  }

  @Post()
  async create(
    @Request() request: any,
    @Body() data: CreateClassDto,
  ): Promise<Class> {
    data.mainTeacherId = request.user.id;
    const newClass = await this.classService.save({ ...data });

    return newClass;
  }

  @Patch(':id')
  async patch(
    @Request() request: any,
    @Param('id') id: string,
    @Body() data: CreateClassDto,
  ): Promise<Class> {
    const classDetail = await this.classService.getOneByIdAndTeacher(
      id,
      request.user.id,
    );
    if (!classDetail) {
      throw new NotFoundException();
    }

    const updatedClass = await this.classService.update(id, data);

    return updatedClass;
  }

  @Get()
  async index(
    @Request() request: any,
    @Query() pagination: PaginationDto,
  ): Promise<Class[]> {
    const filter = new CreateClassDto();
    const classes = await this.classService.getManyByFilter(
      {
        ...filter,
        mainTeacherId: request.user.id,
      },
      pagination,
    );

    return classes;
  }

  @Get(':id')
  async detail(
    @Request() request: any,
    @Param('id') id: string,
  ): Promise<Class> {
    const classDetail = await this.classService.getOneByIdAndTeacher(
      id,
      request.user.id,
    );

    if (!classDetail) {
      throw new NotFoundException();
    }

    return classDetail;
  }

  @Post('enroll/:classId')
  async enrollStudents(
    @Request() request,
    @Param('classId') classId: string,
    @Body() { studentIds }: ClassEnrollDto,
  ): Promise<ClassDto | ApiResponseDto> {
    const classToEnroll = await this.classService.getOneByIdAndTeacher(
      classId,
      request.user.id,
    );
    if (!classToEnroll) {
      throw new NotFoundException('class not found');
    }

    // check if student exists
    let lstStudentsNotExist: string[] = [];
    let lstEnrollingStudents: StudentDto[] = [];
    await Promise.all(
      studentIds.map(async (studentId) => {
        const enrollingStudent = await this.studentService.getById(studentId);
        if (enrollingStudent != null) {
          lstEnrollingStudents.push(enrollingStudent);
        } else {
          lstStudentsNotExist.push(studentId);
        }
      }),
    );

    if (lstStudentsNotExist.length) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'student not exist',
        detail: lstStudentsNotExist,
      };
    }

    const enrolledClass = await this.classService.enrollStudents(
      lstEnrollingStudents,
      classToEnroll,
    );

    return enrolledClass;
  }

  @Post('unenroll/:classId')
  async unenrollStudents(
    @Request() request,
    @Param('classId') classId: string,
    @Body() { studentIds }: ClassEnrollDto,
  ): Promise<ClassDto | ApiResponseDto> {
    const classToEnroll = await this.classService.getOneByIdAndTeacher(
      classId,
      request.user.id,
    );
    if (!classToEnroll) {
      throw new NotFoundException('class not found');
    }

    // check if student exists
    let lstStudentsNotExist: string[] = [];
    let lstUnenrollingStudents: StudentDto[] = [];
    await Promise.all(
      studentIds.map(async (studentId) => {
        const unenrollingStudent = await this.studentService.getById(studentId);
        if (unenrollingStudent != null) {
          lstUnenrollingStudents.push(unenrollingStudent);
        } else {
          lstStudentsNotExist.push(studentId);
        }
      }),
    );

    if (lstStudentsNotExist.length) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'student not exist',
        detail: lstStudentsNotExist,
      };
    }

    const resultClass = await this.classService.unEnrollStudents(
      lstUnenrollingStudents,
      classToEnroll,
    );

    return resultClass;
  }
}
