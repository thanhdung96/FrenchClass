import { AbstractBaseController } from '@app/base/base.controller';
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
  @Get('profile')
  async getProfile(@Request() request): Promise<UserDto> {
    const user = await this.userService.getUserByUsername(request.username);

    const { password, ...result } = user;
    return result;
  }
}
