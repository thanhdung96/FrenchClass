import { Prisma } from '@prisma/client';
import { PrismaClassInfo } from '@app/core/types/class.type';
import { PrismaClassSession } from '@app/core/types/session.type';

export const PrismaStudent = Prisma.validator<Prisma.StudentDefaultArgs>()({
  select: {
    id: true,
    created: true,
    updated: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
  },
});

export type PrismaStudentType = Prisma.StudentGetPayload<typeof PrismaStudent>;

export const PrismaStudentDetail =
  Prisma.validator<Prisma.StudentDefaultArgs>()({
    ...PrismaStudent,
    include: {
      enrolledClasses: {
        ...PrismaClassInfo,
      },
      attendedSession: {
        ...PrismaClassSession,
      },
      paymentHistories: true,
    },
  });

export type PrismaStudentDetailType = Prisma.StudentGetPayload<
  typeof PrismaStudentDetail
>;
