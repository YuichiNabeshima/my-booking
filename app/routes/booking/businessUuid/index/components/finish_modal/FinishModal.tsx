import { Mail } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import { useFinishModal } from './useFinishModal';

interface FinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOpenEmail: boolean;
  onHandleEmail: () => void;
}

export function FinishModal({ isOpen, onClose, isOpenEmail, onHandleEmail }: FinishModalProps) {
  const { convertToAnchor, email } = useFinishModal();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-blue-600">
              <Mail className="h-6 w-6" />
              <span className="text-2xl">Booking Request Sent</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center pt-2">
            We have sent an email acknowledging your booking request. Please check your inbox.
          </DialogDescription>
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 my-4">
            <p className="text-sm font-medium text-blue-700">
              {`An email has been sent to ${email && email.to} with your booking request details.`}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Please note that this is not a final confirmation. We will process your request and
              send a confirmation email shortly.
            </p>
          </div>
          <DialogFooter className="mt-6 space-y-2">
            <Button className="w-full cursor-pointer" variant="outline" onClick={onHandleEmail}>
              View Email Content (Debug)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Content Modal - Can be closed */}
      <Dialog open={isOpenEmail} onOpenChange={onHandleEmail}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl">
              Email Content (Debug)
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Subject:</h3>
              <p className="bg-muted p-3 rounded-md">{email && email.subject}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Body:</h3>
              <pre
                className="whitespace-pre-wrap bg-muted p-4 rounded-md text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: convertToAnchor(email ? email.body : '') }}
              ></pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
