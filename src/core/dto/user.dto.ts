import { AbstractBaseDto } from '@app/base/base.model';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  firstName: string;

  @Length(1, 64)
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @Length(1, 64)
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @Length(1, 128)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @MaxLength(16)
  @IsPhoneNumber('VI')
  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  password?: string;
}

export class RegisterUserDto extends AbstractBaseDto {
  @Length(1, 64)
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @Length(1, 64)
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @Length(1, 64)
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @Length(1, 128)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @MaxLength(16)
  @ApiProperty()
  phoneNumber?: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
