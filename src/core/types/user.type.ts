import { Prisma } from '@prisma/client';
import { PrismaClassInfo } from '@app/core/types/class.type';

export const PrismaUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    created: true,
    updated: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    role: true,
  },
});

export type PrismaUserType = Prisma.UserGetPayload<typeof PrismaUser>;

export const PrismaUserSecurity = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    ...PrismaUser.select,
    password: true,
    username: true,
  },
});

export type PrismaUserSecurityType = Prisma.UserGetPayload<
  typeof PrismaUserSecurity
>;

export const PrismaUserDetail = Prisma.validator<Prisma.UserDefaultArgs>()({
  ...PrismaUser,
  include: {
    class: {
      ...PrismaClassInfo,
    },
  },
});

export type PrismaUserDetailType = Prisma.UserGetPayload<
  typeof PrismaUserDetail
>;
