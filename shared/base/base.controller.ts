import { IBaseDto } from './base.model';
import { AbstractReadOnlyService } from './base.service';
import { PaginationDto } from '@app/core/dto/pagination.dto';

export abstract class AbstractBaseController {
  constructor(private readonly service: AbstractReadOnlyService) {}
}

export abstract class AbstractReadonlyController extends AbstractBaseController {
  constructor(service: AbstractReadOnlyService) {
    super(service);
  }

  abstract index(query: PaginationDto): Promise<IBaseDto[]>;
  abstract detail(id: string): Promise<IBaseDto>;
}

export abstract class AbstractCrudController extends AbstractReadonlyController {
  constructor(service: AbstractReadOnlyService) {
    super(service);
  }

  abstract create(data: IBaseDto): Promise<IBaseDto>;
  abstract patch(id: string, data: IBaseDto): Promise<IBaseDto>;
}
