import type { BookingCapacityRepositoryDTO } from "~/.server/repositories/dtos/BookingCapacityRepositoryDTO";
import type { Time } from "~/types/Time";

export class BookingCapacityManagerService {
  private timeSlots: Record<Time, number>;

  constructor(bookingCapacity: BookingCapacityRepositoryDTO) {
    const timeSlots: Record<Time, number> = Object.fromEntries(
      [...Array(24)].flatMap((_, h) =>
        ['00', '15', '30', '45'].map(m => [`${h.toString().padStart(2, '0')}:${m}`, 0])
      )
    ) as Record<Time, number>;

    for (let h = 0; h < 24; h++) {
      const columnName = `time_${h}_${h + 1}` as keyof BookingCapacityRepositoryDTO;
      
      const maxBookings = bookingCapacity[columnName] as number;

      const slots = [`${h.toString().padStart(2, '0')}:00`, `${h.toString().padStart(2, '0')}:15`, `${h.toString().padStart(2, '0')}:30`, `${h.toString().padStart(2, '0')}:45`] as Time[];
      
      slots.forEach(slot => {
        timeSlots[slot] = maxBookings;
      });
    }

    this.timeSlots = timeSlots;
  }

  getCapacityByTime(time: Time) {
    return this.timeSlots[time];
  }
}