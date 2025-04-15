import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableRow } from '~/components/ui/table';
import { ToastNotification } from '~/components/ui/toast-notification';

import type { ActionDTO } from '../.server/dtos/ActionDTO';
import type { LoaderDTO } from '../.server/dtos/LoaderDTO';
import { schema } from '../schemas/schema';
import { isActionFailed } from '../utils/guards/isActionFailed';
import { isActionNodiffrence } from '../utils/guards/isActionNoDifference';
import { isActionSuccess } from '../utils/guards/isActionSuccess';
import { isLoaderSuccess } from '../utils/guards/isLoaderSuccess';

export function Page() {
  const data = useLoaderData<LoaderDTO>();
  const initCourses = isLoaderSuccess(data) ? data.courses : [];

  const result = useActionData<ActionDTO>();
  const isNoDifference = isActionNodiffrence(result);
  const isUpdatedSuccess = isActionSuccess(result);
  const isUpdatedFailed = isActionFailed(result);

  const [showInTime, setShowInTime] = useState(false);

  useEffect(() => {
    setShowInTime(true);

    const timeOut = setTimeout(() => {
      setShowInTime(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [result]);

  const [form, { courses }] = useForm({
    defaultValue: {
      courses: initCourses,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    form.reset();
  }, [data]);

  const fieldList = courses.getFieldList();

  return (
    <div className="container mx-auto py-10">
      {isNoDifference && showInTime && (
        <ToastNotification type="info" message="No changes detected." />
      )}
      {isUpdatedSuccess && showInTime && (
        <ToastNotification type="success" message="Courses updated successfully." />
      )}
      {isUpdatedFailed && showInTime && (
        <ToastNotification type="error" message="Failed to update courses." />
      )}
      <Form method="post" {...getFormProps(form)}>
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Manage your courses here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your courses.</TableCaption>
              <TableBody>
                {fieldList.map((field, index) => {
                  const fieldItem = field.getFieldset();
                  const { key: keyId, ...idField } = getInputProps(fieldItem.id, {
                    type: 'hidden',
                  });
                  const { key: keyLabel, ...labelField } = getInputProps(fieldItem.label, {
                    type: 'text',
                  });
                  const { key: keyDuration, ...durationField } = getInputProps(fieldItem.duration, {
                    type: 'number',
                  });
                  return (
                    <TableRow key={field.key}>
                      <TableCell>
                        <input key={keyId} {...idField} />
                        <Input key={keyLabel} {...labelField} />
                        {fieldItem.label.errors && (
                          <p className="text-sm text-red-500">{fieldItem.label.errors}</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Input key={keyDuration} {...durationField} step="15" />
                        {fieldItem.duration.errors && (
                          <p className="text-sm text-red-500">{fieldItem.duration.errors}</p>
                        )}
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-500"
                          {...form.remove.getButtonProps({ name: courses.name, index })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button
                className="w-full"
                {...form.insert.getButtonProps({
                  name: courses.name,
                  defaultValue: { id: null, label: 'default', duration: 60 },
                })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add course
              </Button>
              <Button className="w-full mt-4" size="lg" type="submit">
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
