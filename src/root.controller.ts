import { AbstractBaseController } from '@app/base/base.controller';
import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from './core/security/public.decorator';

@Controller()
@Public()
export class RootController extends AbstractBaseController {
  @Get('')
  @Redirect('/api')
  baseRoute() {}
}
