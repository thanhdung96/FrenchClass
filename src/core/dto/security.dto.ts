import { AbstractBaseDto } from '@app/base/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto extends AbstractBaseDto {
  @Length(1, 64)
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class AccessTokenDto {
  accessToken: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}
