import type { CuisineLabels } from "~/types/enums/CuisineLabels";
import type { Neighborhood } from "~/types/enums/Neighborhood";

export interface BusinessRepositoryDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  support_single: boolean;
  support_group: boolean;
  cuisine_kind: CuisineLabels | null;
  price: number | null;
  neighborhood: Neighborhood | null;
  capacity_of_group: number;
}
