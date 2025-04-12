export interface IsSuccess {
  name: string;
  email: string;
  cuisine_kind: string | null;
  price_level: number | null;
  neighborhood: string | null;
  zip_code: string | null;
  address: string | null;
  tel: string | null;
  total_seats: number | null;
  payment_method: string | null;
  parking: string | null;
  description: string | null;
  business_hours_note: string | null;
}

export type LoaderDTO = IsSuccess | null;