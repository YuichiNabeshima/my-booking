import { useLoaderData } from 'react-router';

import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';
import { BUSINESS_HOURS_KIND } from '~/constants/enums/BUSINESS_HOURS_KIND';

import type { loader } from '../../../route';

export function useBusinessHours() {
  const data = useLoaderData<typeof loader>();
  const business = data?.business ?? null;

  const hoursByDay = Object.keys(DAY_OF_WEEK).map((day) => {
    const dayHours = business?.business_hours.filter((hour) => hour.day_of_week === day) || [];
    const isOpen = dayHours.some((hour) => hour.is_open);

    return {
      day,
      isOpen,
      hours: dayHours.sort((a, b) => {
        // Sort by hours_kind
        const kindOrder = {
          [Object.keys(BUSINESS_HOURS_KIND)[0]]: 0,
          [Object.keys(BUSINESS_HOURS_KIND)[0]]: 1,
          [Object.keys(BUSINESS_HOURS_KIND)[2]]: 2,
          [Object.keys(BUSINESS_HOURS_KIND)[3]]: 3,
          [Object.keys(BUSINESS_HOURS_KIND)[4]]: 4,
        };
        const aOrder = a.hours_kind ? kindOrder[a.hours_kind as keyof typeof kindOrder] || 99 : 99;
        const bOrder = b.hours_kind ? kindOrder[b.hours_kind as keyof typeof kindOrder] || 99 : 99;
        return aOrder - bOrder;
      }),
    };
  });

  return {
    hoursByDay,
    business,
  };
}
