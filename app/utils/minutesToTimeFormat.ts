import type { Time } from "~/types/Time";
import { isTime } from "./guards/isTime";
import { InvalidTimeFormatError } from "~/.server/core/custom_error/errors/InvalidTimeFormatError";

export function minutesToTimeFormat(minutes: number): Time {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const time = `${hours}:${mins.toString().padStart(2, "0")}`;

  if (!isTime(time)) {
    throw new InvalidTimeFormatError('Time format is invalid.');
  }

  return time;
}