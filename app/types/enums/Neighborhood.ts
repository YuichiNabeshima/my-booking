import type { NEIGHBORHOOD } from "~/constants/enums/NEIGHBORHOOD";

export type Neighborhood = keyof typeof NEIGHBORHOOD;

export type NeighborhoodValues = typeof NEIGHBORHOOD[keyof typeof NEIGHBORHOOD];