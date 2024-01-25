import { Prisma } from '@prisma/client';

export const PrismaUser = Prisma.validator<Prisma.UserDefaultArgs>()({
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

export type PrismaUserType = Prisma.UserGetPayload<typeof PrismaUser>;

export const PrismaUserDetail = Prisma.validator<Prisma.UserDefaultArgs>()({
  ...PrismaUser,
  include: {
    class: true,
  },
});

export type PrismaUserDetailType = Prisma.UserGetPayload<
  typeof PrismaUserDetail
>;
