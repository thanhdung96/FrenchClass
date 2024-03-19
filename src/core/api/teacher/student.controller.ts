import { AbstractCrudController } from '@app/base/base.controller';
import { StudentPaginationDto } from '@app/core/dto/pagination.dto';
import { StudentDto } from '@app/core/dto/student.dto';
import { StudentService } from '@app/core/module/student/student.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  PrismaStudentDetailType,
  PrismaStudentType,
} from '@app/core/types/student.type';

@Controller('students')
@ApiTags('student')
export class StudentController extends AbstractCrudController {
  constructor(private readonly studentService: StudentService) {
    super(studentService);
  }

  @Get()
  async index(
    @Request() request: any,
    @Query() query: StudentPaginationDto,
  ): Promise<PrismaStudentType[]> {
    return await this.studentService.getAll(query);
  }

  @Post()
  async create(
    @Request() request: any,
    @Body() studentDto: StudentDto,
  ): Promise<PrismaStudentType> {
    const validateResult = await this.studentService.validate(studentDto);

    if (!validateResult.isValid) {
      throw new BadRequestException(validateResult.messages);
    }

    return await this.studentService.save(studentDto);
  }

  @Patch(':id')
  async patch(
    @Request() request: any,
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
  ): Promise<PrismaStudentType> {
    const student = await this.studentService.getById(id);
    if (!student) {
      throw new NotFoundException();
    }

    return await this.studentService.update(id, studentDto);
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<PrismaStudentDetailType> {
    const student = await this.studentService.getById(id);
    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }
}
