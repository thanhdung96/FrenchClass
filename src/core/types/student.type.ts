import { Prisma } from '@prisma/client';

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

export type PrismaUserType = Prisma.StudentGetPayload<typeof PrismaStudent>;

export const PrismaStudentDetail =
  Prisma.validator<Prisma.StudentDefaultArgs>()({
    ...PrismaStudent,
    include: {
      enrolledClasses: true,
      attendedSession: true,
      paymentHistories: true,
    },
  });

export type PrismaStudentDetailType = Prisma.StudentGetPayload<
  typeof PrismaStudentDetail
>;
