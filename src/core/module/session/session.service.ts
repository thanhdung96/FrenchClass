import { AbstractCrudService } from '@app/base/base.service';
import { ClassDto, SessionDto } from '@app/core/dto/class.dto';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { AbstractValidateResult } from '@app/core/dto/validate.dto';
import { Injectable } from '@nestjs/common';
import { PrismaPromise, Session } from '@prisma/client';
import {
  PrismaClassSession,
  PrismaClassSessionDetail,
  PrismaClassSessionDetailType,
  PrismaClassSessionType,
} from '@app/core/types/session.type';

@Injectable()
export class SessionService extends AbstractCrudService {
  constructor() {
    super();
  }

  async update(
    id: string,
    entity: SessionDto,
  ): Promise<PrismaClassSessionType> {
    return await this.prisma.session.update({
      where: {
        id,
      },
      data: {
        ...entity,
      },
      ...PrismaClassSession,
    });
  }

  save(entity: SessionDto): Promise<SessionDto> {
    throw new Error('Method not implemented.');
  }

  saveMany(entities: SessionDto[]): Promise<SessionDto[]> {
    throw new Error('Method not implemented.');
  }

  async saveManyAndAssign(
    entities: SessionDto[],
    classDto: ClassDto,
  ): Promise<PrismaClassSessionType[]> {
    let promises: PrismaPromise<PrismaClassSessionType>[] = [];
    entities.map((entity) => {
      if (!entity.id) {
        const { id, created, updated, ...datatoSave } = entity;
        promises.push(
          this.prisma.session.create({
            ...PrismaClassSession,
            data: {
              ...datatoSave,
              class: {
                connect: {
                  id: classDto.id,
                },
              },
            },
          }),
        );
      } else {
        promises.push(
          this.prisma.session.update({
            ...PrismaClassSession,
            where: {
              id: entity.id,
            },
            data: {
              sessionName: entity.sessionName,
              description: entity.description,
              class: {
                connect: {
                  id: classDto.id,
                },
              },
            },
          }),
        );
      }
    });
    return await this.prisma.$transaction(promises);
  }

  delete(entity: SessionDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  validate(entity: SessionDto): Promise<AbstractValidateResult> {
    throw new Error('Method not implemented.');
  }
  generateErrorMessages(
    validateResult: AbstractValidateResult,
  ): AbstractValidateResult {
    throw new Error('Method not implemented.');
  }

  getAll(pagination: PaginationDto): Promise<SessionDto[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: string): Promise<SessionDto> {
    throw new Error('Method not implemented.');
  }

  async getByIdAndMainTeacher(
    id: string,
    mainTeacher: string,
  ): Promise<PrismaClassSessionDetailType> {
    return this.prisma.session.findFirst({
      include: {
        ...PrismaClassSessionDetail.include,
      },
      where: {
        id,
        class: {
          mainTeacher: {
            id: mainTeacher,
          },
        },
      },
    });
  }

  getManyByFilter(
    filter: SessionDto,
    pagination: PaginationDto,
  ): Promise<PrismaClassSessionType[]> {
    throw new Error('Method not implemented.');
  }
}
