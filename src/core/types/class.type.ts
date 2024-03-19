import { Prisma } from '@prisma/client';
import { PrismaStudent } from './student.type';
import { PrismaUser } from './user.type';
import { PrismaClassSession } from '@app/core/types/session.type';

export const PrismaClassInfo = Prisma.validator<Prisma.ClassDefaultArgs>()({
  select: {
    id: true,
    name: true,
    description: true,
    paymentType: true,
    individualCost: true,
    fullCost: true,
    created: true,
    updated: true,
  },
});

export type PrismaClassInfoType = Prisma.ClassGetPayload<typeof PrismaClass>;

export const PrismaClass = Prisma.validator<Prisma.ClassDefaultArgs>()({
  ...PrismaClassInfo,
  include: {
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
  ...PrismaClassInfo,
  include: {
    mainTeacher: {
      ...PrismaUser,
    },
    students: {
      ...PrismaStudent,
    },
    sessions: {
      ...PrismaClassSession,
    },
  },
});

export type PrismaClassDetailType = Prisma.ClassGetPayload<
  typeof PrismaClassDetail
>;
