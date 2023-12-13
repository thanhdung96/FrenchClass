import { AbstractBaseDto } from '@app/base/base.model';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  MaxLength,
} from 'class-validator';

export class UserDto extends AbstractBaseDto {
  @Length(1, 64)
  @IsNotEmpty()
  firstName: string;

  @Length(1, 64)
  @IsNotEmpty()
  lastName: string;

  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Length(1, 128)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(16)
  @IsPhoneNumber('VI')
  phoneNumber?: string;

  password?: string;
}

export class RegisterUserDto extends AbstractBaseDto {
  @Length(1, 64)
  @IsNotEmpty()
  firstName: string;

  @Length(1, 64)
  @IsNotEmpty()
  lastName: string;

  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Length(1, 128)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(16)
  phoneNumber?: string;

  @IsNotEmpty()
  password: string;
}
