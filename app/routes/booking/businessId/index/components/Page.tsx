import { useAtom } from 'jotai';
import { useParams } from 'react-router';

import { BusinessInfo } from './business_info/BusinessInfo';
import { DebugToast } from './DebugToast';
import { availabilityAtom, customerKindAtom, dateAtom } from './reservation_form/availabilityAtom';
import { ReservationForm } from './reservation_form/ReservationForm';

export function Page() {
  const params = useParams();
  const businessId = params.businessId ?? '';
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
