import { PRICE_LABEL } from '~/constants/PRICE_LABEL';

export type PriceLevel = keyof typeof PRICE_LABEL;
export type PriceLabel = (typeof PRICE_LABEL)[PriceLevel];
