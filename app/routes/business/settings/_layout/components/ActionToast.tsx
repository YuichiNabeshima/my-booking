import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';

import { ToastNotification } from '~/components/ui/toast-notification';

import { hideToastAtom, toastAtom } from '../stores/toast';

export function ActionToast() {
  const [toastKey] = useState(0);
  const { show, status, message } = useAtomValue(toastAtom);
  const [, hideToast] = useAtom(hideToastAtom);

  if (!show || !status) return null;

  return <ToastNotification key={toastKey} type={status} message={message} onClose={hideToast} />;
}
