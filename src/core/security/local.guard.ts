import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SecurityService } from '../module/security/security.service';
import { PrismaUserSecurityType } from '../types/user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly securityService: SecurityService) {
    super();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<PrismaUserSecurityType> {
    const user = await this.securityService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
