import { Calendar } from 'lucide-react';
import { useLoaderData } from 'react-router';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';

import type { LoaderResultDTO } from '../../.server/dtos/LoaderResultDTO';
import { getBusinessTimeSlots } from '../../utils/getBusinessTimeSlots';
import { isSuccess } from '../../utils/guards/isSuccess';

export function BookingList() {
  const data = useLoaderData<LoaderResultDTO>();

  const bookings = isSuccess(data) ? data.bookings : [];
  const businessHours = isSuccess(data) ? data.businessHours : [];
  const timeSlots = getBusinessTimeSlots(businessHours);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] sticky left-0 bg-white z-20">Reserver name</TableHead>
          {timeSlots.map((slot, slotIndex) => (
            <TableHead
              key={`slot-${slotIndex}-${slot.time}`}
              className={cn(
                'text-center relative min-w-[60px]',
                slot.isDivider && 'border-l-2 border-dashed border-gray-300',
              )}
            >
              <div className="flex flex-col items-center justify-end h-full">
                {slot.isDivider && (
                  <span className="text-xs text-muted-foreground absolute -top-4">
                    {slot.label}
                  </span>
                )}
                <span
                  className="mt-1 absolute whitespace-nowrap"
                  style={{ left: 'calc(50% - 0.5em)' }}
                >
                  {slot.time}
                </span>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 ? (
          <TableRow>
            <TableCell className="sticky left-0 bg-white w-[200px]">
              <div className="py-4">&nbsp;</div>
            </TableCell>
            {timeSlots.map((slot, index) => (
              <TableCell
                key={slot.time}
                className={cn(
                  'text-center py-8',
                  slot.isDivider && 'border-l-2 border-dashed border-gray-300',
                )}
              >
                {index % 12 === 0 ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No bookings</p>
                  </div>
                ) : index % 12 === 6 ? (
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-sm text-muted-foreground">No bookings</p>
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="py-4">&nbsp;</div>
                )}
              </TableCell>
            ))}
          </TableRow>
        ) : (
          bookings.map((booking, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium sticky left-0 bg-white z-20">
                {booking.name}
              </TableCell>
              {timeSlots.map((slot, slotIndex) => {
                return (
                  <TableCell
                    key={`booking-${idx}-slot-${slotIndex}-${booking.name}-${booking.startTime}-${booking.endTime}-${booking.numberOfguests}-${booking.customerKind}-${slot.time}`}
                    className={cn(
                      'p-0 text-center relative min-w-[60px]',
                      slot.isDivider && 'border-l-2 border-dashed border-gray-300',
                    )}
                  >
                    {booking.startTime <= slot.time && slot.time < booking.endTime ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div
                            className={cn(
                              booking.customerKind === 'Bar Sheet'
                                ? 'cursor-pointer transition-colors bg-green-100 dark:bg-green-900/30'
                                : 'cursor-pointer transition-colors bg-red-100 dark:bg-red-900/30',
                              'absolute h-8 top-1/2 -translate-y-1/2 z-10',
                              'left-[calc(50%-0.5em)] w-[calc(100%+1em)]',
                            )}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">{booking.name}</h4>
                              <p className="text-sm text-muted-foreground text-left">
                                {`${booking.numberOfguests} ${
                                  booking.numberOfguests > 2 ? 'people' : 'person'
                                }`}
                              </p>
                              <p className="text-sm text-muted-foreground text-left">
                                {booking.customerKind}
                              </p>
                              <p className="text-sm text-muted-foreground text-left">{`${booking.startTime}~${booking.endTime}`}</p>
                              <p className="text-sm text-muted-foreground text-left">
                                {booking.courseLabel}
                              </p>
                              <p className="text-sm text-muted-foreground text-left">
                                {booking.note}
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <div className="py-4">&nbsp;</div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
