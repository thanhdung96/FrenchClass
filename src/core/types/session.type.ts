import { Prisma } from '@prisma/client';

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
