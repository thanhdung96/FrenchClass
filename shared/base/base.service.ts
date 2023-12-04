import { AbstractBaseModel } from './base.model';

export interface IReadOnlyService {
  getAll(): AbstractBaseModel[];
  getById(id: string): AbstractBaseModel;
  getByFilter(filter: []): AbstractBaseModel[];
}

export interface ICrudService extends IReadOnlyService {
  save(entity: AbstractBaseModel): void;
  saveMany(entities: AbstractBaseModel[]);
  delete(entity: AbstractBaseModel): void;
}
