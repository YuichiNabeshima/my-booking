import { Form, useActionData, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import type { LoaderDTO } from "../.server/dtos/LoaderDTO";
import { isLoaderSuccess } from "../utils/guards/isLoaderSuccess";
import type { ActionDTO } from "../.server/dtos/ActionDTO";
import { isActionSuccess } from "../utils/guards/isActionSuccess";
import { ToastNotification } from "~/components/ui/toast-notification";
import { FORM_NAME } from "../constants/FORM_NAME";
import { isActionNoDifference } from "../utils/guards/isActionNoDefference";

export function Page() {
  const data = useLoaderData<LoaderDTO>();
  const name = isLoaderSuccess(data) ? data.name : "***";
  const email = isLoaderSuccess(data) ? data.email : "***";

  const result = useActionData<ActionDTO>();

  const isUpdated = isActionSuccess(result);
  const isNoDifference = isActionNoDifference(result);

  return (
    <Card>
      {isUpdated && <ToastNotification message="updated!" type="success"/>}
      {isNoDifference && <ToastNotification message="No difference!" type="info"/>}
      {result === null && <ToastNotification message="Failed to update!" type="error"/>}
      <Form method="post">
        <CardHeader>
          <CardTitle>Basic information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store name</Label>
            <Input id="store-name" defaultValue={name} name={FORM_NAME.NAME} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" defaultValue={email} name={FORM_NAME.EMAIL} />
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="lg">Save</Button>
          </div>
        </CardContent>
      </Form>
    </Card>
  );
}

