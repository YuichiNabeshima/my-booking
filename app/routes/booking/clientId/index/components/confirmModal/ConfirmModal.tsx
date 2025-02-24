import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { AtSign, User } from "lucide-react"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import * as z from "zod"
import { Form } from "react-router"
import type { BookingType } from "~/config/enums/bookingType"
import { FORM_NAME, INTENT_TYPE } from "../../config/const"
import { scheduleSchema } from "../../config/schema"

const formSchema = z.object({
  [FORM_NAME.FULL_NAME]: z.string().min(2, "Name must be at least 2 characters"),
  [FORM_NAME.EMAIL]: z.string().email("Please enter a valid email address"),
}).merge(scheduleSchema);

export type FormData = z.infer<typeof formSchema>

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: {
    numberOfGuests: number,
    type: BookingType,
    course: string,
    date: Date,
    schedule: string,
  }
}

export function ConfirmModal({ isOpen, onClose, bookingDetails }: ConfirmModalProps) {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema })
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Your Booking</DialogTitle>
          <DialogDescription>Please provide your contact information to complete the reservation.</DialogDescription>
        </DialogHeader>

        <Form method="post" className="space-y-6 py-4" {...getFormProps(form)}>
          {/* Booking Summary */}
          <div className="rounded-lg bg-muted p-4 text-sm">
            <div className="font-medium mb-2">Booking Details</div>
            <dl className="space-y-1">
              <div className="flex justify-between">
                <input type="hidden" name={fields[FORM_NAME.DATE].name} value={bookingDetails.date.toISOString()} />
                <dt className="text-muted-foreground">Date:</dt>
                <dd>{bookingDetails.date.toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <input type="hidden" name={fields[FORM_NAME.SCHEDULE].name} value={bookingDetails.schedule} />
                <dt className="text-muted-foreground">Time:</dt>
                <dd>{bookingDetails.schedule}</dd>
              </div>
              <div className="flex justify-between">
                <input type="hidden" name={fields[FORM_NAME.COURSE].name} value={bookingDetails.course} />
                <dt className="text-muted-foreground">Course:</dt>
                <dd>{bookingDetails.course}</dd>
              </div>
              <div className="flex justify-between">
                <input type="hidden" name={fields[FORM_NAME.NUMBER_OF_GUESTS].name} value={bookingDetails.numberOfGuests} />
                <dt className="text-muted-foreground">Guests:</dt>
                <dd>{bookingDetails.numberOfGuests} people</dd>
              </div>
              <div className="flex justify-between">
                <input type="hidden" name={fields[FORM_NAME.TYPE].name} value={bookingDetails.type} />
                <dt className="text-muted-foreground">Seating:</dt>
                <dd>{bookingDetails.type}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={fields[FORM_NAME.FULL_NAME].id} className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </Label>
              <Input
                {...getInputProps(fields[FORM_NAME.FULL_NAME], { type: 'text' })}
                placeholder="Enter your full name"
                className={fields[FORM_NAME.FULL_NAME].errors ? "border-red-500" : ""}
              />
              {fields[FORM_NAME.FULL_NAME].errors && <p className="text-sm text-red-500">{fields[FORM_NAME.FULL_NAME].errors}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.email.id} className="flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                Email
              </Label>
              <Input
                {...getInputProps(fields[FORM_NAME.EMAIL], { type: 'email' })}
                type="email"
                placeholder="Enter your email address"
                className={fields[FORM_NAME.EMAIL].errors ? "border-red-500" : ""}
              />
              {fields[FORM_NAME.EMAIL].errors && <p className="text-sm text-red-500">{fields[FORM_NAME.EMAIL].errors}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" name={fields[FORM_NAME.INTENT].name} value={INTENT_TYPE.FINISH}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

