import type { Time, Hour, Minute } from "~/types/Time";
import { InvalidTimeFormatError } from "~/.server/custom_errors/InvalidTimeFormatError";

export class BookingTrackerService {
  private timeSlots: Record<Time, number> = Object.fromEntries(
    [...Array(24)].flatMap((_, h) => 
      ['00', '15', '30', '45'].map(m => 
        [`${h.toString().padStart(2, '0')}:${m}`, 0]
      )
    )
  ) as Record<Time, number>; 

  addBooking(startTime: string, duration: number, numberOfGuests: number | null) {
    const durationCount = duration / 15;

    const timeKeys = Object.keys(this.timeSlots);
    const startIndex = timeKeys.indexOf(startTime);

    for (let i = 0; i < durationCount; i++) {
      const indexKey = timeKeys[startIndex + i];

      if (!this.isValidTime(indexKey)) {
        throw new InvalidTimeFormatError('This startTime is invalid.');
      }

      this.timeSlots[indexKey] += numberOfGuests ?? 1;
    }
  }

  getBookingCount(targetTime: string) {
    if (!this.isValidTime(targetTime)) {
      throw new InvalidTimeFormatError('This startTime is invalid.');
    }

    return this.timeSlots[targetTime];
  }

  private isValidTime(time: string): time is Time {
    let [hour, minute] = time.split(':');
    return this.isHour(hour) && this.isMinute(minute);
  }

  private isHour(hour: string): hour is Hour {
    return /^([01][0-9]|2[0-3])$/.test(hour);
  }

  private isMinute(minute: string): minute is Minute {
    return minute === '00' || minute === '15' || minute === '30' || minute === '45'
  }
}