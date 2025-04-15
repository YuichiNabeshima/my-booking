export interface LoaderServiceArgsDTO {
  businessId: number;
  token: string;
}

export interface LoaderServiceResultDTO {
  fullName: string;
  email: string;
  businessName: string;
  dateTime: string;
  courseName: string;
  customerKind: string;
  numberOfGuests: number;
}
