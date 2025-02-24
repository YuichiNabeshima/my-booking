import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { useFinishModal } from "./useFinishModal";

interface FinishModalProps {
  isOpen: boolean,
  onClose: () => void,
  mail: {
    subject: string,
    body: string,
  },
}

export function FinishModal({ isOpen, onClose, mail }: FinishModalProps) {
  const { convertToBr, convertToAnchor } = useFinishModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Finish Your Booking</DialogTitle>
          <DialogDescription className="word-break">
            An email has been sent to the address you provided. Please complete your reservation by clicking the link in the email.<br />
            Note: Since this is a test, the actual content of the email is displayed below.
          </DialogDescription>
        </DialogHeader>
        <div className="text-xl break-all">
          <dl>
            <dt className="font-bold">Subjct</dt>
            <dd className="text-lg">{mail.subject}</dd>
          </dl>
          <dl className="mt-4">
            <dt className="font-bold">Body</dt>
            <dd className="text-lg" dangerouslySetInnerHTML={{ __html: convertToBr(convertToAnchor(mail.body)) }}></dd>
          </dl>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

