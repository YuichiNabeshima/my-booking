import jwt from 'jsonwebtoken';

import type { CustomerKind } from '~/types/enums/CustomerKind';

interface CreateBookingConfirmationDataTokenArgs {
  numberOfGuests: number;
  customerKind: CustomerKind;
  courseId: number;
  date: Date;
  time: string;
  fullName: string;
  email: string;
}

export interface CreateBookingConfirmationDataTokenPayload {
  guests: string;
  kind: CustomerKind;
  course: number;
  date: Date;
  time: string;
  name: string;
  email: string;
}

export function createBookingConfirmationDataToken(
  params: CreateBookingConfirmationDataTokenArgs,
  expiresIn: number = 3600,
) {
  return jwt.sign(
    {
      guests: params.numberOfGuests,
      kind: params.customerKind,
      course: params.courseId,
      date: params.date,
      time: params.time,
      name: params.fullName,
      email: params.email,
    },
    process.env.TOKEN_KEY as string,
    {
      expiresIn,
      algorithm: 'HS256',
    },
  );
}
