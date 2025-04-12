import type { CuisineKind } from "~/types/enums/CuisineKind";
import type { Neighborhood } from "~/types/enums/Neighborhood";

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export interface LoaderServiceResultDTO {
  name: string;
  email: string;
  cuisine_kind: CuisineKind | null;
  price_level: number | null;
  neighborhood: Neighborhood | null;
  zip_code: string | null;
  address: string | null;
  tel: string | null;
  total_seats: number | null;
  payment_method: string | null;
  parking: string | null;
  description: string | null;
  business_hours_note: string | null;
}