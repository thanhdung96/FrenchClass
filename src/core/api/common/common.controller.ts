import { AbstractBaseController } from '@app/base/base.controller';
import { ForgotPasswordDto } from '@app/core/dto/security.dto';
import { RegisterUserDto, UserDto } from '@app/core/dto/user.dto';
import { UserService } from '@app/core/module/user/user.service';
import { Public } from '@app/core/security/public.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class CommonController extends AbstractBaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Public()
  @Post('register')
  async register(@Body() userDto: RegisterUserDto): Promise<UserDto> {
    const validateResult = await this.userService.validate(userDto);
    if (!validateResult.isValid) {
      throw new BadRequestException(validateResult.messages);
    }

    const user = await this.userService.register(userDto);

    return user;
  }

  @Public()
  @Post('/forgot-password')
  async fotgot(@Body() { username }: ForgotPasswordDto): Promise<any> {
    let userToUpdate = await this.userService.getUserByUsername(username);

    if (!userToUpdate) {
      return {
        message: 'password changed',
      };
    }

    userToUpdate = await this.userService.forgotPassword(userToUpdate);
    return {
      message: 'password changed',
    };
  }
}
