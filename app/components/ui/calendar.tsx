import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export type CalendarProps = {
  mode?: 'single';
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
  name?: string;
};

export function Calendar({
  mode: _mode = 'single',
  selected,
  onSelect,
  className,
  disabled,
  name,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (onSelect && (!disabled || !disabled(selectedDate))) {
      onSelect(selectedDate);
    }
  };

  const isSelected = (day: number) => {
    return (
      selected?.getDate() === day &&
      selected?.getMonth() === currentMonth.getMonth() &&
      selected?.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDisabled = (day: number) => {
    if (!disabled) return false;
    return disabled(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  return (
    <div className={cn('p-3', className)}>
      <input type="hidden" name={name} value={selected?.toISOString() ?? ''} />
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-medium text-sm py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-1">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
        {days.map((day) => (
          <Button
            key={day}
            variant="ghost"
            className={cn(
              'h-9 w-9 p-0 font-normal',
              isSelected(day) &&
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              isToday(day) && 'border border-primary',
              isDisabled(day) && 'opacity-50 cursor-not-allowed',
            )}
            disabled={isDisabled(day)}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
