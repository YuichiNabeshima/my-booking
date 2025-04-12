import { useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableRow } from "~/components/ui/table"
import { Form, useActionData, useLoaderData } from "react-router"
import type { LoaderDTO } from "../.server/dtos/LoaderDTO"
import { isLoaderSuccess } from "../utils/guards/isLoaderSuccess"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { schema } from "../schemas/schema"
import type { ActionDTO } from "../.server/dtos/ActionDTO"
import { useSetAtom } from "jotai"
import { showToastAtom } from "../../_layout/stores/toast"
import { STATUS } from "../constants/STATUS"

export function Page() {
  const data = useLoaderData<LoaderDTO>();
  const initTags = isLoaderSuccess(data) ? data.tags : [];

  const result = useActionData<ActionDTO>();

  const showToast = useSetAtom(showToastAtom);

  useEffect(() => {
    if (result) {
      const status = result.status === STATUS.SUCCESS ? 'success'
                    : result.status === STATUS.NO_DIFFERENCE ? 'info'
                    : 'error';

      const message = result.status === STATUS.SUCCESS ? 'tags updated successfully.'
                    : result.status === STATUS.NO_DIFFERENCE ? 'No changes detected.'
                    : 'Failed to update tags.';

      showToast(status, message);
    }
  }, [result]);

  const [form, { tags }] = useForm({
    defaultValue: {
      tags: initTags,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    form.reset()
  }, [data]);

  const fieldList = tags.getFieldList();

  return (
    <div className="container mx-auto py-10">
      <Form method="post" {...getFormProps(form)}>
        <Card>
          <CardHeader>
            <CardTitle>tags</CardTitle>
            <CardDescription>Manage your tags here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your tags.</TableCaption>
              <TableBody>
                {fieldList.map((field, index) => {
                  const fieldItem = field.getFieldset();
                  const { key: keyId, ...idField } = getInputProps(fieldItem.id, { type: 'hidden' });
                  const { key: keyLabel, ...labelField } = getInputProps(fieldItem.label, { type: 'text' });
                  return (
                    <TableRow key={field.key}>
                      <TableCell>
                        <input key={keyId} {...idField} />
                        <Input key={keyLabel} {...labelField} />
                        {fieldItem.label.errors && <p className="text-sm text-red-500">{fieldItem.label.errors}</p>}
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-500"
                          {...form.remove.getButtonProps({ name: tags.name, index })}
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
              <Button className="w-full" {...form.insert.getButtonProps({ name: tags.name, defaultValue: { id: null, label: 'default' } })}>
                <Plus className="mr-2 h-4 w-4" />
                Add course
              </Button>
              <Button className="w-full mt-4" size="lg" type="submit">Save</Button>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
