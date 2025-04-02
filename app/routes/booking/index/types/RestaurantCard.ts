export interface RestaurantCard {
  id: number;
  thumbnail?: string;
  name: string;
  cuisine: string;
  price: number;
  neighborhood: string;
  description?: string;
  tags: string[];
  priceRange?: number;
}