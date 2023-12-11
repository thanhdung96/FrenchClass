import { IBaseDto } from '@app/base/base.model';
import { AbstractCrudService } from '@app/base/base.service';
import { UserDto } from '@app/core/dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends AbstractCrudService {
  constructor() {
    super();
  }

  update(id: string, entity: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  save(entity: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  saveMany(entities: UserDto[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: UserDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  async getUserByUsername(username: string): Promise<UserDto | null> {
    return await this.prisma.user.findFirst({ where: { username } });
  }

  async getManyByFilter(filter: IBaseDto): Promise<UserDto[]> {
    return await this.prisma.user.findMany({
      where: { ...filter },
    });
  }
}
