import { AbstractCrudService } from '@app/base/base.service';
import { ClassDto, SessionDto } from '@app/core/dto/class.dto';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { AbstractValidateResult } from '@app/core/dto/validate.dto';
import { Injectable } from '@nestjs/common';
import { PrismaPromise, Session } from '@prisma/client';

@Injectable()
export class SessionService extends AbstractCrudService {
  constructor() {
    super();
  }

  async update(id: string, entity: Session): Promise<Session> {
    return await this.prisma.session.update({
      where: {
        id,
      },
      data: {
        ...entity,
      },
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
  ): Promise<SessionDto[]> {
    let promises: PrismaPromise<SessionDto>[] = [];
    entities.map((entity) => {
      if (!entity.id) {
        const { id, created, updated, ...datatoSave } = entity;
        promises.push(
          this.prisma.session.create({
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
    const sessions: SessionDto[] = await this.prisma.$transaction(promises);

    return sessions;
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
  ): Promise<Session> {
    return this.prisma.session.findFirst({
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
  ): Promise<SessionDto[]> {
    throw new Error('Method not implemented.');
  }
}
