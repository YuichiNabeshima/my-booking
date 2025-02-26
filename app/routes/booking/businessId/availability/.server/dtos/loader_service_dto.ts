import type { CustomerKind } from "~/types/CustomerKind";

export interface GetLoaderDataArgsDTO {
  businessId: number;
  customerKind: CustomerKind;
  courseId: number;
  date: Date;
}

export interface GetLoaderDataDTO {
  avaliability: {
    [time: string]: number;
  };
}