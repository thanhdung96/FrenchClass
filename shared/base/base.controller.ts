import { AbstractBaseModel } from './base.model';
import { IReadOnlyService } from './base.service';

export abstract class AbstractBaseController {
  constructor(private readonly service: IReadOnlyService) {}
}

export abstract class AbstractReadonlyController extends AbstractBaseController {
  constructor(service: IReadOnlyService) {
    super(service);
  }

  abstract index();
  abstract detail(id: string);
}

export abstract class AbstractCrudController extends AbstractReadonlyController {
  constructor(service: IReadOnlyService) {
    super(service);
  }

  abstract create(data: AbstractBaseModel);
  abstract patch(id: string, data: AbstractBaseModel);
}
