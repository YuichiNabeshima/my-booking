import { useSetAtom } from 'jotai';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form, Link, useActionData, useLoaderData } from 'react-router';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { CUSTOMER_KIND_LABEL } from '~/constants/CUSTOMER_KIND';
import { BOOKING_STATUS } from '~/constants/enums/BOOKING_STATUS';
import { ActionToast } from '~/routes/business/settings/_layout/components/ActionToast';
import { showToastAtom } from '~/routes/business/settings/_layout/stores/toast';

import type { action, loader } from '../route';

const STATUS_OPTIONS = [
  { value: BOOKING_STATUS.CONFIRMED, label: BOOKING_STATUS.CONFIRMED, color: 'bg-green-500' },
  { value: BOOKING_STATUS.CANCELED, label: BOOKING_STATUS.CANCELED, color: 'bg-red-500' },
  { value: BOOKING_STATUS.COMPLETED, label: BOOKING_STATUS.COMPLETED, color: 'bg-blue-500' },
  { value: BOOKING_STATUS.NO_SHOW, label: BOOKING_STATUS.NO_SHOW, color: 'bg-gray-500' },
];

export function Page() {
  const data = useLoaderData<typeof loader>();
  const result = useActionData<typeof action>();
  const showToast = useSetAtom(showToastAtom);

  useEffect(() => {
    if (result) {
      const status = result ? 'success' : 'error';
      const message = result ? 'Updated successfully' : 'Failed to update';
      showToast(status, message);
    }
  }, [result, showToast]);

  if (!data) {
    return <div>No data</div>;
  }

  const [status, setStatus] = useState<keyof typeof BOOKING_STATUS>(data.status);
  const statusOption = STATUS_OPTIONS.find((opt) => opt.value === status);

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6">
      <ActionToast />
      <Card className="w-full max-w-2xl border border-gray-200 rounded-2xl bg-white">
        <CardHeader className="pb-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to={`/business/dashboard?dates=${data.date}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back to Bookings</span>
              </Link>
              <CardTitle className="text-2xl font-bold tracking-tight">Booking Detail</CardTitle>
            </div>
            <Form method="post" className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block w-4 h-4 rounded-full ${statusOption?.color} border-2 border-white shadow`}
                />
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as keyof typeof BOOKING_STATUS)}
                  name="status"
                >
                  <SelectTrigger className="w-44 font-bold text-lg border-2 border-gray-300 shadow bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-green-200 cursor-pointer">
                    <SelectValue>{statusOption?.label}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${opt.color}`} />
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="py-2 px-4 rounded-lg shadow cursor-pointer">
                Save
              </Button>
            </Form>
          </div>
        </CardHeader>
        <CardContent className="py-8 px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Name</Label>
              <div className="text-lg font-semibold text-gray-900">{data.name}</div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1"></Label>
              <div className="text-lg text-gray-900"></div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Email</Label>
              <div className="text-lg text-gray-900">{data.email}</div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Number of Guests</Label>
              <div className="text-lg text-gray-900">{data.numberOfGuests}</div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Customer Kind</Label>
              <div className="text-lg text-gray-900">{CUSTOMER_KIND_LABEL[data.customerKind]}</div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Course</Label>
              <div className="text-lg text-gray-900">{data.course}</div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Date</Label>
              <div className="text-lg text-gray-900">{data.date}</div>
            </div>
            <div>
              <Label className="block text-gray-500 text-sm mb-1">Time</Label>
              <div className="text-lg text-gray-900">{data.time}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
