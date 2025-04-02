import type { CuisineLabels } from "~/types/enums/CuisineLabels";
import type { Neighborhood } from "~/types/enums/Neighborhood";
import type { PriceLevel } from "~/types/PriceLabel";

export interface FilterCondition {
  cuisine?: CuisineLabels[];
  price?: PriceLevel;
  neighborhood?: Neighborhood[];
}

export type FetchBusinessesArgs = FilterCondition & {
  take?: number;
  skip?: number;
}