import { Clock, Utensils, Users } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

import { Form, useActionData, useLoaderData } from "react-router";
import { getFormProps, getSelectProps, useForm } from "@conform-to/react";
import { TIME_SLOTS } from "~/config/const/timeSlots";
import { usePage } from "./usePage";
import type { _action } from "../action";
import type { _loader } from "../loader";
import { parseWithZod } from "@conform-to/zod";
import { scheduleSchema } from "../config/schema";
import { FORM_NAME, INTENT_TYPE } from "../config/const";
import { BOOKING_TYPE } from "~/config/enums/bookingType";
import { ConfirmModal } from "./confirmModal/ConfirmModal";
import { FinishModal } from "./finishModal/FinishModal";

export function Page() {
  const loaderData = useLoaderData<typeof _loader>();
  const actionResult = useActionData<typeof _action>();
  const courses = loaderData.courses;

  const {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedCourse,
    setSelectedCourse,
    getEndTime,
    isTimeSlotAvailable,
    isInSelectedTimeRange,
    isConfirmModalOpen,
    handleConfirmModalOpen,
    bookingDetails,
    isFinishModalOpen,
    handleFinishModalOpen,
    mail,
  } = usePage();

  const [ form, field ] = useForm({
    lastResult: actionResult?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: scheduleSchema });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50 p-4 md:p-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="text-center border-b">
          <CardTitle className="text-3xl font-bold tracking-tight">Fat Burger Reservation</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form method="post" className="space-y-8" {...getFormProps(form)}>
            {/* Guest Count */}
            <div className="space-y-2">
              <Label htmlFor="guests" className="flex items-center gap-2 text-base">
                <Users className="w-4 h-4" />
                Number of Guests
              </Label>
              <Select {...getSelectProps(field[FORM_NAME.NUMBER_OF_GUESTS])} defaultValue="1">
                <SelectTrigger id="guests" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Seating Preference */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <Utensils className="w-4 h-4" />
                Seating Preference
              </Label>
              <RadioGroup defaultValue={BOOKING_TYPE.SINGLE} className="flex gap-4" name={field[FORM_NAME.TYPE].name} >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={BOOKING_TYPE.SINGLE} id="bar" />
                  <Label htmlFor="bar">Bar Seat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={BOOKING_TYPE.GROUP} id="table" />
                  <Label htmlFor="table">Table Seat</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Course Selection */}
            <div className="space-y-2">
              <Label htmlFor="course" className="flex items-center gap-2 text-base">
                <Clock className="w-4 h-4" />
                Course Selection
              </Label>
              <div className="grid gap-4">
                <Select
                  value={selectedCourse}
                  onValueChange={(value: keyof typeof courses) => {
                    setSelectedCourse(value)
                    setSelectedTime(undefined) // Reset selected time when changing course
                  }}
                  name={field[FORM_NAME.COURSE].name}
                >
                  <SelectTrigger id="course" className="w-full sm:w-[280px]">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(courses).map(([key, { label, duration }]) => (
                      <SelectItem key={key} value={key}>
                        {label} ({duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className={cn("px-3 py-1", courses[selectedCourse].color)}>
                      {selectedTime} - {getEndTime(selectedTime, courses[selectedCourse].duration)}
                      <span className="ml-2 text-muted-foreground">({courses[selectedCourse].duration} min)</span>
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-base">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                  disabled={(date) => date < new Date()}
                  name={field[FORM_NAME.DATE].name}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base">Select Time</Label>
                <div className="grid grid-cols-4 gap-2 relative">
                  <input type="hidden" name={field[FORM_NAME.SCHEDULE].name} value={`${selectedTime}-${selectedTime && getEndTime(selectedTime, courses[selectedCourse].duration)}`} />
                  {TIME_SLOTS.map((time) => {
                    const isAvailable = isTimeSlotAvailable(time)
                    const isInRange = isInSelectedTimeRange(time)

                    return (
                      <Button
                        key={time}
                        variant={isInRange ? "default" : "outline"}
                        className={cn(
                          "text-sm transition-all",
                          isInRange && courses[selectedCourse].color,
                          !isAvailable && "opacity-50 cursor-not-allowed",
                        )}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedTime(time)
                          }
                        }}
                        disabled={!isAvailable}
                        type="button"
                      >
                        {time}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>

            <Button type="submit" name={FORM_NAME.INTENT} value={INTENT_TYPE.CONFIRM} className="w-full text-lg h-12" disabled={!selectedTime || !date}>
              Complete Reservation
            </Button>

          </Form>
        </CardContent>
      </Card>
      {bookingDetails && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleConfirmModalOpen}
          bookingDetails={bookingDetails}
        />
      )}
      {mail && (
        <FinishModal
          isOpen={isFinishModalOpen}
          onClose={handleFinishModalOpen}
          mail={mail}
        />
      )}
    </div>
  )
}

