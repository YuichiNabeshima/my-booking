import { atom } from 'jotai';

export type ToastStatus = 'success' | 'info' | 'error';

interface ToastState {
  show: boolean;
  status: ToastStatus | undefined;
  message: string;
}

export const toastAtom = atom<ToastState>({
  show: false,
  status: undefined,
  message: '',
});

export const showToastAtom = atom(null, (get, set, status: ToastStatus, message: string) => {
  set(toastAtom, { show: true, status, message });
});

export const hideToastAtom = atom(null, (get, set) => {
  set(toastAtom, { show: false, status: undefined, message: '' });
});
