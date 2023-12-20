import { AbstractCrudService } from '@app/base/base.service';
import { ClassDto, CreateClassDto } from '@app/core/dto/class.dto';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { AbstractValidateResult } from '@app/core/dto/validate.dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { StudentDto } from '@app/core/dto/student.dto';
import { Class } from '@prisma/client';

@Injectable()
export class ClassService extends AbstractCrudService {
  constructor(private readonly sessionService: SessionService) {
    super();
  }

  async update(
    id: string,
    { sessions, studentIds, mainTeacherId, ...classDto }: CreateClassDto,
  ): Promise<Class> {
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
        sessions: {
          select: {
            id: true,
            sessionName: true,
            description: true,
          },
        },
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
  }: CreateClassDto): Promise<Class> {
    const newClass = await this.prisma.class.create({
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
        sessions: {
          select: {
            id: true,
            sessionName: true,
            description: true,
          },
        },
      },
    });

    return newClass;
  }

  async saveMany(entities: ClassDto[]): Promise<ClassDto[]> {
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

  async getAll(pagination: PaginationDto): Promise<ClassDto[]> {
    return await this.prisma.class.findMany({
      include: {
        mainTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
      skip: pagination.page * pagination.size,
      take: pagination.size,
    });
  }

  async getById(id: string): Promise<Class> {
    const classDetail = await this.prisma.class.findFirst({
      where: {
        id,
      },
      include: {
        mainTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
        sessions: {
          select: {
            id: true,
            sessionName: true,
            description: true,
          },
        },
      },
    });

    return classDetail;
  }

  async getOneByIdAndTeacher(id: string, teacherId: string): Promise<Class> {
    return await this.prisma.class.findFirst({
      where: {
        id,
        mainTeacher: {
          id: teacherId,
        },
      },
      include: {
        mainTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
        sessions: {
          select: {
            id: true,
            sessionName: true,
            description: true,
          },
        },
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
    });
  }

  async getManyByFilter(
    { mainTeacherId }: CreateClassDto,
    pagination: PaginationDto,
  ): Promise<Class[]> {
    return await this.prisma.class.findMany({
      where: {
        mainTeacher: {
          id: mainTeacherId,
        },
      },
      include: {
        mainTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
      skip: pagination.page * pagination.size,
      take: Number(pagination.size),
    });
  }

  async enrollStudents(
    students: StudentDto[],
    classToEnroll: ClassDto,
  ): Promise<Class> {
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
        students: true,
      },
    });

    return enrolledClass;
  }

  async unEnrollStudents(
    students: StudentDto[],
    classToEnroll: ClassDto,
  ): Promise<Class> {
    const enrolledClass = await this.prisma.class.update({
      where: {
        id: classToEnroll.id,
      },
      data: {
        students: {
          disconnect: students.map((student) => ({ id: student.id })),
        },
      },
      include: {
        students: true,
      },
    });

    return enrolledClass;
  }
}
