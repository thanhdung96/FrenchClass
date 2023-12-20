import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { SessionModule } from '../session/session.module';
import { StudentModule } from '../student/student.module';

@Module({
  providers: [ClassService],
  exports: [ClassService],
  imports: [SessionModule, StudentModule],
})
export class ClassModule {}
