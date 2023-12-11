import { SecurityService } from '@app/core/module/security/security.service';
import { LocalAuthGuard } from '@app/core/security/local.guard';
import { Public } from '@app/core/security/public.decorator';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller()
@Public()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.securityService.login(req.user);
  }
}
