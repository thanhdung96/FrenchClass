import { UserModule } from '@app/core/module/user/user.module';
import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';

@Module({
  imports: [UserModule],
  controllers: [CommonController],
})
export class CommonApiModule {}
