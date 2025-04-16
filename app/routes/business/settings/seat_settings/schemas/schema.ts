import { z } from 'zod';

import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';
import type { Week } from '../types/BookingLimit';

import { TIME_SEGMENTS } from '../constants/TIME_SEGMENTS';

const createNestedSchema = () => {
  const daySchema: Record<string, z.ZodObject<Record<string, z.ZodNumber>>> = {};

  Object.values(DAY_OF_WEEK).forEach((day) => {
    const timeSchema: Record<string, z.ZodNumber> = {};

    Object.values(TIME_SEGMENTS).forEach((time) => {
      timeSchema[time] = z.number().min(0).max(99);
    });

    daySchema[day] = z.object(timeSchema);
  });

  return z.object(daySchema);
};

export const schema = z.object({
  barSeats: createNestedSchema(),
  tableSeats: createNestedSchema(),
}) as unknown as z.ZodType<{ barSeats: Week; tableSeats: Week }>;
