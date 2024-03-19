import { AbstractCrudService } from '@app/base/base.service';
import { ClassDto, CreateClassDto } from '@app/core/dto/class.dto';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { AbstractValidateResult } from '@app/core/dto/validate.dto';
import { Injectable } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { StudentDto } from '@app/core/dto/student.dto';
import {
  PrismaClass,
  PrismaClassDetail,
  PrismaClassDetailType,
  PrismaClassType,
} from '@app/core/types/class.type';

@Injectable()
export class ClassService extends AbstractCrudService {
  constructor(private readonly sessionService: SessionService) {
    super();
  }

  async update(
    id: string,
    { sessions, studentIds, mainTeacherId, ...classDto }: CreateClassDto,
  ): Promise<PrismaClassDetailType> {
    const updatedClass = await this.prisma.class.update({
      where: {
        id,
      },
      data: {
        ...classDto,
        students: {
          connect: studentIds.map((id) => ({ id })),
        },
        mainTeacher: {
          connect: {
            id: mainTeacherId,
          },
        },
      },
      include: {
        ...PrismaClassDetail.include,
      },
    });
    await this.sessionService.saveManyAndAssign(sessions, updatedClass);
    return await this.getById(id);
  }

  async save({
    sessions,
    studentIds,
    mainTeacherId,
    ...classDto
  }: CreateClassDto): Promise<PrismaClassDetailType> {
    return await this.prisma.class.create({
      data: {
        ...classDto,
        sessions: {
          createMany: {
            data: [...sessions],
          },
        },
        students: {
          connect: studentIds.map((id) => ({ id })),
        },
        mainTeacher: {
          connect: {
            id: mainTeacherId,
          },
        },
      },
      include: {
        ...PrismaClassDetail.include,
      },
    });
  }

  async saveMany(entities: ClassDto[]): Promise<PrismaClassDetailType[]> {
    throw new Error('Method not implemented.');
  }

  async delete(entity: ClassDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async validate(entity: ClassDto): Promise<AbstractValidateResult> {
    throw new Error('Method not implemented.');
  }

  generateErrorMessages(
    validateResult: AbstractValidateResult,
  ): AbstractValidateResult {
    throw new Error('Method not implemented.');
  }

  async getAll(pagination: PaginationDto): Promise<PrismaClassType[]> {
    return await this.prisma.class.findMany({
      include: {
        ...PrismaClassDetail.include,
      },
      skip: pagination.page * pagination.size,
      take: pagination.size,
    });
  }

  async getById(id: string): Promise<PrismaClassDetailType> {
    return await this.prisma.class.findFirst({
      where: {
        id,
      },
      include: {
        ...PrismaClassDetail.include,
      },
    });
  }

  async getOneByIdAndTeacher(
    id: string,
    teacherId: string,
  ): Promise<PrismaClassDetailType> {
    return await this.prisma.class.findFirst({
      where: {
        id,
        mainTeacher: {
          id: teacherId,
        },
      },
      include: {
        ...PrismaClassDetail.include,
      },
    });
  }

  async getManyByFilter(
    { mainTeacherId }: CreateClassDto,
    pagination: PaginationDto,
  ): Promise<PrismaClassType[]> {
    return await this.prisma.class.findMany({
      where: {
        mainTeacher: {
          id: mainTeacherId,
        },
      },
      include: {
        ...PrismaClass.include,
      },
      skip: pagination.page * pagination.size,
      take: Number(pagination.size),
    });
  }

  async enrollStudents(
    students: StudentDto[],
    classToEnroll: ClassDto,
  ): Promise<PrismaClassType> {
    const enrolledClass = await this.prisma.class.update({
      where: {
        id: classToEnroll.id,
      },
      data: {
        students: {
          connect: students.map((student) => ({ id: student.id })),
        },
      },
      include: {
        ...PrismaClass.include,
      },
    });
    return enrolledClass;
  }

  async unEnrollStudents(
    students: StudentDto[],
    classToEnroll: ClassDto,
  ): Promise<PrismaClassType> {
    return await this.prisma.class.update({
      where: {
        id: classToEnroll.id,
      },
      data: {
        students: {
          disconnect: students.map((student) => ({ id: student.id })),
        },
      },
      include: {
        ...PrismaClass.include,
      },
    });
  }

  async checkIfStudentEnrolled(
    classIdToCheck: string,
    studentId: string,
  ): Promise<boolean> {
    const classToCheck = await this.getById(classIdToCheck);
    const ret = classToCheck.students.find((student) => {
      return student.id === studentId;
    });

    return ret !== undefined;
  }
}
