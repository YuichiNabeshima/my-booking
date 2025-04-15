import type { RestaurantCard } from '../../types/RestaurantCard';

export interface LoaderServiceArgsDTO {
  page?: number;
  cuisine?: string;
  price?: number;
  neighborhood?: string;
}

export interface LoaderServiceResult {
  cards: RestaurantCard[];
  totalPages: number;
}

export type LoaderServiceResultDTO = LoaderServiceResult | null;
