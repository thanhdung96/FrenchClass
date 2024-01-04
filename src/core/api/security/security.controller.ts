import { ApiResponseDto } from '@app/core/dto/response.dto';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
} from '@app/core/dto/security.dto';
import { SecurityService } from '@app/core/module/security/security.service';
import { UserService } from '@app/core/module/user/user.service';
import { LocalAuthGuard } from '@app/core/security/local.guard';
import { Public } from '@app/core/security/public.decorator';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('security')
export class SecurityController {
  constructor(
    private readonly securityService: SecurityService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.securityService.login(req.user);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() { username }: ForgotPasswordDto): Promise<any> {
    let userToUpdate = await this.userService.getUserByUsername(username);

    if (!userToUpdate) {
      return {
        message: 'password changed',
        status: HttpStatus.OK,
      };
    }

    userToUpdate = await this.userService.forgotPassword(userToUpdate);
    return {
      message: 'password changed',
      status: HttpStatus.OK,
    };
  }

  @Public()
  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() { password, newPassword }: ChangePasswordDto,
  ): Promise<ApiResponseDto> {
    const username = req.username;
    const user = await this.securityService.validateUser(username, password);

    if (!user) {
      return {
        message: 'incorrect password',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    await this.userService.changePassword(user, newPassword);

    return {
      message: 'password changed',
      status: HttpStatus.OK,
    };
  }
}
