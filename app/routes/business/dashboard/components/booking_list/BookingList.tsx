import { Calendar } from 'lucide-react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { BOOKING_STATUS } from '~/constants/enums/BOOKING_STATUS';
import { cn } from '~/lib/utils';

import type { LoaderResultDTO } from '../../.server/dtos/LoaderResultDTO';
import { getBusinessTimeSlots } from '../../utils/getBusinessTimeSlots';
import { isSuccess } from '../../utils/guards/isSuccess';

const STATUS_COLORS = {
  [BOOKING_STATUS.CONFIRMED]: 'bg-green-100 dark:bg-green-900/30',
  [BOOKING_STATUS.CANCELED]: 'bg-red-100 dark:bg-red-900/30',
  [BOOKING_STATUS.COMPLETED]: 'bg-blue-100 dark:bg-blue-900/30',
  [BOOKING_STATUS.NO_SHOW]: 'bg-gray-100 dark:bg-gray-900/30',
} as const;

const STATUS_LABELS = {
  [BOOKING_STATUS.CONFIRMED]: 'Confirmed',
  [BOOKING_STATUS.CANCELED]: 'Canceled',
  [BOOKING_STATUS.COMPLETED]: 'Completed',
  [BOOKING_STATUS.NO_SHOW]: 'No Show',
} as const;

export function BookingList() {
  const data = useLoaderData<LoaderResultDTO>();

  const bookings = isSuccess(data) ? data.bookings : [];
  const businessHours = isSuccess(data) ? data.businessHours : [];
  const timeSlots = getBusinessTimeSlots(businessHours);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 p-4 pb-0">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={cn('w-4 h-4 rounded', color)} />
            <span className="text-sm">{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
          </div>
        ))}
      </div>
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
                            <Link to={`/business/booking/${booking.id}`}>
                              <div
                                className={cn(
                                  STATUS_COLORS[booking.status],
                                  'cursor-pointer transition-colors',
                                  'absolute h-8 top-1/2 -translate-y-1/2 z-10',
                                  'left-[calc(50%-0.5em)] w-[calc(100%+1em)]',
                                  'flex items-center justify-center',
                                )}
                              ></div>
                            </Link>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className={cn(
                                    'w-3 h-3 rounded-full',
                                    STATUS_COLORS[booking.status],
                                  )}
                                />
                                <h4 className="text-sm font-semibold">
                                  {STATUS_LABELS[booking.status]}
                                </h4>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground text-left">
                                  <span className="font-medium">Name:</span> {booking.name}
                                </p>
                                <p className="text-sm text-muted-foreground text-left">
                                  <span className="font-medium">Email:</span> {booking.email}
                                </p>
                                <p className="text-sm text-muted-foreground text-left">
                                  <span className="font-medium">Guests:</span>{' '}
                                  {booking.numberOfguests}
                                </p>
                                <p className="text-sm text-muted-foreground text-left">
                                  <span className="font-medium">Type:</span> {booking.customerKind}
                                </p>
                                <p className="text-sm text-muted-foreground text-left">
                                  <span className="font-medium">Time:</span> {booking.startTime}~
                                  {booking.endTime}
                                </p>
                                <p className="text-sm text-muted-foreground text-left">
                                  <span className="font-medium">Course:</span> {booking.courseLabel}
                                </p>
                                {booking.note && (
                                  <p className="text-sm text-muted-foreground text-left">
                                    <span className="font-medium">Note:</span> {booking.note}
                                  </p>
                                )}
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
    </div>
  );
}
