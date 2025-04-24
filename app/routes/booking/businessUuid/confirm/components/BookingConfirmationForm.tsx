import { CalendarDays, Mail, Store, Users } from 'lucide-react';
import { Form, Link } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

interface BookingConfirmationFormProps {
  bookingData: {
    fullName?: string;
    email?: string;
    businessName?: string;
    dateTime?: string;
    courseName?: string;
    customerKind?: string;
    numberOfGuests?: string;
  };
}

export function BookingConfirmationForm({ bookingData }: BookingConfirmationFormProps) {
  return (
    <div className="flex items-center justify-center py-20 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Would you like to confirm your booking?</CardTitle>
          <CardDescription>Please review your booking details below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Booking details</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium">Name</div>
                  <div className="col-span-2">{bookingData.fullName ?? '***'}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </div>
                  <div className="col-span-2">{bookingData.email ?? '***'}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <Store className="h-4 w-4" /> Store
                  </div>
                  <div className="col-span-2">{bookingData.businessName ?? '***'}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" /> Date
                  </div>
                  <div className="col-span-2">{bookingData.dateTime ?? '***'}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium">Course</div>
                  <div className="col-span-2">{bookingData.courseName ?? '***'}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium">Type of seat</div>
                  <div className="col-span-2">{bookingData.customerKind ?? '***'}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" /> Number of guests
                  </div>
                  <div className="col-span-2">{bookingData.numberOfGuests ?? '***'}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Form method="post" className="flex-1">
            <Button type="submit" className="w-full cursor-pointer" size="lg">
              Submit
            </Button>
          </Form>
          <Button variant="outline" className="flex-1 cursor-pointer" size="lg">
            <Link to="/" className="w-full">
              Cancel
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
