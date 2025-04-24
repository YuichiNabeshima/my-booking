import { Link, useLoaderData } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import type { loader } from '../route';
import { BookingConfirmationForm } from './BookingConfirmationForm';
import { BookingErrorModal } from './BookingErrorModal';
import { usePage } from './usePage';

export function Page() {
  const data = useLoaderData<typeof loader>();
  const {
    error,
    success,
    showEmailContent,
    handleViewEmailContent,
    handleCloseEmailContent,
    emailSubject,
    emailBody,
    isTokenExpired,
    isFailed,
  } = usePage();

  const defaultBookingData = {
    fullName: '***',
    email: '***',
    businessName: '***',
    dateTime: '***',
    courseName: '***',
    customerKind: '***',
    numberOfGuests: '***',
  };

  if (isTokenExpired || isFailed) {
    return (
      <>
        <BookingConfirmationForm bookingData={defaultBookingData} />
        <BookingErrorModal error={error ?? ''} />
      </>
    );
  }

  if (!data?.data) {
    return null;
  }

  const { data: bookingData } = data;

  return (
    <>
      <BookingConfirmationForm
        bookingData={{
          ...bookingData,
          numberOfGuests: bookingData.numberOfGuests?.toString(),
        }}
      />

      {/* Success Modal - Cannot be closed */}
      <Dialog open={success}>
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-2xl">Booking Confirmed</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center pt-2">
            Your booking has been successfully confirmed and a confirmation email has been sent.
          </DialogDescription>
          <div className="bg-green-50 p-4 rounded-md border border-green-200 my-4">
            <p className="text-sm font-medium text-green-700">
              {`Thank you for your booking at ${
                bookingData.businessName ?? '***'
              }. We look forward to serving you on ${bookingData.dateTime ?? '***'}.`}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {`A confirmation email has been sent to ${
                bookingData.email ?? '***'
              } with your booking details.`}
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your inbox (and spam folder) for the email. If you don't receive it
              within a few minutes, please contact our support team.
            </p>
          </div>
          <DialogFooter className="mt-6 space-y-2">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Link to="/booking" className="w-full">
                Return to Home
              </Link>
            </Button>
            <Button
              className="w-full cursor-pointer"
              variant="outline"
              onClick={handleViewEmailContent}
            >
              View Email Content (Debug)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Content Modal - Can be closed */}
      <Dialog open={showEmailContent} onOpenChange={handleCloseEmailContent}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl">
              Email Content (Debug)
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Subject:</h3>
              <p className="bg-muted p-3 rounded-md">{emailSubject}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Body:</h3>
              <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-base leading-relaxed">
                {emailBody}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
