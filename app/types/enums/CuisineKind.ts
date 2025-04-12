import type { CUISINE_KIND } from "~/constants/enums/CUISINE_KIND";

export type CuisineKind = keyof typeof CUISINE_KIND;

export type CuisineKindValues = typeof CUISINE_KIND[keyof typeof CUISINE_KIND];