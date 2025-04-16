import type { BusinessHoursRepositoryDTO } from '~/.server/repositories/dtos/BusinessHoursRepositoryDTO';
import { BUSINESS_HOURS_KIND } from '~/constants/enums/BUSINESS_HOURS_KIND';
import { TIME_SLOTS } from '~/constants/TIME_SLOT';

type TimeSlot = {
  time: string;
  isDivider?: boolean;
  label?: string;
};

export const getBusinessTimeSlots = (businessHours: BusinessHoursRepositoryDTO[]): TimeSlot[] => {
  if (!businessHours || businessHours.length === 0) {
    return TIME_SLOTS.map((time) => ({ time }));
  }

  // Get business hours for each time slot
  const allDayHours = businessHours.find(
    (hours) => hours.is_open && hours.hours_kind === BUSINESS_HOURS_KIND.ALL_DAY,
  );
  const morningHours = businessHours.find(
    (hours) => hours.is_open && hours.hours_kind === BUSINESS_HOURS_KIND.MORNING,
  );
  const lunchHours = businessHours.find(
    (hours) => hours.is_open && hours.hours_kind === BUSINESS_HOURS_KIND.LUNCH,
  );
  const dinnerHours = businessHours.find(
    (hours) => hours.is_open && hours.hours_kind === BUSINESS_HOURS_KIND.DINNER,
  );
  const barHours = businessHours.find(
    (hours) => hours.is_open && hours.hours_kind === BUSINESS_HOURS_KIND.BAR,
  );

  // If all-day hours are set, use only those hours
  if (allDayHours?.open_time && allDayHours?.close_time) {
    return TIME_SLOTS.filter(
      (time) => time >= allDayHours.open_time! && time <= allDayHours.close_time!,
    ).map((time) => ({ time }));
  }

  // Combine business hours from each time slot
  const timeRanges: { start: string; end: string; label?: string }[] = [];
  if (morningHours?.open_time && morningHours?.close_time) {
    timeRanges.push({
      start: morningHours.open_time,
      end: morningHours.close_time,
      label: 'Morning',
    });
  }
  if (lunchHours?.open_time && lunchHours?.close_time) {
    timeRanges.push({
      start: lunchHours.open_time,
      end: lunchHours.close_time,
      label: 'Lunch',
    });
  }
  if (dinnerHours?.open_time && dinnerHours?.close_time) {
    timeRanges.push({
      start: dinnerHours.open_time,
      end: dinnerHours.close_time,
      label: 'Dinner',
    });
  }
  if (barHours?.open_time && barHours?.close_time) {
    timeRanges.push({
      start: barHours.open_time,
      end: barHours.close_time,
      label: 'Bar',
    });
  }

  // Return all time slots if no business hours are set
  if (timeRanges.length === 0) {
    return TIME_SLOTS.map((time) => ({ time }));
  }

  // Combine and deduplicate business hours from all time slots
  const timeSlots: TimeSlot[] = [];
  timeRanges.forEach((range) => {
    // Add all time slots for the range
    TIME_SLOTS.forEach((time) => {
      if (time >= range.start && time <= range.end) {
        timeSlots.push({
          time,
          isDivider: time === range.start,
          label: time === range.start ? range.label : undefined,
        });
      }
    });
  });

  return timeSlots;
};
