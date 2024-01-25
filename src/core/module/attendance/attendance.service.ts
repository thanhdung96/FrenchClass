import { AbstractBaseDto } from '@app/base/base.model';
import { AbstractCrudService } from '@app/base/base.service';
import { AttendanceSheetDto } from '@app/core/dto/class.dto';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { AbstractValidateResult } from '@app/core/dto/validate.dto';
import { Injectable } from '@nestjs/common';
import { AttendanceDetail, PrismaPromise, Session } from '@prisma/client';

@Injectable()
export class AttendanceService extends AbstractCrudService {
  constructor() {
    super();
  }

  async update(id: string, entity: AbstractBaseDto): Promise<AbstractBaseDto> {
    throw new Error('Method not implemented.');
  }

  async save(entity: AbstractBaseDto): Promise<AbstractBaseDto> {
    throw new Error('Method not implemented.');
  }

  async saveMany(entities: AbstractBaseDto[]): Promise<AbstractBaseDto[]> {
    throw new Error('Method not implemented.');
  }

  async delete(entity: AbstractBaseDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAll(pagination: PaginationDto): Promise<AbstractBaseDto[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<AbstractBaseDto> {
    throw new Error('Method not implemented.');
  }

  async getManyByFilter(filter: AbstractBaseDto): Promise<AbstractBaseDto[]> {
    throw new Error('Method not implemented.');
  }

  async validate(entity: AbstractBaseDto): Promise<AbstractValidateResult> {
    throw new Error('Method not implemented.');
  }

  generateErrorMessages(
    validateResult: AbstractValidateResult,
  ): AbstractValidateResult {
    return validateResult;
  }

  async createAttendanceSheet(
    { studentIds }: AttendanceSheetDto,
    { id }: Session,
  ): Promise<AttendanceDetail[]> {
    const lstPromises: PrismaPromise<AttendanceDetail>[] = studentIds.map(
      (studentId) => {
        return this.prisma.attendanceDetail.create({
          data: {
            session: {
              connect: {
                id,
              },
            },
            student: {
              connect: {
                id: studentId,
              },
            },
          },
        });
      },
    );
    const lstAttendanceDetails = await this.prisma.$transaction(lstPromises);

    return lstAttendanceDetails;
  }
}
