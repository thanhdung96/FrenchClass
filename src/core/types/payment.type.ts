import { Prisma } from '@prisma/client';
import { PrismaClassSession } from '@app/core/types/session.type';
import { PrismaStudent } from '@app/core/types/student.type';

export const PrismaPaymentDetail =
  Prisma.validator<Prisma.PaymentDetailDefaultArgs>()({
    select: {
      id: true,
      created: true,
      updated: true,
    },
    include: {
      session: {
        ...PrismaClassSession,
      },
    },
  });

export type PrismaPaymentDetailType = Prisma.PaymentDetailGetPayload<
  typeof PrismaPaymentDetail
>;

export const PrismaPaymentHistory =
  Prisma.validator<Prisma.PaymentHistoryDefaultArgs>()({
    select: {
      id: true,
      created: true,
      updated: true,
      paymentStatus: true,
      totalCost: true,
      note: true,
    },
    include: {
      details: {
        ...PrismaPaymentDetail,
      },
      student: {
        ...PrismaStudent,
      },
    },
  });

export type PrismaPaymentHistoryType = Prisma.PaymentHistoryGetPayload<
  typeof PrismaPaymentHistory
>;
