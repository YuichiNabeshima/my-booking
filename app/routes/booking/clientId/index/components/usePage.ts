import { useEffect, useState } from "react";
import { useActionData, useLoaderData } from "react-router";
import { _loader } from "../loader";
import { _action } from "../action";


export function usePage() {
  const loaderData = useLoaderData<typeof _loader>();
  const actionResult = useActionData<typeof _action>();
  const courses = loaderData.courses;

  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [selectedCourse, setSelectedCourse] = useState<keyof typeof courses>(Object.keys(courses)[0] as keyof typeof courses)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsConfirmModalOpen(actionResult?.status === 'is-confirm');
    setIsFinishModalOpen(actionResult?.status === 'is-finish');
  }, [actionResult])

  const handleConfirmModalOpen = () => {
    setIsConfirmModalOpen(prev => !prev);
  };

  const handleFinishModalOpen = () => {
    setIsFinishModalOpen(prev => !prev);
  };

  // Calculate end time from selected time
  const getEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const totalMinutes = hours * 60 + minutes + duration
    const endHour = Math.floor(totalMinutes / 60)
    const endMinute = totalMinutes % 60
    return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`
  }

  // Determine if time slot is selectable
  const isTimeSlotAvailable = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const totalMinutes = hours * 60 + minutes
    const endTotalMinutes = totalMinutes + courses[selectedCourse].duration
    return endTotalMinutes <= 22 * 60 // 22:00までに終了する必要がある
  }

  // Determine whether within selected time range
  const isInSelectedTimeRange = (time: string) => {
    if (!selectedTime) return false
    const startTime = selectedTime
    const endTime = getEndTime(selectedTime, courses[selectedCourse].duration)
    return time >= startTime && time < endTime
  }

  return {
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
    bookingDetails: actionResult?.bookingDetails,
    isFinishModalOpen,
    handleFinishModalOpen,
    mail: actionResult?.mail,
  };
}