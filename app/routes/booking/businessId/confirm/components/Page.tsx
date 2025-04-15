import { AlertTriangle, CalendarDays, Mail, Store, Users } from 'lucide-react';
import { Form, Link, useLoaderData } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import type { LoaderResultDTO } from '../.server/dtos/LoaderResultDTO';
import { isSuceess } from '../utils/guards/isSuccess';
import { usePage } from './usePage';

export function Page() {
  const loaderData = useLoaderData<LoaderResultDTO>();
  const data = isSuceess(loaderData) ? loaderData.data : null;

  const {
    error,
    success,
    showEmailContent,
    handleViewEmailContent,
    handleCloseEmailContent,
    emailSubject,
    emailBody,
  } = usePage();

  return (
    <>
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
                    <div className="col-span-2">{data?.fullName ?? '***'}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </div>
                    <div className="col-span-2">{data?.email ?? '***'}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="font-medium flex items-center gap-2">
                      <Store className="h-4 w-4" /> Store
                    </div>
                    <div className="col-span-2">{data?.businessName ?? '***'}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="font-medium flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Date
                    </div>
                    <div className="col-span-2">{data?.dateTime ?? '***'}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="font-medium">Course</div>
                    <div className="col-span-2">{data?.courseName ?? '***'}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="font-medium">Type of seat</div>
                    <div className="col-span-2">{data?.customerKind ?? '***'}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" /> Number of guests
                    </div>
                    <div className="col-span-2">{data?.numberOfGuests ?? '***'}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Form method="post" className="flex-1">
              <Button type="submit" className="w-full" size="lg">
                Submit
              </Button>
            </Form>
            <Button variant="outline" className="flex-1" size="lg">
              <Link to="/" className="w-full">
                Cancel
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Error Modal - Cannot be closed */}
      <Dialog open={!!error}>
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Booking Failed
            </DialogTitle>
            <DialogDescription>
              We encountered a problem while processing your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20 my-2">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Please return to the home page and try again. If the problem persists, contact our
            support team.
          </p>
          <DialogFooter className="mt-4">
            <Button className="w-full">
              <Link to="/" className="w-full">
                Return to Home
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                data?.businessName ?? '***'
              }. We look forward to serving you on ${data?.dateTime ?? '***'}.`}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {`A confirmation email has been sent to ${
                data?.email ?? '***'
              } with your booking details.`}
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your inbox (and spam folder) for the email. If you don't receive it
              within a few minutes, please contact our support team.
            </p>
          </div>
          <DialogFooter className="mt-6 space-y-2">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Link to="/" className="w-full">
                Return to Home
              </Link>
            </Button>
            <Button className="w-full" variant="outline" onClick={handleViewEmailContent}>
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
