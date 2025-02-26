import type { CustomerKind } from "~/types/CustomerKind";
import type { Time } from "~/types/Time";
import type { Success } from "../../types/Status";

export interface ActionServiceArgsDTO {
  fullName: string;
  email: string;
  businessId: number;
  date: Date;
  time: Time;
  courseId: number;
  customerKind: CustomerKind;
  numberOfguests: number;
}

export interface ActionServiceResultDTO {
  status: Success;
  mail?: {
    subject: string;
    body: string;
  },
}