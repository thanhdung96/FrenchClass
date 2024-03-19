import { AbstractBaseDto } from '@app/base/base.model';
import { AbstractCrudService } from '@app/base/base.service';
import { ClassDto } from '@app/core/dto/class.dto';
import {
  PaginationDto,
  StudentPaginationDto,
} from '@app/core/dto/pagination.dto';
import { StudentDto } from '@app/core/dto/student.dto';
import { StudentValidateResult } from '@app/core/dto/validate.dto';
import { Injectable } from '@nestjs/common';
import {
  PrismaStudent,
  PrismaStudentDetail,
  PrismaStudentDetailType,
  PrismaStudentType,
} from '@app/core/types/student.type';

@Injectable()
export class StudentService extends AbstractCrudService {
  constructor() {
    super();
  }

  async save(entity: StudentDto): Promise<PrismaStudentType> {
    return await this.prisma.student.create({
      data: {
        ...entity,
      },
      ...PrismaStudent,
    });
  }

  async saveMany(entities: StudentDto[]): Promise<PrismaStudentType[]> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, entity: StudentDto): Promise<PrismaStudentType> {
    return await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        ...entity,
      },
      ...PrismaStudent,
    });
  }

  async delete(entity: StudentDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAll(pagination: StudentPaginationDto): Promise<PrismaStudentType[]> {
    return await this.prisma.student.findMany({
      ...PrismaStudent,
      skip: pagination.page * pagination.size,
      take: Number(pagination.size),
    });
  }

  async getById(id: string): Promise<PrismaStudentDetailType> {
    return await this.prisma.student.findUnique({
      include: {
        ...PrismaStudentDetail.include,
      },
      where: {
        id,
      },
    });
  }

  async getManyByFilter(
    filter: AbstractBaseDto,
    pagination: PaginationDto,
  ): Promise<PrismaStudentType[]> {
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

  async checkIfStudentInClass(
    student: StudentDto,
    classToCheck: ClassDto,
  ): Promise<boolean> {
    return true;
  }
}
