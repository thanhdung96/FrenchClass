import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core/constants';
import { RouterModule } from '@nestjs/core';
import { TeacherApiModule } from './core/api/teacher/teacher.api.module';
import { SecurityApiModule } from './core/api/security/security.api.module';
import { AppService } from './app/app.service';
import { JwtAuthGuard } from './core/security/jwtauth.guard';
import { CommonApiModule } from './core/api/common/common.api.module';
import { RootController } from './root.controller';

@Module({
  imports: [
    TeacherApiModule,
    SecurityApiModule,
    CommonApiModule,
    RouterModule.register([
      {
        path: 'teacher',
        module: TeacherApiModule,
      },
      {
        path: 'security',
        module: SecurityApiModule,
      },
      {
        path: 'app',
        module: CommonApiModule,
      },
    ]),
  ],
  controllers: [RootController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
