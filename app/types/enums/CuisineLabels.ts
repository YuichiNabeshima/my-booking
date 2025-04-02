import type { CUISINE_LABELS } from "~/constants/enums/CUISINE_LABELS";

export type CuisineLabels = keyof typeof CUISINE_LABELS;

export type CuisineLabelsValues = typeof CUISINE_LABELS[keyof typeof CUISINE_LABELS];