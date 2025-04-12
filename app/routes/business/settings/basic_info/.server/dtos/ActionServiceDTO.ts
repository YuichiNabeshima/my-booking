import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";

export interface ActionServiceArgsDTO {
  cookie: string;
  name: string;
  email: string;
  cuisine_kind: string | null;
  price_level: string | null;
  neighborhood: string | null;
  zip_code: string | null;
  address: string | null;
  tel: string | null;
  total_seats: string | null;
  payment_method: string | null;
  parking: string | null;
  description: string | null;
  business_hours_note: string | null;
}

export type ActionServiceResultDTO = BusinessRepositoryDTO | null;