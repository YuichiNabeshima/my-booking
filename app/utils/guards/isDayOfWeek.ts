import { DAY_OF_WEEK_ARRAY } from "~/constants/DAY_OF_WEEK";
import type { DayOfWeek } from "~/types/DayOfWeek";

export function isDayOfWeek(day: string): day is DayOfWeek {
  if (DAY_OF_WEEK_ARRAY.includes(day)) {
    return true;
  }
  return false;
}