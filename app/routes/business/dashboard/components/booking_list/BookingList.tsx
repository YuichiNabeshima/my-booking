import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { cn } from "~/lib/utils"
import { TIME_SLOTS } from "~/constants/TIME_SLOT"
import { useLoaderData } from "react-router"
import type { LoaderResultDTO } from "../../.server/dtos/LoaderResultDTO"
import { isSuccess } from "../../utils/guards/isSuccess"

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
        {bookings.map((booking, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium sticky left-0 bg-white">{booking.name}</TableCell>
            {TIME_SLOTS.map((time) => {
              const booking = bookings.find((b) => b.startTime <= time && time < b.endTime)
              return (
                <TableCell key={`${idx}-${time}`} className="p-0 text-center">
                  {booking ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div
                          className={cn(
                            "py-4 cursor-pointer transition-colors bg-green-100 dark:bg-green-900/30",
                            // "bg-yellow-100 dark:bg-yellow-900/30",
                          )}
                        >
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{booking.name}</h4>
                            <p className="text-sm text-muted-foreground text-left">
                              {`${booking.numberOfguests} ${booking.numberOfguests > 2 ? 'people' : 'person'}`}
                            </p>
                            <p className="text-sm text-muted-foreground text-left">{booking.customerKind}</p>
                            <p className="text-sm text-muted-foreground text-left">{`${booking.startTime}~${booking.endTime}`}</p>
                            <p className="text-sm text-muted-foreground text-left">{booking.courseLabel}</p>
                            <p className="text-sm text-muted-foreground text-left">{booking.note}</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <div className="py-4">&nbsp;</div>
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}