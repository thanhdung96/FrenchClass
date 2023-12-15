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
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('student')
export class StudentController extends AbstractCrudController {
  constructor(private readonly studentService: StudentService) {
    super(studentService);
  }

  @Get()
  async index(@Query() query: StudentPaginationDto): Promise<StudentDto[]> {
    return await this.studentService.getAll(query);
  }

  @Post()
  async create(@Body() studentDto: StudentDto): Promise<StudentDto> {
    const validateResult = await this.studentService.validate(studentDto);
    console.log(validateResult);

    if (!validateResult.isValid) {
      throw new BadRequestException(validateResult.messages);
    }

    const student = await this.studentService.save(studentDto);
    return student;
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
  ): Promise<StudentDto> {
    let student = await this.studentService.getById(id);
    if (!student) {
      throw new NotFoundException();
    }

    return await this.studentService.update(id, studentDto);
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<StudentDto> {
    const student = await this.studentService.getById(id);
    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }
}
