import type { CuisineKind } from '~/types/enums/CuisineKind';
import type { Neighborhood } from '~/types/enums/Neighborhood';

export interface BusinessRepositoryDTO {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  support_single: boolean;
  support_group: boolean;
  cuisine_kind: CuisineKind | null;
  price_level: number | null;
  neighborhood: Neighborhood | null;
  capacity_of_group: number;
  zip_code: string | null;
  address: string | null;
  tel: string | null;
  total_seats: number | null;
  payment_method: string | null;
  business_hours_note: string | null;
  parking: string | null;
  description: string | null;
}
