import { IBaseDto } from '@app/base/base.model';

export interface LoginDto extends IBaseDto {
  username: string;
  password: string;
}

export interface AccessTokenDto {
  accessToken: string;
}
