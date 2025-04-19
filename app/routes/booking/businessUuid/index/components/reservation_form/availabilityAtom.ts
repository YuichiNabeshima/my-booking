import { atom } from 'jotai';

export const availabilityAtom = atom<Record<string, number> | undefined>(undefined);
export const customerKindAtom = atom<string | undefined>(undefined);
export const dateAtom = atom<Date | undefined>(undefined);
