import React, { useState } from 'react';
import { useLoaderData } from 'react-router';

import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';

import type { loader } from '../route';

interface DebugToastProps {
  businessId: string | number;
  env: string;
  availability?: Record<string, number>;
  customerKind?: string;
  date?: Date;
}

export const DebugToast: React.FC<DebugToastProps> = ({
  businessId,
  env,
  availability,
  customerKind,
  date,
}) => {
  const [open, setOpen] = useState(true);
  const data = useLoaderData<typeof loader>();
  const business = data?.business ?? null;

  const seatTypeLabel =
    customerKind === CUSTOMER_KIND.SINGLE
      ? 'Bar Seat'
      : customerKind === CUSTOMER_KIND.GROUP
      ? 'Table Seat'
      : '-';
  const dateLabel = date ? date.toISOString().slice(0, 10) : '-';
  const email = business?.email ?? `restaurant${businessId}@example.com`;
  const password = `password${businessId}`;

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/business/logout', { method: 'POST', credentials: 'include' });
    (e.target as HTMLFormElement).submit();
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[1000] transition-all ${
        open ? 'min-w-[320px] max-w-[380px] max-h-[440px]' : 'w-auto h-auto'
      }`}
    >
      {open ? (
        <div className="flex flex-col bg-gradient-to-br from-blue-100 via-yellow-50 to-pink-100 border-2 border-blue-300 rounded-xl shadow-xl p-4 gap-2 max-h-[440px] min-w-[320px] max-w-[380px] overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-base text-blue-900 flex items-center gap-2">
              <span className="text-xl">🐞</span> Debug Toast
            </span>
            <button
              aria-label="Close debug toast"
              onClick={() => setOpen(false)}
              className="text-blue-400 hover:text-blue-700 text-xl px-2 font-bold transition-colors"
            >
              ×
            </button>
          </div>
          <div className="text-xs text-blue-900 mb-1 font-semibold">
            <span className="font-bold">businessId:</span> <b>{businessId}</b>
          </div>
          <div className="text-xs text-blue-900 mb-1 font-semibold">
            <span className="font-bold">Admin Panel: </span>
            <form
              method="post"
              action="/business/login"
              className="inline"
              onSubmit={handleAdminLogin}
              target="_blank"
            >
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="password" value={password} />
              <button
                type="submit"
                className="text-blue-600 underline ml-1 hover:text-blue-800 transition-colors font-bold"
              >
                Go to Admin
              </button>
            </form>
          </div>
          <div className="text-xs text-blue-900 mb-1 font-semibold">
            <span className="font-bold">Date:</span> <b>{dateLabel}</b>
          </div>
          <div className="text-xs text-blue-900 mb-1 font-semibold">
            <span className="font-bold">Seat Type:</span> <b>{seatTypeLabel}</b>
          </div>
          <div className="text-xs text-blue-900 mb-2 font-semibold">
            <span className="font-bold">env:</span> <b>{env}</b>
          </div>
          {availability && (
            <div className="mt-2">
              <div className="font-bold text-xs mb-1 text-blue-900">Time Slot Availability</div>
              <div className="overflow-y-auto border border-blue-200 rounded-md max-h-[180px] bg-white">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left px-2 py-1 font-bold text-blue-700">Time</th>
                      <th className="text-right px-2 py-1 font-bold text-blue-700">
                        Available Seats
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(availability).map(([time, seats]) => (
                      <tr key={time}>
                        <td className="px-2 py-1 border-b border-blue-50 text-blue-900 font-semibold">
                          {time}
                        </td>
                        <td className="px-2 py-1 text-right border-b border-blue-50 text-blue-900 font-semibold">
                          {seats}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-gradient-to-br from-blue-100 via-yellow-50 to-pink-100 border-2 border-blue-300 rounded-xl shadow-xl px-3 py-2">
          <button
            aria-label="Open debug toast"
            onClick={() => setOpen(true)}
            className="text-blue-500 text-xl hover:text-blue-800 focus:outline-none"
          >
            🐞
          </button>
          <form
            method="post"
            action="/business/login"
            className="inline"
            onSubmit={handleAdminLogin}
            target="_blank"
          >
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="password" value={password} />
            <button
              type="submit"
              className="text-blue-700 underline text-xs whitespace-nowrap hover:text-blue-900 font-bold transition-colors"
            >
              Go to Admin
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
