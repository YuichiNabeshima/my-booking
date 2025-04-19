export interface RestaurantCard {
  uuid: string;
  thumbnail?: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  description?: string;
  tags: string[];
  priceLevel?: number;
}
