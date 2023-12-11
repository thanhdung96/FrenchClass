import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityModule } from '@app/core/module/security/security.module';
import { UserModule } from '@app/core/module/user/user.module';

@Module({
  imports: [SecurityModule, UserModule],
  controllers: [SecurityController],
})
export class SecurityApiModule {}
