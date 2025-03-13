import type { BookingCapacityRepositoryDTO } from "~/.server/repositories/dtos/BookingCapacityRepositoryDTO";
import type { BookingLimit, TimeSegments, Week } from "../types/BookingLimit";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";

export const transformToBookingLimit = (capacities: BookingCapacityRepositoryDTO[]): BookingLimit => {
  return capacities.reduce<BookingLimit>(
    (acc, curr) => {
      const { day, customer_kind, ...times } = curr;

      const timeSegments: TimeSegments = Object.fromEntries(
        Object.entries(times)
          .filter(([key]) => key.startsWith("time_"))
      ) as Record<keyof TimeSegments, number>;

      if (customer_kind === CUSTOMER_KIND.SINGLE) {
        acc.barSheet[day] = timeSegments;
      } else if (customer_kind === CUSTOMER_KIND.GROUP) {
        acc.tableSheet[day] = timeSegments;
      }

      return acc;
    },
    {
      barSheet: {} as Week,
      tableSheet: {} as Week,
    }
  );
};
