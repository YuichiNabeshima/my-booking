import { useAtom } from 'jotai';
import { useLoaderData } from 'react-router';

import type { loader } from '../route';
import { BusinessInfo } from './business_info/BusinessInfo';
import { DebugToast } from './DebugToast';
import { availabilityAtom, customerKindAtom, dateAtom } from './reservation_form/availabilityAtom';
import { ReservationForm } from './reservation_form/ReservationForm';

export function Page() {
  const data = useLoaderData<typeof loader>();
  const businessId = data?.business?.id ?? '';
  const env = process.env.NODE_ENV || 'development';
  const [availability] = useAtom(availabilityAtom);
  const [customerKind] = useAtom(customerKindAtom);
  const [date] = useAtom(dateAtom);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50 p-4 md:p-8">
      <BusinessInfo />
      <ReservationForm />
      <DebugToast
        businessId={businessId}
        env={env}
        availability={availability}
        customerKind={customerKind}
        date={date}
      />
    </div>
  );
}
