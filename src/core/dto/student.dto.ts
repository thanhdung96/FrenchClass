import { AbstractBaseDto } from '@app/base/base.model';
import { Length, IsEmail, MaxLength, IsPhoneNumber } from 'class-validator';

export class StudentDto extends AbstractBaseDto {
  @Length(1, 64)
  firstName: string;

  @Length(1, 64)
  lastName: string;

  @Length(1, 64)
  username: string;

  @Length(1, 128)
  @IsEmail()
  email: string;

  @MaxLength(16)
  @IsPhoneNumber('VI')
  phoneNumber?: string;
}

export class StudentDetailDto extends AbstractBaseDto {
  @Length(1, 64)
  firstName: string;

  @Length(1, 64)
  lastName: string;

  @Length(1, 64)
  username: string;

  @Length(1, 128)
  @IsEmail()
  email?: string;

  @MaxLength(16)
  @IsPhoneNumber('VI')
  phoneNumber?: string;
}
