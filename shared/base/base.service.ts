import { PrismaClient } from '@prisma/client';
import { IBaseDto } from './base.model';
import { PaginationDto } from '@app/core/dto/pagination.dto';

export interface IReadOnlyService {
  getAll(pagination: PaginationDto): Promise<IBaseDto[]>;

  getById(id: string): Promise<IBaseDto>;

  getManyByFilter(filter: IBaseDto): Promise<IBaseDto[]>;
}

export abstract class AbstractReadOnlyService implements IReadOnlyService {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  abstract getAll(pagination: PaginationDto): Promise<IBaseDto[]>;

  abstract getById(id: string): Promise<IBaseDto | null>;

  abstract getManyByFilter(filter: IBaseDto): Promise<IBaseDto[]>;
}

export interface ICrudService extends IReadOnlyService {
  save(entity: IBaseDto): Promise<IBaseDto | null>;

  saveMany(entities: IBaseDto[]): Promise<void>;

  update(id: string, entity: IBaseDto): Promise<IBaseDto>;

  delete(entity: IBaseDto): Promise<boolean>;
}

export abstract class AbstractCrudService
  extends AbstractReadOnlyService
  implements ICrudService
{
  constructor() {
    super();
  }

  abstract update(id: string, entity: IBaseDto): Promise<IBaseDto>;

  abstract save(entity: IBaseDto): Promise<IBaseDto>;

  abstract saveMany(entities: IBaseDto[]): Promise<void>;

  abstract delete(entity: IBaseDto): Promise<boolean>;
}
