import type { CuisineKind } from "~/types/enums/CuisineKind";
import type { Neighborhood } from "~/types/enums/Neighborhood";
import type { PriceLevel } from "~/types/PriceLabel";

export interface FilterCondition {
  cuisine?: CuisineKind[];
  price_level?: PriceLevel;
  neighborhood?: Neighborhood[];
}

export type FetchBusinessesArgs = FilterCondition & {
  take?: number;
  skip?: number;
}