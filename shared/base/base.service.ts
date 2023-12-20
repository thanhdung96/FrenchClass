import { PrismaClient } from '@prisma/client';
import { AbstractBaseDto } from './base.model';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { AbstractValidateResult } from '@app/core/dto/validate.dto';

export interface IReadOnlyService {
  getAll(pagination: PaginationDto): Promise<AbstractBaseDto[]>;

  getById(id: string): Promise<AbstractBaseDto>;

  getManyByFilter(filter: AbstractBaseDto, pagination: PaginationDto): Promise<AbstractBaseDto[]>;
}

export abstract class AbstractReadOnlyService implements IReadOnlyService {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  abstract getAll(pagination: PaginationDto): Promise<AbstractBaseDto[]>;

  abstract getById(id: string): Promise<AbstractBaseDto | null>;

  abstract getManyByFilter(filter: AbstractBaseDto, pagination: PaginationDto): Promise<AbstractBaseDto[]>;
}

export interface ICrudService extends IReadOnlyService {
  save(entity: AbstractBaseDto): Promise<AbstractBaseDto | null>;

  saveMany(entities: AbstractBaseDto[]): Promise<AbstractBaseDto[]>;

  update(id: string, entity: AbstractBaseDto): Promise<AbstractBaseDto>;

  delete(entity: AbstractBaseDto): Promise<boolean>;

  validate(entity: AbstractBaseDto): Promise<AbstractValidateResult>;

  generateErrorMessages(validateResult: AbstractValidateResult): AbstractValidateResult;
}

export abstract class AbstractCrudService
  extends AbstractReadOnlyService
  implements ICrudService
{
  constructor() {
    super();
  }

  abstract update(id: string, entity: AbstractBaseDto): Promise<AbstractBaseDto>;

  abstract save(entity: AbstractBaseDto): Promise<AbstractBaseDto>;

  abstract saveMany(entities: AbstractBaseDto[]): Promise<AbstractBaseDto[]>;

  abstract delete(entity: AbstractBaseDto): Promise<boolean>;

  abstract validate(entity: AbstractBaseDto): Promise<AbstractValidateResult>;

  abstract generateErrorMessages(validateResult: AbstractValidateResult): AbstractValidateResult;
}
