import { AbstractBaseDto } from '@app/base/base.model';
import { AbstractCrudService } from '@app/base/base.service';
import { StudentPaginationDto } from '@app/core/dto/pagination.dto';
import { StudentDto } from '@app/core/dto/student.dto';
import {
  AbstractValidateResult,
  StudentValidateResult,
} from '@app/core/dto/validate.dto';
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

  async saveMany(entities: StudentDto[]): Promise<void> {
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

  async delete(entity: StudentDto): Promise<boolean> {
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

  async getManyByFilter(filter: AbstractBaseDto): Promise<StudentDto[]> {
    throw new Error('Method not implemented.');
  }

  async validate({
    username,
    email,
  }: StudentDto): Promise<StudentValidateResult> {
    // aggregating through requirements
    const aggregateUsername = await this.prisma.student.aggregate({
      _count: {
        username: true,
      },
      where: {
        username,
      },
    });
    const aggregateEmail = await this.prisma.student.aggregate({
      _count: {
        email: true,
      },
      where: {
        email,
      },
    });

    // generating result
    const result = this.generateErrorMessages({
      username: aggregateUsername._count.username,
      email: aggregateEmail._count.email,
    });

    return result;
  }

  generateErrorMessages(
    validateResult: StudentValidateResult,
  ): StudentValidateResult {
    validateResult.isValid =
      validateResult.email == 0 && validateResult.username == 0;

    let messages = [];
    if (validateResult.email != 0) {
      messages.push('duplicated email');
    }
    if (validateResult.username != 0) {
      messages.push('duplicated username');
    }
    validateResult.messages = messages;

    return validateResult;
  }
}
