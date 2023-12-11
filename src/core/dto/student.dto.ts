import { IBaseDto } from '@app/base/base.model';

export interface StudentDto extends IBaseDto {
  firstName: string;
  lastName: string;
  username: string;
  email?: string | undefined;
  phoneNumber?: string | undefined;
}

export interface StudentDetailDto extends IBaseDto {
  firstName: string;
  lastName: string;
  username: string;
  email?: string | undefined;
  phoneNumber?: string | undefined;
}
