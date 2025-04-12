import type { CustomerKind } from "~/types/enums/CustomerKind";

export interface LoaderServiceArgsDTO {
  businessId: number;
  customerKind: CustomerKind;
  courseId: number;
  date: Date;
}

export interface LoaderServiceResultDTO {
  avaliability: {
    [time: string]: number;
  };
}