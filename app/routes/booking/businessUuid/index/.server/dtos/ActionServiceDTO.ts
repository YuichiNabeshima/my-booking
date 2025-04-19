import type { CustomerKind } from '~/types/enums/CustomerKind';

export interface ActionServiceArgsDTO {
  numberOfGuests: number;
  customerKind: CustomerKind;
  courseId: number;
  date: Date;
  time: string;
  fullName: string;
  email: string;
  url: string;
}

export interface ActionServiceResultDTO {
  mail: {
    to: string;
    subject: string;
    body: string;
  };
}
