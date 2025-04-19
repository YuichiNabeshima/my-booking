import type { FieldMetadata } from '@conform-to/react';
import { getInputProps } from '@conform-to/react';
import { Clock, Eye, EyeOff } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';
import { BUSINESS_HOURS_KIND } from '~/constants/enums/BUSINESS_HOURS_KIND';

import { TIME_SEGMENTS } from '../../constants/TIME_SEGMENTS';
import type { Week } from '../../types/BookingLimit';
import { formatTimeRange } from '../../utils/formatTimeRange';
import { useSeatTable } from './useSeatTable';

export function SeatTable({
  type,
  field,
  businessHours,
}: {
  type: 'barSeats' | 'tableSeats';
  field: FieldMetadata<Week>;
  businessHours: {
    day_of_week: string;
    hours_kind: string;
    is_open: boolean;
    open_time: string;
    close_time: string;
  }[];
}) {
  const { toggleDayDisabled, toggleTimeDisabled, disabledDays, disabledTimes } = useSeatTable();

  const getAvailableTimeSlots = (day: string) => {
    const dayHours = businessHours?.filter((hour) => hour.day_of_week === day);
    if (!dayHours?.length) return TIME_SEGMENTS;

    const timeSlots: string[] = [];
    Object.values(BUSINESS_HOURS_KIND).forEach((kind) => {
      const hours = dayHours.find((hour) => hour.hours_kind === kind);
      if (!hours?.open_time || !hours?.close_time) return;

      const [startHour] = hours.open_time.split(':').map(Number);
      const [endHour] = hours.close_time.split(':').map(Number);

      for (let hour = startHour; hour < endHour; hour++) {
        const timeSlot = `time_${hour}_${hour + 1}` as keyof typeof TIME_SEGMENTS;
        if (TIME_SEGMENTS[timeSlot]) {
          timeSlots.push(TIME_SEGMENTS[timeSlot]);
        }
      }
    });

    return timeSlots;
  };

  return (
    <Card className="shadow-md py-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto relative seat-table-wrapper">
            <Table className="border-collapse">
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[150px] border-r">
                    <div className="font-medium text-muted-foreground">Time Slots</div>
                  </TableHead>
                  {Object.values(DAY_OF_WEEK).map((day) => (
                    <TableHead
                      key={day}
                      className="text-center p-0 border-r last:border-r-0 bg-muted/50"
                    >
                      <div className="p-2 bg-muted/30 border-b">
                        <div className="font-medium mb-2">{day}</div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={0}
                            max={99}
                            placeholder="Bulk"
                            className="h-8 text-center bg-background/80 border-muted transition-all hover:border-primary focus:border-primary"
                            disabled={disabledDays[day]}
                            onChange={(e) => {
                              const value = e.target.value;
                              const targets = document.querySelectorAll<HTMLInputElement>(
                                `[data-type=${type}][data-day=${day}]`,
                              );
                              targets.forEach((target) => {
                                const time = target.getAttribute('data-time');
                                if (time && !disabledTimes[time]) {
                                  target.value = value;
                                }
                              });
                            }}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-8 w-8 ${
                                    disabledDays[day] ? 'text-red-500' : 'text-muted-foreground'
                                  }`}
                                  type="button"
                                  onClick={() => toggleDayDisabled(day)}
                                >
                                  {disabledDays[day] ? (
                                    <Eye className="h-4 w-4" />
                                  ) : (
                                    <EyeOff className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {disabledDays[day] ? 'Enable' : 'Disable'} all {day} inputs
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(TIME_SEGMENTS).map((time, index) => {
                  const isAnyDayAvailable = Object.values(DAY_OF_WEEK).some((day) => {
                    const availableTimeSlots = getAvailableTimeSlots(day);
                    return Object.values(availableTimeSlots).includes(time);
                  });

                  return (
                    <TableRow
                      key={time}
                      className={index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                      style={{ display: isAnyDayAvailable ? 'table-row' : 'none' }}
                    >
                      <TableCell className="font-medium border-r p-0">
                        <div className="p-2 bg-muted/20 h-full flex flex-col justify-center">
                          <div className="mb-2 flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{formatTimeRange(time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min={0}
                              max={99}
                              placeholder="Bulk"
                              className="h-8 text-center bg-background/80 border-muted transition-all hover:border-primary focus:border-primary"
                              name="bulk"
                              disabled={disabledTimes[time]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const targets = document.querySelectorAll<HTMLInputElement>(
                                  `[data-type=${type}][data-time=${time}]`,
                                );
                                targets.forEach((target) => {
                                  const day = target.getAttribute('data-day');
                                  if (day && !disabledDays[day]) {
                                    target.value = value;
                                  }
                                });
                              }}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 ${
                                      disabledTimes[time] ? 'text-red-500' : 'text-muted-foreground'
                                    }`}
                                    type="button"
                                    onClick={() => toggleTimeDisabled(time)}
                                  >
                                    {disabledTimes[time] ? (
                                      <Eye className="h-4 w-4" />
                                    ) : (
                                      <EyeOff className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {disabledTimes[time] ? 'Enable' : 'Disable'} all{' '}
                                  {formatTimeRange(time)} inputs
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </TableCell>
                      {Object.values(DAY_OF_WEEK).map((day) => {
                        const availableTimeSlots = getAvailableTimeSlots(day);
                        const isAvailable = Object.values(availableTimeSlots).includes(time);
                        const { ...timeField } = getInputProps(
                          field.getFieldset()[day].getFieldset()[time],
                          { type: 'number' },
                        );

                        return (
                          <TableCell key={timeField.name} className="p-2 border-r last:border-r-0">
                            <Input
                              className={`h-10 text-center font-medium transition-all hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                                disabledDays[day] || disabledTimes[time]
                                  ? 'opacity-50 bg-muted/20'
                                  : ''
                              }`}
                              data-type={type}
                              data-day={day}
                              data-time={time}
                              min={0}
                              max={99}
                              readOnly={disabledDays[day] || disabledTimes[time]}
                              hidden={!isAvailable}
                              {...timeField}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
