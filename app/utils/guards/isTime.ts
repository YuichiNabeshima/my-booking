import { TIME_SLOTS } from "~/constants/TIME_SLOT";
import type { Time } from "~/types/Time";

export function isTime(time: string): time is Time {
  if (TIME_SLOTS.includes(time)) {
    return true;
  }
  return false;
}