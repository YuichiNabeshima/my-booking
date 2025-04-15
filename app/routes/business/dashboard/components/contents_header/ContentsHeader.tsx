import { useLoaderData } from 'react-router';

import { CardHeader, CardTitle } from '~/components/ui/card';

import type { LoaderResultDTO } from '../../.server/dtos/LoaderResultDTO';
import { isSuccess } from '../../utils/guards/isSuccess';

export function ContentsHeader() {
  const data = useLoaderData<LoaderResultDTO>();
  const name = isSuccess(data) ? data.businessName : '***';

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          <p className="text-muted-foreground">Booking Manager Dashboard</p>
        </div>
      </div>
    </CardHeader>
  );
}
