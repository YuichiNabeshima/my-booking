import { Form, useActionData, useLoaderData } from "react-router";
import { getFormProps, getSelectProps, useForm } from "@conform-to/react";
import { Clock, Utensils, Users } from "lucide-react";
import { parseWithZod } from "@conform-to/zod";
import { Calendar } from "~/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { TIME_SLOTS } from "~/constants/TIME_SLOT";
import { useReservationForm } from "./useReservationForm";
import { schema } from "../../schemas/schema";
import { FORM_NAME } from "../../constants/FORM_NAME";
import { INTENT_KIND } from "../../constants/INTENT_KIND";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import { ConfirmModal } from "../confirm_modal/ConfirmModal";
import { FinishModal } from "../finish_modal/FinishModal";
import { STATUS } from "../../constants/STATUS";
import type { action, loader } from "../../route";
import type { CustomerKind } from "~/types/enums/CustomerKind";

export function ReservationForm() {
  const data = useLoaderData<typeof loader>();
  const result = useActionData<typeof action>();

  if (!data) {
    return <div>Failed to load data</div>
  }

  const courses = data.courses;

  const {
    setnumberOfGuests,
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedCourse,
    setSelectedCourse,
    customerKind,
    setCustomerKind,
    getEndTime,
    isTimeSlotAvailable,
    isInSelectedTimeRange,
    isConfirmModalOpen,
    handleConfirmModalOpen,
    isFinishModalOpen,
    handleFinishModalOpen,
    showEmailContent,
    handleEmailContentModalOpen,
    fetcher,
  } = useReservationForm();

  const [ form, field ] = useForm({
    lastResult: result?.status !== STATUS.FINISHED ? result?.lastResult : undefined,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <>
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="text-center border-b pb-2">
          <CardTitle className="text-3xl font-bold tracking-tight">{data.business.name} Reservation</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form method="post" action="./" className="space-y-8" {...getFormProps(form)}>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-8">

                {/* Guest Count */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2 text-base">
                    <Users className="w-4 h-4" />
                    Number of Guests
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setnumberOfGuests(Number(value))
                    }}
                    {...getSelectProps(field[FORM_NAME.NUMBER_OF_GUESTS])} defaultValue="1"
                  >
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
                  <RadioGroup
                    defaultValue={customerKind}
                    className="flex gap-4"
                    name={field[FORM_NAME.CUSTOMER_KIND].name}
                    onValueChange={(value: CustomerKind) => {
                      setCustomerKind(value)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={CUSTOMER_KIND.SINGLE} id="bar" />
                      <Label htmlFor="bar">Bar Seat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={CUSTOMER_KIND.GROUP} id="table" />
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
                      onValueChange={(value) => {
                        setSelectedCourse(value)
                        setSelectedTime(undefined) // Reset selected time when changing course
                      }}
                      name={field[FORM_NAME.COURSE].name}
                    >
                      <SelectTrigger id="course" className="w-full sm:w-[280px]">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(courses).map((course) => (
                          <SelectItem key={course[0]} value={course[0]}>
                            {course[1].name} ({course[1].timeDuration} min)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedTime && (
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className={cn("px-3 py-1", courses[selectedCourse].color)}>
                          {selectedTime} - {getEndTime(selectedTime, courses[selectedCourse].timeDuration)}
                          <span className="ml-2 text-muted-foreground">({courses[selectedCourse].timeDuration} min)</span>
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date & Time Selection */}
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

              </div>

              <div className="space-y-2">
                <Label className="text-base">Select Time</Label>
                <div className="grid grid-cols-4 gap-2 relative">
                  <input type="hidden" name={field[FORM_NAME.SCHEDULE].name} value={selectedTime} />
                  {TIME_SLOTS.map((time) => {
                    const availability = fetcher.data?.avaliability[time]
                    const isAvailable = isTimeSlotAvailable(time, availability ?? 0)
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

            <Button type="submit" name={FORM_NAME.INTENT} value={INTENT_KIND.CONFIRM} className="w-full text-lg h-12" disabled={!selectedTime || !date}>
              Complete Reservation
            </Button>

          </Form>
        </CardContent>
      </Card>
      {result?.status === STATUS.CONFIRMED && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleConfirmModalOpen}
          bookingDetails={result.bookingDetails}
          courses={courses}
        />
      )}
      <FinishModal
        isOpen={isFinishModalOpen}
        onClose={handleFinishModalOpen}
        isOpenEmail={showEmailContent}
        onHandleEmail={handleEmailContentModalOpen}
      />
    </>
  );
}