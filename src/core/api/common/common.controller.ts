import { AbstractBaseController } from '@app/base/base.controller';
import { ApiResponseDto } from '@app/core/dto/response.dto';
import { RegisterUserDto } from '@app/core/dto/user.dto';
import { UserService } from '@app/core/module/user/user.service';
import { Public } from '@app/core/security/public.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  PrismaUserDetailType,
  PrismaUserType,
} from '@app/core/types/user.type';

@Controller()
@ApiTags('app')
export class CommonController extends AbstractBaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Public()
  @Post('register')
  async register(@Body() userDto: RegisterUserDto): Promise<PrismaUserType> {
    const validateResult = await this.userService.validate(userDto);
    if (!validateResult.isValid) {
      throw new BadRequestException(validateResult.messages);
    }

    return await this.userService.register(userDto);
  }

  @Get('/profile')
  async getProfile(@Request() request): Promise<PrismaUserDetailType> {
    return await this.userService.getById(request.user.id);
  }

  @Get('health-check')
  @Public()
  async healthCheck(): Promise<ApiResponseDto> {
    const steacher = await this.userService.getUserByUsername('steacher');

    if (steacher) {
      return {
        status: HttpStatus.OK,
        message: 'ok',
      };
    }
  }
}
