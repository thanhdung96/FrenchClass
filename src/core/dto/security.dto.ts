import { AbstractBaseDto } from '@app/base/base.model';
import { Length } from 'class-validator';

export class LoginDto extends AbstractBaseDto {
  @Length(1, 64)
  username: string;

  password: string;
}

export class AccessTokenDto {
  accessToken: string;
}
