import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useSetAtom } from 'jotai';
import { Coffee, Save, Settings, Utensils } from 'lucide-react';
import { useEffect } from 'react';
import { Form, useActionData, useLoaderData } from 'react-router';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { ErrorContent } from '~/components/ui/error-content';

import { showToastAtom } from '../../_layout/stores/toast';
import type { ActionDTO } from '../.server/dtos/ActionDTO';
import type { LoaderDTO } from '../.server/dtos/LoaderDTO';
import { schema } from '../schemas/schema';
import type { Week } from '../types/BookingLimit';
import { isActionNoDifference } from '../utils/guards/isActionNoDifference';
import { isActionSuccess } from '../utils/guards/isActionSuccess';
import { isLoaderSuccess } from '../utils/guards/isLoaderSuccess';
import { Accordion } from './accordion/Accordion';
import { SeatTable } from './seat_table/SeatTable';

export function Page() {
  const result = useActionData<ActionDTO>();
  const data = useLoaderData<LoaderDTO>();
  const showToast = useSetAtom(showToastAtom);

  if (!isLoaderSuccess(data)) {
    return <ErrorContent />;
  }

  const { barSeats, tableSeats, businessHours } = data.bookingLimit;

  const [form, fields] = useForm<{
    barSeats: Week;
    tableSeats: Week;
  }>({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      barSeats,
      tableSeats,
    },
  });

  useEffect(() => {
    if (result) {
      const status = isActionSuccess(result)
        ? 'success'
        : isActionNoDifference(result)
        ? 'info'
        : 'error';
      const message = isActionSuccess(result)
        ? 'Updated successfully'
        : isActionNoDifference(result)
        ? 'No changes'
        : 'Failed to update';
      showToast(status, message);
    }
  }, [result, showToast]);

  return (
    <>
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Seat Settings</CardTitle>
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-background">
              Configuration
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form action="/business/settings/seat-settings" method="post" {...getFormProps(form)}>
            <div className="space-y-4">
              <Accordion
                defaultOpen={true}
                title="Bar Seats"
                description="Counter seating configuration"
                icon={
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <Coffee className="h-4 w-4" />
                  </div>
                }
              >
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                  <SeatTable
                    key={'bar'}
                    type="barSeats"
                    field={fields.barSeats}
                    businessHours={businessHours}
                  />
                </div>
              </Accordion>

              <Accordion
                title="Table Seats"
                description="Dining table configuration"
                icon={
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Utensils className="h-4 w-4" />
                  </div>
                }
              >
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                  <SeatTable
                    key={'table'}
                    type="tableSeats"
                    field={fields.tableSeats}
                    businessHours={businessHours}
                  />
                </div>
              </Accordion>
            </div>
            <div className="bg-muted/10 border-t flex justify-between mt-4">
              <Button size="lg" type="submit" className="gap-2 w-full cursor-pointer">
                <Save className="h-4" />
                Save Changes
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
