import type { Time } from '~/types/Time';

import { BookingCapacityManagerService } from './BookingCapacityManagerService';
import { BookingTrackerService } from './BookingTrackerService';

export class BookingAvailabilityCheckerService {
  private bookingTracker: BookingTrackerService;
  private bookingCapacityManager: BookingCapacityManagerService;

  constructor(
    bookingTracker: BookingTrackerService,
    bookingCapacityManager: BookingCapacityManagerService,
  ) {
    this.bookingTracker = bookingTracker;
    this.bookingCapacityManager = bookingCapacityManager;
  }

  /**
   * Booking capacity for a specified time - Get the number of booking
   */
  getAvailabilityByTime(time: Time): number {
    const capacity = this.bookingCapacityManager.getCapacityByTime(time);
    const bookedCount = this.bookingTracker.getBookingCount(time);
    return capacity - bookedCount;
  }

  /**
   * Reservation capacity for all hours - get the number of reservations as an object
   */
  getAllAvailabilities(): Record<Time, number> {
    const availabilities: Record<Time, number> = Object.fromEntries(
      Object.keys(this.bookingCapacityManager['timeSlots']).map((time) => {
        const t = time as Time;
        return [t, this.getAvailabilityByTime(t)];
      }),
    ) as Record<Time, number>;

    return availabilities;
  }
}
