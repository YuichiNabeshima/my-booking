import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';

export type CustomerKind = (typeof CUSTOMER_KIND)[keyof typeof CUSTOMER_KIND];
