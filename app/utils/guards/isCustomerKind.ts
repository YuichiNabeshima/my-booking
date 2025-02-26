import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import type { CustomerKind } from "~/types/CustomerKind";

export function isCustomerKind(arg: string): arg is CustomerKind {
  if (arg === CUSTOMER_KIND.SINGLE || arg === CUSTOMER_KIND.GROUP) {
    return true;
  }
  return false;
}

export function isCustomerKindSingle(arg: string): arg is Extract<CustomerKind, 'SINGLE'> {
  if (arg === CUSTOMER_KIND.SINGLE) return true;

  return false;
}

export function isCustomerKindGroup(arg: string): arg is Extract<CustomerKind, 'GROUP'> {
  if (arg === CUSTOMER_KIND.GROUP) return true;

  return false
}