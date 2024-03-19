import { SecurityService } from '@app/core/module/security/security.service';
import { LocalAuthGuard } from '@app/core/security/local.guard';
import { Public } from '@app/core/security/public.decorator';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenDto } from '@app/core/dto/security.dto';

@Controller()
@Public()
@ApiTags('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AccessTokenDto> {
    return this.securityService.login(req.user);
  }
}
