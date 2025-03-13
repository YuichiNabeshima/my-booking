import { useEffect, useState } from "react"
import { Form, useActionData, useLoaderData } from "react-router"
import { getFormProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { Settings, Coffee, Utensils, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { SeatTable } from "./seat_table/SeatTable"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { ToastNotification } from "~/components/ui/toast-notification"
import { ErrorContent } from "~/components/ui/error-content"
import { schema } from "../schemas/schema"
import { Accordion } from "./accordion/Accordion"
import type { ActionDTO } from "../.server/dtos/ActionDTO"
import { isActionSuccess } from "../utils/guards/isActionSuccess"
import { isActionNoDifference } from "../utils/guards/isActionNoDifference"
import { isActionFailed } from "../utils/guards/isActionFailed"
import { isLoaderSuccess } from "../utils/guards/isLoaderSuccess"
import type { LoaderDTO } from "../.server/dtos/LoaderDTO"

export function Page() {
  const result = useActionData<ActionDTO>();
  const [showInTime, setShowInTime] = useState(false);

  useEffect(() => {
    setShowInTime(true);

    const timeOut = setTimeout(() => {
      setShowInTime(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [result]);

  const data = useLoaderData<LoaderDTO>();

  if (!isLoaderSuccess(data)) {
    return <ErrorContent />;
  }

  const { barSeats, tableSeats } = data.bookingLimit;

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      barSeats,
      tableSeats,
    },
  });

  return (
    <>
      {isActionSuccess(result) && showInTime && <ToastNotification type="success" message="Updated!" />}
      {isActionNoDifference(result) && showInTime && <ToastNotification type="info" message="No difference!" />}
      {isActionFailed(result) && showInTime && <ToastNotification type="error" message="Failed to update!" />}
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
                  <SeatTable key={"bar"} type="barSeats" field={fields.barSeats} />
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
                  <SeatTable key={"table"} type="tableSeats" field={fields.tableSeats} />
                </div>
              </Accordion>
            </div>
            <div className="bg-muted/10 border-t flex justify-between mt-4">
              <Button size="lg" type="submit" className="gap-2 w-full cursor-pointer">
                <Save className="h-4"/>
                Save Changes
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}