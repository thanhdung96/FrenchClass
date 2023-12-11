import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SecurityService } from './security.service';
import { UserDto } from '../../dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly securityService: SecurityService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = this.securityService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
