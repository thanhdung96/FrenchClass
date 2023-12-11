import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [SecurityService, LocalStrategy, JwtStrategy],
  exports: [SecurityService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_DURATION,
      },
    }),
  ],
})
export class SecurityModule {}
