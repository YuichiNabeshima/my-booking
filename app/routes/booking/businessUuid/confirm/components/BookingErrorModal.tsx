import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

interface BookingErrorModalProps {
  error: string;
}

export function BookingErrorModal({ error }: BookingErrorModalProps) {
  return (
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
          Please return to the home page and try again. If the problem persists, contact our support
          team.
        </p>
        <DialogFooter className="mt-4">
          <Button className="w-full">
            <Link to="/booking/" className="w-full">
              Return to Home
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
