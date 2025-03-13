import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { startOfToday } from "date-fns";

export function usePage() {
  const today = startOfToday();
  const [date, setDate] = useState<Date | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (date) {
      setSearchParams(prev => {
        prev.set('dates', new Date(date).toISOString().slice(0, 10));
        return prev;
      });
    }
  }, [date]);

  return {
    date,
    setDate,
    today,
  };
}