import type { CustomerKind } from "~/types/CustomerKind";

export interface HandleActionArgsDTO {
  numberOfGuests: number;
  customerKind: CustomerKind;
  courseId: number;
  date: Date;
  time: string;
  fullName: string;
  email: string;
  businessId: number;
  url: string;
}

export interface HandleActionResultDTO {
  mail: {
    to: string;
    subject: string;
    body: string;
  };
}