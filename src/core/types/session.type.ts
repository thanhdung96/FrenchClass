import { Prisma } from '@prisma/client';
import { PrismaClassInfo } from '@app/core/types/class.type';

export const PrismaClassSession = Prisma.validator<Prisma.SessionDefaultArgs>()(
  {
    select: {
      id: true,
      created: true,
      updated: true,
      sessionName: true,
      description: true,
    },
  },
);

export type PrismaClassSessionType = Prisma.SessionGetPayload<
  typeof PrismaClassSession
>;

export const PrismaClassSessionDetail =
  Prisma.validator<Prisma.SessionDefaultArgs>()({
    ...PrismaClassSession,
    include: {
      class: {
        ...PrismaClassInfo,
      },
      attendanceDetail: true,
    },
  });

export type PrismaClassSessionDetailType = Prisma.SessionGetPayload<
  typeof PrismaClassSessionDetail
>;
