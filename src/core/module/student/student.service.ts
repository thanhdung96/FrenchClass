import { IBaseDto } from '@app/base/base.model';
import { AbstractCrudService } from '@app/base/base.service';
import { StudentPaginationDto } from '@app/core/dto/pagination.dto';
import { StudentDto } from '@app/core/dto/student.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService extends AbstractCrudService {
  constructor() {
    super();
  }

  async save(entity: StudentDto): Promise<StudentDto> {
    const student = await this.prisma.student.create({
      data: {
        ...entity,
      },
    });

    return student;
  }

  saveMany(entities: StudentDto[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, entity: StudentDto): Promise<StudentDto> {
    const student = await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        ...entity,
      },
    });

    return student;
  }

  delete(entity: StudentDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAll(pagination: StudentPaginationDto): Promise<StudentDto[]> {
    const students = await this.prisma.student.findMany({
      skip: pagination.page * pagination.size,
      take: Number(pagination.size),
    });

    return students;
  }

  async getById(id: string): Promise<StudentDto | null> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    return student;
  }

  getManyByFilter(filter: IBaseDto): Promise<StudentDto[]> {
    throw new Error('Method not implemented.');
  }
}
