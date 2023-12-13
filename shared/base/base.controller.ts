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

  abstract index(query: PaginationDto): Promise<AbstractBaseDto[]>;
  abstract detail(id: string): Promise<AbstractBaseDto>;
}

export abstract class AbstractCrudController extends AbstractReadonlyController {
  constructor(service: AbstractReadOnlyService) {
    super(service);
  }

  abstract create(data: AbstractBaseDto): Promise<AbstractBaseDto>;
  abstract patch(id: string, data: AbstractBaseDto): Promise<AbstractBaseDto>;
}
