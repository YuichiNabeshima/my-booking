import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Form, useActionData, useLoaderData } from 'react-router';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { CUISINE_KIND } from '~/constants/enums/CUISINE_KIND';
import { NEIGHBORHOOD } from '~/constants/enums/NEIGHBORHOOD';
import { PRICE_LABEL } from '~/constants/PRICE_LABEL';
import { PRICE_DISPLAY_LABEL } from '~/constants/PRICE_LABEL';
import type { CuisineKind } from '~/types/enums/CuisineKind';
import type { Neighborhood } from '~/types/enums/Neighborhood';
import type { PriceLevel } from '~/types/PriceLabel';

import { showToastAtom } from '../../_layout/stores/toast';
import type { ActionDTO } from '../.server/dtos/ActionDTO';
import type { LoaderDTO } from '../.server/dtos/LoaderDTO';
import { FORM_NAME } from '../constants/FORM_NAME';
import { STATUS } from '../constants/STATUS';
import { schema } from '../schemas/schema';

export function Page() {
  const data = useLoaderData<LoaderDTO>();

  const result = useActionData<ActionDTO>();

  const [form, fields] = useForm({
    defaultValue: {
      [FORM_NAME.NAME]: data?.name,
      [FORM_NAME.EMAIL]: data?.email,
      [FORM_NAME.CAPACITY_OF_GROUP]: data?.capacity_of_group,
      [FORM_NAME.CUISINE_KIND]: data?.cuisine_kind,
      [FORM_NAME.PRICE_LEVEL]: data?.price_level,
      [FORM_NAME.NEIGHBORHOOD]: data?.neighborhood,
      [FORM_NAME.ZIP_CODE]: data?.zip_code,
      [FORM_NAME.ADDRESS]: data?.address,
      [FORM_NAME.TEL]: data?.tel,
      [FORM_NAME.TOTAL_SEATS]: data?.total_seats,
      [FORM_NAME.PAYMENT_METHOD]: data?.payment_method,
      [FORM_NAME.PARKING]: data?.parking,
      [FORM_NAME.DESCRIPTION]: data?.description,
      [FORM_NAME.BUSINESS_HOURS_NOTE]: data?.business_hours_note,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const showToast = useSetAtom(showToastAtom);

  useEffect(() => {
    if (result) {
      const status =
        result.status === STATUS.SUCCESS
          ? 'success'
          : result.status === STATUS.NO_DIFFERENCE
          ? 'info'
          : 'error';
      const message =
        result.status === STATUS.SUCCESS
          ? 'updated!'
          : result.status === STATUS.NO_DIFFERENCE
          ? 'No difference!'
          : 'Failed to update!';
      showToast(status, message);
    }
  }, [result]);

  return (
    <Card>
      <Form method="post" {...getFormProps(form)}>
        <CardHeader>
          <CardTitle>Basic information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="space-y-2">
                <Label htmlFor="store-name">Store name</Label>
                <Input {...getInputProps(fields[FORM_NAME.NAME], { type: 'text' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input {...getInputProps(fields[FORM_NAME.EMAIL], { type: 'email' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity-of-group">Capacity of group</Label>
                <Input
                  {...getInputProps(fields[FORM_NAME.CAPACITY_OF_GROUP], { type: 'number' })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuisine-kind">Cuisine kind</Label>
                <Select
                  defaultValue={fields[FORM_NAME.CUISINE_KIND].value}
                  onValueChange={(value) =>
                    form.update({ [fields[FORM_NAME.CUISINE_KIND].name]: value })
                  }
                  name={fields[FORM_NAME.CUISINE_KIND].name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine kind" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(CUISINE_KIND).map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {CUISINE_KIND[cuisine as CuisineKind]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-level">Price level</Label>
                <Select
                  defaultValue={fields[FORM_NAME.PRICE_LEVEL].value}
                  onValueChange={(value) =>
                    form.update({ [fields[FORM_NAME.PRICE_LEVEL].name]: value })
                  }
                  name={fields[FORM_NAME.PRICE_LEVEL].name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price level" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(PRICE_LABEL) as unknown as PriceLevel[]).map((price) => (
                      <SelectItem key={price} value={String(price)}>
                        {PRICE_DISPLAY_LABEL[price]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Store Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Store Information</h3>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Select
                  defaultValue={fields[FORM_NAME.NEIGHBORHOOD].value}
                  onValueChange={(value) =>
                    form.update({ [fields[FORM_NAME.NEIGHBORHOOD].name]: value })
                  }
                  name={fields[FORM_NAME.NEIGHBORHOOD].name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select neighborhood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(NEIGHBORHOOD).map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood}>
                        {NEIGHBORHOOD[neighborhood as Neighborhood]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip-code">Zip code</Label>
                <Input {...getInputProps(fields[FORM_NAME.ZIP_CODE], { type: 'text' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input {...getInputProps(fields[FORM_NAME.ADDRESS], { type: 'text' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tel">Tel</Label>
                <Input {...getInputProps(fields[FORM_NAME.TEL], { type: 'tel' })} />
              </div>
            </div>

            {/* Facilities Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Facilities</h3>
              <div className="space-y-2">
                <Label htmlFor="total-seats">Total seats</Label>
                <Input {...getInputProps(fields[FORM_NAME.TOTAL_SEATS], { type: 'number' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment method</Label>
                <Input {...getInputProps(fields[FORM_NAME.PAYMENT_METHOD], { type: 'text' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking">Parking</Label>
                <Input {...getInputProps(fields[FORM_NAME.PARKING], { type: 'text' })} />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input {...getInputProps(fields[FORM_NAME.DESCRIPTION], { type: 'text' })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-hours-note">Business hours note</Label>
                <Input
                  {...getInputProps(fields[FORM_NAME.BUSINESS_HOURS_NOTE], { type: 'text' })}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end w-full">
            <Button size="lg" className="w-full cursor-pointer">
              Save
            </Button>
          </div>
        </CardContent>
      </Form>
    </Card>
  );
}
