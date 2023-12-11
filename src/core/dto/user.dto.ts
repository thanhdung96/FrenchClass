import { IBaseDto } from '@app/base/base.model';

export interface UserDto extends IBaseDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string | undefined;
  phoneNumber: string | undefined;
  password?: string;
}
