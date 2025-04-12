import { BusinessInfo } from "./business_info/BusinessInfo";
import { ReservationForm } from "./reservation_form/ReservationForm";

export function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50 p-4 md:p-8">
      <BusinessInfo />
      <ReservationForm />
    </div>
  )
}

