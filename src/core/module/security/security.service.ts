import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { verifyPassword } from 'src/app/encryption.service';
import { UserDto } from '@app/core/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '@app/core/dto/security.dto';
import { PrismaUserSecurityType } from '@app/core/types/user.type';

@Injectable()
export class SecurityService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<PrismaUserSecurityType> {
    const user = await this.userService.getUserByUsername(username);

    if (user == null) {
      return null;
    }

    if (await verifyPassword(user.password, password)) {
      // const { password, ...result } = user;
      // return result;
      return user;
    }

    return null;
  }

  async login(user: UserDto): Promise<AccessTokenDto> {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
