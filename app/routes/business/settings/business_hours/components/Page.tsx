import { type FieldMetadata, getFormProps, getInputProps } from '@conform-to/react';
import { Form } from 'react-router';
import { z } from 'zod';

import type { BusinessHoursRepositoryDTO } from '~/.server/repositories/dtos/BusinessHoursRepositoryDTO';
import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Accordion } from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';

import { schema } from '../schemas/schema';
import { usePage } from './usePage';

export function Page() {
  const {
    form,
    openDayValues,
    setOpenDayValues,
    openHoursKindValues,
    setOpenHoursKindValues,
    hoursByDay,
    fields,
  } = usePage();

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
            <Accordion
              type="multiple"
              value={openDayValues}
              onValueChange={setOpenDayValues}
              className="space-y-2"
            >
              {(Object.keys(DAY_OF_WEEK) as Array<keyof typeof DAY_OF_WEEK>).map((day) => (
                <AccordionItem key={day} value={day} className="border rounded-md overflow-hidden">
                  <AccordionTrigger className="px-4 py-2 hover:bg-gray-50">
                    {formatDayOfWeek(day)}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    <Accordion
                      type="multiple"
                      value={openHoursKindValues.filter((v) => v.startsWith(day))}
                      onValueChange={(values) => {
                        // Filter out values for other days
                        const otherDayValues = openHoursKindValues.filter(
                          (v) => !v.startsWith(day),
                        );
                        setOpenHoursKindValues([...otherDayValues, ...values]);
                      }}
                      className="space-y-2"
                    >
                      {hoursByDay[day]?.map((hour) => {
                        const hourKey = `${day}_${hour.hours_kind}`;
                        const nameOpen = `${day}-${hour.hours_kind}-open`.toLowerCase();
                        const nameClose = `${day}-${hour.hours_kind}-close`.toLowerCase();

                        return (
                          <AccordionItem
                            key={hourKey}
                            value={hourKey}
                            className="border rounded-md overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 py-2 text-sm hover:bg-gray-50">
                              {formatHoursKind(hour.hours_kind || '')}
                            </AccordionTrigger>
                            <AccordionContent className="p-4">
                              <BusinessHourEntry
                                hour={hour}
                                fieldOpen={fields[nameOpen as keyof z.infer<typeof schema>]}
                                fieldClose={fields[nameClose as keyof z.infer<typeof schema>]}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-6">
              <Button type="submit" className="w-full cursor-pointer">
                {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                Save Business Hours
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function BusinessHourEntry({
  hour,
  fieldOpen,
  fieldClose,
}: {
  hour: BusinessHoursRepositoryDTO;
  showError?: boolean;
  fieldOpen: FieldMetadata<string | undefined, z.infer<typeof schema>, string[]>;
  fieldClose: FieldMetadata<string | undefined, z.infer<typeof schema>, string[]>;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`open-time-${hour.day_of_week}-${hour.hours_kind}`}>
            Opening Time (HH:MM)
          </Label>
          <Input
            placeholder="09:00"
            defaultValue={fieldOpen.value}
            {...getInputProps(fieldOpen, { type: 'text' })}
          />
          {fieldOpen.errors && (
            <p className="text-sm text-red-500">{fieldOpen.errors.join(', ')}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`close-time-${hour.day_of_week}-${hour.hours_kind}`}>
            Closing Time (HH:MM)
          </Label>
          <Input
            placeholder="17:00"
            defaultValue={fieldClose.value}
            {...getInputProps(fieldClose, { type: 'text' })}
          />
          {fieldClose.errors && (
            <p className="text-sm text-red-500">{fieldClose.errors.join(', ')}</p>
          )}
        </div>
      </div>
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
