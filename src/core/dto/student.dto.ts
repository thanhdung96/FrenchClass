import { AbstractBaseDto } from '@app/base/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MaxLength, IsPhoneNumber } from 'class-validator';

export class StudentDto extends AbstractBaseDto {
  @Length(1, 64)
  @ApiProperty()
  firstName: string;

  @Length(1, 64)
  @ApiProperty()
  lastName: string;

  @Length(1, 64)
  @ApiProperty()
  username: string;

  @Length(1, 128)
  @IsEmail()
  @ApiProperty()
  email: string;

  @MaxLength(16)
  @IsPhoneNumber('VI')
  @ApiProperty()
  phoneNumber?: string;
}

export class StudentDetailDto extends AbstractBaseDto {
  @Length(1, 64)
  @ApiProperty()
  firstName: string;

  @Length(1, 64)
  @ApiProperty()
  lastName: string;

  @Length(1, 64)
  @ApiProperty()
  username: string;

  @Length(1, 128)
  @IsEmail()
  @ApiProperty()
  email?: string;

  @MaxLength(16)
  @IsPhoneNumber('VI')
  @ApiProperty()
  phoneNumber?: string;
}
