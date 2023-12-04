import { Module } from '@nestjs/common';
import { AuthGuard } from '@app/core/security/auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtModule } from '@nestjs/jwt';
import { RouterModule } from '@nestjs/core';
import { TeacherApiModule } from './core/api/teacher/teacher.api.module';
import { SecurityApiModule } from './core/api/security/security.api.module';

@Module({
  imports: [
    TeacherApiModule,
    SecurityApiModule,
    RouterModule.register([
      {
        path: 'teacher',
        module: TeacherApiModule
      },
      {
        path: 'security',
        module: SecurityApiModule
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_DURATION },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
