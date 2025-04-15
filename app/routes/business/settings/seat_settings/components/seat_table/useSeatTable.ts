import { useEffect, useState } from 'react';

import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';

import { TIME_SEGMENTS } from '../../constants/TIME_SEGMENTS';

export function useSeatTable() {
  const [disabledDays, setDisabledDays] = useState<Record<string, boolean>>({});
  const [disabledTimes, setDisabledTimes] = useState<Record<string, boolean>>({});

  const toggleDayDisabled = (day: string) => {
    const newValue = !disabledDays[day];
    setDisabledDays((prev) => ({
      ...prev,
      [day]: newValue,
    }));

    if (newValue) {
      const targets = document.querySelectorAll<HTMLInputElement>(`[data-day=${day}]`);
      targets.forEach((target) => {
        target.value = '0';
      });
    }
  };

  const toggleTimeDisabled = (time: string) => {
    const newValue = !disabledTimes[time];
    setDisabledTimes((prev) => ({
      ...prev,
      [time]: newValue,
    }));

    if (newValue) {
      const targets = document.querySelectorAll<HTMLInputElement>(`[data-time=${time}]`);
      targets.forEach((target) => {
        target.value = '0';
      });
    }
  };

  useEffect(() => {
    Object.values(DAY_OF_WEEK).forEach((day) => {
      const dayTargets = document.querySelectorAll<HTMLInputElement>(`[data-day=${day}]`);
      if ([...dayTargets].every((target) => target.value === '0')) {
        setDisabledDays((prev) => ({
          ...prev,
          [day]: true,
        }));
      }
    });

    Object.values(TIME_SEGMENTS).forEach((time) => {
      const timeTargets = document.querySelectorAll<HTMLInputElement>(`[data-time=${time}]`);
      if ([...timeTargets].every((target) => target.value === '0')) {
        setDisabledTimes((prev) => ({
          ...prev,
          [time]: true,
        }));
      }
    });
  }, []);

  return {
    toggleDayDisabled,
    toggleTimeDisabled,
    disabledDays,
    disabledTimes,
  };
}
