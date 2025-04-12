export interface RestaurantCard {
  id: number;
  thumbnail?: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  description?: string;
  tags: string[];
  priceLevel?: number;
}