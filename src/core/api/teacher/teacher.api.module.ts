import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { PaymentController } from './payment.controller';
import { StudentController } from './student.controller';
import { UserController } from './user.controller';
import { ClassModule } from '@app/core/module/class/class.module';
import { PaymentModule } from '@app/core/module/payment/payment.module';
import { StudentModule } from '@app/core/module/student/student.module';
import { UserModule } from '@app/core/module/user/user.module';
import { AttendaceModule } from '@app/core/module/attendance/attendance.module';
import { SessionController } from './session.controller';
import { SessionModule } from '@app/core/module/session/session.module';

@Module({
  imports: [
    ClassModule,
    PaymentModule,
    StudentModule,
    UserModule,
    AttendaceModule,
    SessionModule,
  ],
  controllers: [
    ClassController,
    PaymentController,
    StudentController,
    UserController,
    SessionController,
  ],
})
export class TeacherApiModule {}
