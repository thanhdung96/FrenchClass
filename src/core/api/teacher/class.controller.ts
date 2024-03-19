import { AbstractCrudController } from '@app/base/base.controller';
import { ClassEnrollDto, CreateClassDto } from '@app/core/dto/class.dto';
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
import {
  PrismaClassDetailType,
  PrismaClassType,
} from '@app/core/types/class.type';

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
  ): Promise<PrismaClassDetailType> {
    data.mainTeacherId = request.user.id;
    return await this.classService.save({ ...data });
  }

  @Patch(':id')
  async patch(
    @Request() request: any,
    @Param('id') id: string,
    @Body() data: CreateClassDto,
  ): Promise<PrismaClassDetailType> {
    const classDetail = await this.classService.getOneByIdAndTeacher(
      id,
      request.user.id,
    );
    if (!classDetail) {
      throw new NotFoundException();
    }

    return await this.classService.update(id, data);
  }

  @Get()
  async index(
    @Request() request: any,
    @Query() pagination: PaginationDto,
  ): Promise<PrismaClassType[]> {
    const filter = new CreateClassDto();
    return await this.classService.getManyByFilter(
      {
        ...filter,
        mainTeacherId: request.user.id,
      },
      pagination,
    );
  }

  @Get(':id')
  async detail(
    @Request() request: any,
    @Param('id') id: string,
  ): Promise<PrismaClassDetailType> {
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
  ): Promise<PrismaClassType | ApiResponseDto> {
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

    return await this.classService.enrollStudents(
      lstEnrollingStudents,
      classToEnroll,
    );
  }

  @Post('unenroll/:classId')
  async unenrollStudents(
    @Request() request,
    @Param('classId') classId: string,
    @Body() { studentIds }: ClassEnrollDto,
  ): Promise<PrismaClassType | ApiResponseDto> {
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

    return await this.classService.unEnrollStudents(
      lstUnenrollingStudents,
      classToEnroll,
    );
  }
}
