import { AbstractBaseDto } from '@app/base/base.model';
import { AbstractCrudService } from '@app/base/base.service';
import { PaginationDto } from '@app/core/dto/pagination.dto';
import { RegisterUserDto, UserDto } from '@app/core/dto/user.dto';
import { RegistrationValidateResult } from '@app/core/dto/validate.dto';
import { Injectable } from '@nestjs/common';
import { DEFAULT_USER_PASSWORD } from 'src/app/constants';
import { encryptPassword } from 'src/app/encryption.service';

@Injectable()
export class UserService extends AbstractCrudService {
  constructor() {
    super();
  }

  update(id: string, entity: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  async register(userDto: RegisterUserDto): Promise<UserDto> {
    userDto.password = await encryptPassword(
      userDto.password || DEFAULT_USER_PASSWORD,
    );
    const user = await this.save(userDto);

    const { password, ...result } = user;
    return result;
  }

  async save(userDto: RegisterUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data: {
        ...userDto,
      },
    });

    return user;
  }

  saveMany(entities: UserDto[]): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }

  delete(entity: UserDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<UserDto> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getUserByUsername(username: string): Promise<UserDto | null> {
    return await this.prisma.user.findFirst({ where: { username } });
  }

  async getManyByFilter(
    filter: AbstractBaseDto,
    pagination: PaginationDto,
  ): Promise<UserDto[]> {
    return await this.prisma.user.findMany({
      where: { ...filter },
      skip: pagination.page * pagination.size,
      take: pagination.size,
    });
  }

  async validate({
    username,
    email,
  }: UserDto): Promise<RegistrationValidateResult> {
    // aggregating through requirements
    const aggregateUsername = await this.prisma.user.aggregate({
      _count: {
        username: true,
      },
      where: {
        username,
      },
    });
    const aggregateEmail = await this.prisma.user.aggregate({
      _count: {
        email: true,
      },
      where: {
        email,
      },
    });

    // generating result
    const result = this.generateErrorMessages({
      username: aggregateUsername._count.username,
      email: aggregateEmail._count.email,
    });

    return result;
  }

  generateErrorMessages(
    validateResult: RegistrationValidateResult,
  ): RegistrationValidateResult {
    validateResult.isValid =
      validateResult.email == 0 && validateResult.username == 0;

    let messages = [];
    if (validateResult.email != 0) {
      messages.push('duplicated email');
    }
    if (validateResult.username != 0) {
      messages.push('duplicated username');
    }
    validateResult.messages = messages;

    return validateResult;
  }
}
