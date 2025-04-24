import { addDays, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';

interface Props {
  date: Date | null;
  setDate: (date: Date) => void;
  today: Date;
}

export function DateSelectors({ date: d, setDate, today }: Props) {
  const date = d ?? new Date();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, -1))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, 1))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold">{format(date, 'MM/dd/yyyy (E)')}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setDate(today)}>
          Today
        </Button>
        <Button variant="outline" onClick={() => setDate(addDays(today, 1))}>
          Tomorrow
        </Button>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border w-full sm:w-auto"
          defaultMonth={date}
        />
      </div>
    </div>
  );
}
