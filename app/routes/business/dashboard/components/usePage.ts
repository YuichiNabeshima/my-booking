import { startOfToday } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function usePage() {
  const today = startOfToday();
  const [date, setDate] = useState<Date>(today);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const dateParam = searchParams.get('dates');
    if (dateParam) {
      if (dateParam !== date.toISOString().slice(0, 10)) {
        const d = new Date(dateParam);
        d.setDate(d.getDate() + 1);
        setDate(d);
      }
    }
  }, []);

  useEffect(() => {
    const currentDateParam = date.toLocaleDateString('en-CA');
    setSearchParams((prev) => {
      prev.set('dates', currentDateParam);
      return prev;
    });
  }, [date, setSearchParams]);

  return {
    date,
    setDate,
    today,
  };
}
