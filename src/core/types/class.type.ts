import { Prisma } from '@prisma/client';
import { PrismaStudent } from './student.type';
import { PrismaUser } from './user.type';

export const PrismaClass = Prisma.validator<Prisma.ClassDefaultArgs>()({
  include: {
    sessions: {
      select: {
        id: true,
        sessionName: true,
        description: true,
      },
    },
    mainTeacher: {
      ...PrismaUser,
    },
    students: {
      ...PrismaStudent,
    },
  },
});

export type PrismaClassType = Prisma.ClassGetPayload<typeof PrismaClass>;

export const PrismaClassDetail = Prisma.validator<Prisma.ClassDefaultArgs>()({
  include: {
    students: true,
    mainTeacher: true,
    sessions: true,
  },
});

export type PrismaClassDetailType = Prisma.ClassGetPayload<
  typeof PrismaClassDetail
>;
