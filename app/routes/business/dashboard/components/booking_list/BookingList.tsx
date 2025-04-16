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
import { TIME_SLOTS } from '~/constants/TIME_SLOT';
import { cn } from '~/lib/utils';

import type { LoaderResultDTO } from '../../.server/dtos/LoaderResultDTO';
import { isSuccess } from '../../utils/guards/isSuccess';

export function BookingList() {
  const data = useLoaderData<LoaderResultDTO>();

  const bookings = isSuccess(data) ? data.bookings : [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] sticky left-0 bg-white">Reserver name</TableHead>
          {TIME_SLOTS.map((time) => (
            <TableHead key={time} className="text-center">
              {time}
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
            {TIME_SLOTS.map((time, index) => (
              <TableCell key={time} className="text-center py-8">
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
              <TableCell className="font-medium sticky left-0 bg-white">{booking.name}</TableCell>
              {TIME_SLOTS.map((time) => {
                return (
                  <TableCell key={`${idx}-${time}`} className="p-0 text-center">
                    {booking.startTime <= time && time < booking.endTime ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div
                            className={cn(
                              booking.customerKind === 'Bar Sheet'
                                ? 'py-4 cursor-pointer transition-colors bg-green-100 dark:bg-green-900/30'
                                : 'py-4 cursor-pointer transition-colors bg-red-100 dark:bg-red-900/30',
                            )}
                          ></div>
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
