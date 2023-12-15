import { AbstractBaseDto } from '@app/base/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

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
