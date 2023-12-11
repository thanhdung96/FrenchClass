import { OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { encryptPassword } from './encryption.service';
import { DEFAULT_USER_PASSWORD } from './constants';

export class AppService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    await this.seedDefaultUser();
  }

  async seedDefaultUser(): Promise<void> {
    const prisma = new PrismaClient();
    const defaultUser = await prisma.user.findFirst({
      where: {
        email: 'sample.teacher@email.com',
      },
    });

    if (defaultUser == null) {
      await prisma.user.create({
        data: {
          firstName: 'sample',
          lastName: 'teacher',
          username: 'steacher',
          email: 'sample.teacher@email.com',
          password: await encryptPassword(DEFAULT_USER_PASSWORD),
        },
      });

      console.log('default user created');
    }
  }
}
