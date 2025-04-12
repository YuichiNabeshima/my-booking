import { useAtomValue, useAtom } from 'jotai'
import { toastAtom, hideToastAtom } from '../stores/toast'
import { ToastNotification } from '~/components/ui/toast-notification'
import { useEffect, useState } from 'react'

export function ActionToast() {
  const [toastKey, setToastKey] = useState(0)
  const { show, status, message } = useAtomValue(toastAtom)
  const [, hideToast] = useAtom(hideToastAtom)

  // useEffect(() => {
  //   if (show) {
  //     setToastKey(prev => prev + 1)
  //     const timer = setTimeout(hideToast, 3000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [show, hideToast])

  if (!show || !status) return null

  return <ToastNotification key={toastKey} type={status} message={message} onClose={hideToast} />
}