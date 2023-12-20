import { AbstractBaseDto } from './base.model';
import { AbstractReadOnlyService } from './base.service';
import { PaginationDto } from '@app/core/dto/pagination.dto';

export abstract class AbstractBaseController {
  constructor(private readonly service: AbstractReadOnlyService | void) {}
}

export abstract class AbstractReadonlyController extends AbstractBaseController {
  constructor(service: AbstractReadOnlyService) {
    super(service);
  }

  abstract index(request: any, query: PaginationDto): Promise<AbstractBaseDto[]>;
  abstract detail(request: any, id: string): Promise<AbstractBaseDto>;
}

export abstract class AbstractCrudController extends AbstractReadonlyController {
  constructor(service: AbstractReadOnlyService) {
    super(service);
  }

  abstract create(request: any, data: AbstractBaseDto): Promise<AbstractBaseDto>;
  abstract patch(request: any, id: string, data: AbstractBaseDto): Promise<AbstractBaseDto>;
}
