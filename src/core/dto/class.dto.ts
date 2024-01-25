import { AbstractBaseDto } from '@app/base/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType, Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { StudentDto } from './student.dto';

export class ClassDto extends AbstractBaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  paymentType: PaymentType;

  @ApiProperty()
  fullCost?: number;

  @ApiProperty()
  individualCost?: number;
}

export class CreateClassDto extends ClassDto {
  @ApiProperty()
  sessions?: SessionDto[];

  mainTeacherId: string;

  @ApiProperty()
  // students?: StudentDto[];
  studentIds?: string[];
}

export class SessionDto extends AbstractBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  sessionName: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}

export class ClassEnrollDto {
  @ApiProperty()
  @IsNotEmpty()
  studentIds: string[];
}

export class AttendanceSheetDto {
  @ApiProperty()
  studentIds: string[];
}
