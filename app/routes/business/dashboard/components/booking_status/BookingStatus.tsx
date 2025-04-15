import { useLoaderData } from 'react-router';

import { Card, CardContent } from '~/components/ui/card';

import type { LoaderResultDTO } from '../../.server/dtos/LoaderResultDTO';
import { isSuccess } from '../../utils/guards/isSuccess';

export function BookingStatus() {
  const data = useLoaderData<LoaderResultDTO>();

  const numberOfBookings = isSuccess(data) ? data.stats.numberOfBookings : '***';
  const totalGuests = isSuccess(data) ? data.stats.totalGuests : '***';
  const totalBarSheets = isSuccess(data) ? data.stats.totalBarSheets : '***';
  const totalTableSheets = isSuccess(data) ? data.stats.totalTableSheets : '***';

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{numberOfBookings}</div>
            <p className="text-muted-foreground">Today's booking</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-muted-foreground">Total guests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{totalBarSheets}</div>
            <p className="text-muted-foreground">Total Bar sheets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{totalTableSheets}</div>
            <p className="text-muted-foreground">Total table sheets</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
