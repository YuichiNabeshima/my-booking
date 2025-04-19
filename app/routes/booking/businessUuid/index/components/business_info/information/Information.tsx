import { Info, MapPin, Utensils } from 'lucide-react';
import { useLoaderData } from 'react-router';

import { PRICE_DISPLAY_LABEL, PRICE_LABEL } from '~/constants/PRICE_LABEL';

import type { loader } from '../../../route';

export function Information() {
  const data = useLoaderData<typeof loader>();
  const business = data?.business ?? null;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Address
          </h2>
          <p className="text-muted-foreground mb-2 text-sm md:text-base">{business?.zip_code}</p>
          <p className="text-muted-foreground mb-4 text-sm md:text-base">{business?.address}</p>
        </div>

        <div className="md:mt-0">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Info className="h-5 w-5 mr-2 text-primary" />
            Details
          </h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-12 gap-y-3 text-sm md:max-w-full">
            {business?.price_level && (
              <>
                <div className="font-medium">Price range</div>
                <div className="text-muted-foreground break-words">
                  {PRICE_DISPLAY_LABEL[business.price_level as keyof typeof PRICE_LABEL]}
                </div>
              </>
            )}

            {business?.tel && (
              <>
                <div className="font-medium">Phone</div>
                <div className="text-muted-foreground break-words">{business.tel}</div>
              </>
            )}

            {business?.email && (
              <>
                <div className="font-medium">Email</div>
                <div className="text-muted-foreground break-words">{business.email}</div>
              </>
            )}

            {business?.total_seats && (
              <>
                <div className="font-medium">Seating</div>
                <div className="text-muted-foreground">{business.total_seats} seats</div>
              </>
            )}

            {business?.payment_method && (
              <>
                <div className="font-medium">Payment</div>
                <div className="text-muted-foreground">{business.payment_method}</div>
              </>
            )}

            {business?.parking && (
              <>
                <div className="font-medium">Parking</div>
                <div className="text-muted-foreground">{business.parking}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <Utensils className="h-5 w-5 mr-2 text-primary" />
          About Us
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">{business?.description}</p>
      </div>
    </>
  );
}
