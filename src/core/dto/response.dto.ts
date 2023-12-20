import { HttpStatus } from '@nestjs/common';

export class ApiResponseDto {
  status: number = HttpStatus.OK;
  message: string = 'ok';
  detail?: any;
}
