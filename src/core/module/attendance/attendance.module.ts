import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Module({
  exports: [AttendanceService],
  providers: [AttendanceService],
})
export class AttendaceModule {}
