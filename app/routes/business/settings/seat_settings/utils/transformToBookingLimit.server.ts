import type { BookingCapacityRepositoryDTO } from '~/.server/repositories/dtos/BookingCapacityRepositoryDTO';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';

import type { BookingLimit, TimeSegments, Week } from '../types/BookingLimit';

const DEFAULT_TIME_SEGMENTS: TimeSegments = {
  time_0_1: 0,
  time_1_2: 0,
  time_2_3: 0,
  time_3_4: 0,
  time_4_5: 0,
  time_5_6: 0,
  time_6_7: 0,
  time_7_8: 0,
  time_8_9: 0,
  time_9_10: 0,
  time_10_11: 0,
  time_11_12: 2,
  time_12_13: 2,
  time_13_14: 2,
  time_14_15: 2,
  time_15_16: 0,
  time_16_17: 0,
  time_17_18: 2,
  time_18_19: 2,
  time_19_20: 2,
  time_20_21: 2,
  time_21_22: 0,
  time_22_23: 0,
  time_23_24: 0,
};

export const transformToBookingLimit = (
  capacities: BookingCapacityRepositoryDTO[],
): BookingLimit => {
  const initialBookingLimit: BookingLimit = {
    barSeats: Object.fromEntries(
      Object.values(DAY_OF_WEEK).map((day) => [day, { ...DEFAULT_TIME_SEGMENTS }]),
    ) as Week,
    tableSeats: Object.fromEntries(
      Object.values(DAY_OF_WEEK).map((day) => [day, { ...DEFAULT_TIME_SEGMENTS }]),
    ) as Week,
    businessHours: [],
  };

  return capacities.reduce<BookingLimit>((acc, curr) => {
    const { day, customer_kind, ...times } = curr;

    const timeSegments: TimeSegments = Object.fromEntries(
      Object.entries(times).filter(([key]) => key.startsWith('time_')),
    ) as Record<keyof TimeSegments, number>;

    if (customer_kind === CUSTOMER_KIND.SINGLE) {
      acc.barSeats[day] = timeSegments;
    } else if (customer_kind === CUSTOMER_KIND.GROUP) {
      acc.tableSeats[day] = timeSegments;
    }

    return acc;
  }, initialBookingLimit);
};
