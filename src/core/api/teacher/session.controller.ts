import { AbstractReadonlyController } from '@app/base/base.controller';
import { AbstractBaseDto } from '@app/base/base.model';
import { AttendanceSheetDto, SessionDto } from '@app/core/dto/class.dto';
import { AttendanceService } from '@app/core/module/attendance/attendance.service';
import { ClassService } from '@app/core/module/class/class.service';
import { SessionService } from '@app/core/module/session/session.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceDetail, Session } from '@prisma/client';

@Controller('sessions')
@ApiTags('sessions')
export class SessionController extends AbstractReadonlyController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly attendanceService: AttendanceService,
    private readonly classService: ClassService,
  ) {
    super(sessionService);
  }

  async index(): Promise<AbstractBaseDto[]> {
    throw new Error('Method not implemented.');
  }

  async patch(
    @Request() request: any,
    @Param('id') id: string,
    @Body() sessionDto: SessionDto,
  ): Promise<Session> {
    const sessionDetail = await this.sessionService.getByIdAndMainTeacher(
      id,
      request.user.id,
    );

    if (!sessionDetail) {
      throw new NotFoundException('sesison not found');
    }

    const updatedSession = this.sessionService.update(id, sessionDetail);

    return updatedSession;
  }

  @Get(':id')
  async detail(
    @Request() request: any,
    @Param('id') id: string,
  ): Promise<SessionDto> {
    const sessionDetail = await this.sessionService.getByIdAndMainTeacher(
      id,
      request.user.id,
    );

    if (!sessionDetail) {
      throw new NotFoundException('sesison not found');
    }
    return sessionDetail;
  }

  @Post('/attendance/:sessionId')
  async createAttendanceSheet(
    @Body() { studentIds }: AttendanceSheetDto,
    @Param('sessionId') sessionId: string,
    @Request() request: any,
  ): Promise<AttendanceDetail[]> {
    const userId = request.user.id;
    const sessionDetail = await this.sessionService.getByIdAndMainTeacher(
      sessionId,
      userId,
    );

    if (!sessionDetail) {
      throw new NotFoundException('sesison not found');
    }

    // check if student has enrolled to the class
    const lstPromises = studentIds.map(async (studentId) => {
      await this.classService.checkIfStudentEnrolled(
        sessionDetail.classId,
        studentId,
      );
    });
    await lstPromises;

    const lstAttendanceDetails =
      await this.attendanceService.createAttendanceSheet(
        { studentIds },
        sessionDetail,
      );

    return lstAttendanceDetails;
  }
}
