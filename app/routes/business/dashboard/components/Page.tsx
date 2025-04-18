import { Card, CardContent } from '~/components/ui/card';

import { BookingList } from './booking_list/BookingList';
import { BookingStatus } from './booking_status/BookingStatus';
import { ContentsHeader } from './contents_header/ContentsHeader';
import { DateSelectors } from './date_selectors/DateSelectors';
import { usePage } from './usePage';

export function Page() {
  const { date, setDate, today } = usePage();

  return (
    <div className="p-6 pb-30">
      <Card className="max-w-[1200px] mx-auto">
        <ContentsHeader />
        <CardContent>
          <div className="flex flex-col gap-6">
            <DateSelectors date={date} setDate={setDate} today={today} />
            <BookingStatus />

            <div className="rounded-md border">
              <BookingList />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
