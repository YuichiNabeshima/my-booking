import { AlertCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { cn } from '~/lib/utils';

interface ErrorModalProps {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onRetry?: () => void;
}

export function ErrorModal({
  title = 'An Error Occurred',
  description = 'Sorry, an unexpected error has occurred. Please try again later.',
  isOpen = false,
  onClose = () => {},
  onRetry = () => window.location.reload(),
}: ErrorModalProps) {
  const [open, setOpen] = useState(isOpen);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
    if (isOpen) {
      setTimeout(() => setAnimation(true), 100);
    } else {
      setAnimation(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimation(false);
    setTimeout(() => {
      setOpen(false);
      onClose();
    }, 300);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <div
          className={cn(
            'absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 border-4 border-background',
            animation ? 'transform-none opacity-100' : 'translate-y-8 opacity-0',
          )}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full animate-pulse" />
            <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400 relative z-10" />
          </div>
        </div>

        <DialogHeader className="pt-6">
          <DialogTitle className="text-center text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-center pt-2">{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
          <Button variant="outline" onClick={handleClose} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Close
          </Button>
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
          >
            Retry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
