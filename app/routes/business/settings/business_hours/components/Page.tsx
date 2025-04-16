import { getFormProps, getInputProps } from '@conform-to/react';
import { Form } from 'react-router';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';
import { BUSINESS_HOURS_KIND } from '~/constants/enums/BUSINESS_HOURS_KIND';

import { schema } from '../schemas/schema';
import { usePage } from './usePage';

export function Page() {
  const { form, hoursByDay, fields } = usePage();

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your business operating hours for each day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...getFormProps(form)} method="post">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2">
                  <div className="font-medium text-center py-2">Time</div>
                  {(Object.keys(DAY_OF_WEEK) as Array<keyof typeof DAY_OF_WEEK>).map((day) => (
                    <div
                      key={day}
                      className={`text-center py-2 font-medium ${
                        day === 'SUN' ? 'text-red-600' : day === 'SAT' ? 'text-blue-600' : ''
                      }`}
                    >
                      {formatDayOfWeek(day)}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-8 gap-2 mb-1">
                  <div className="font-medium text-center py-1"></div>
                  {(Object.keys(DAY_OF_WEEK) as Array<keyof typeof DAY_OF_WEEK>).map((day) => (
                    <div key={day} className="grid grid-cols-2 gap-1">
                      <div className="text-xs text-muted-foreground text-center">Open</div>
                      <div className="text-xs text-muted-foreground text-center">Close</div>
                    </div>
                  ))}
                </div>

                {Object.keys(BUSINESS_HOURS_KIND).map((kind) => {
                  const kindLabel = formatHoursKind(kind);
                  return (
                    <div key={kind} className="grid grid-cols-8 gap-2 items-center py-2">
                      <div className="font-medium text-sm">{kindLabel}</div>
                      {(Object.keys(DAY_OF_WEEK) as Array<keyof typeof DAY_OF_WEEK>).map((day) => {
                        const hour = hoursByDay[day]?.find((h) => h.hours_kind === kind);
                        if (!hour)
                          return (
                            <div
                              key={`${day}-${kind}`}
                              className="text-center text-muted-foreground"
                            >
                              -
                            </div>
                          );

                        const nameOpen = `${day}-${kind}-open`.toLowerCase();
                        const nameClose = `${day}-${kind}-close`.toLowerCase();
                        const fieldOpen = fields[nameOpen as keyof z.infer<typeof schema>];
                        const fieldClose = fields[nameClose as keyof z.infer<typeof schema>];

                        return (
                          <div key={`${day}-${kind}`} className="grid grid-cols-2 gap-1">
                            <Input
                              placeholder="09:00"
                              defaultValue={fieldOpen.value}
                              {...getInputProps(fieldOpen, { type: 'text' })}
                              className={`h-8 text-sm ${
                                fieldOpen.value
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                  : 'bg-muted/20 border-muted'
                              }`}
                            />
                            <Input
                              placeholder="17:00"
                              defaultValue={fieldClose.value}
                              {...getInputProps(fieldClose, { type: 'text' })}
                              className={`h-8 text-sm ${
                                fieldClose.value
                                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                                  : 'bg-muted/20 border-muted'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-full cursor-pointer">
                Save Business Hours
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function formatDayOfWeek(day: string): string {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

function formatHoursKind(kind: string): string {
  switch (kind) {
    case 'ALL_DAY':
      return 'All Day';
    case 'MORNING':
      return 'Morning';
    case 'LUNCH':
      return 'Lunch';
    case 'DINNER':
      return 'Dinner';
    case 'BAR':
      return 'Bar';
    default:
      return kind.charAt(0) + kind.slice(1).toLowerCase();
  }
}
