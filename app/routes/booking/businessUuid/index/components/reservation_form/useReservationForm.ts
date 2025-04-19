import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useActionData, useFetcher, useLoaderData } from 'react-router';

import { AVAILABILITY_PARAMS } from '~/constants/AVAILABLITY_PARAMS';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';
import { BUSINESS_HOURS_KIND } from '~/constants/enums/BUSINESS_HOURS_KIND';
import { TIME_SLOTS } from '~/constants/TIME_SLOT';
import type { BusinessHoursKind } from '~/types/enums/BusinessHoursKind';
import type { CustomerKind } from '~/types/enums/CustomerKind';

import type { Availability } from '../../../availability/route';
import type { LoaderServiceResultDTO } from '../../.server/dtos/LoaderServiceDTO';
import { STATUS } from '../../constants/STATUS';
import type { action } from '../../route';
import { availabilityAtom, customerKindAtom, dateAtom } from './availabilityAtom';

export function useReservationForm() {
  const data = useLoaderData<LoaderServiceResultDTO>();
  const result = useActionData<typeof action>();

  const { courses, business } = data;

  const [numberOfGuests, setnumberOfGuests] = useState<number>(1);
  const [date, setDate] = useState<Date>();
  const [customerKind, setCustomerKind] = useState<CustomerKind>(CUSTOMER_KIND.SINGLE);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);

  const [showEmailContent, setShowEmailContent] = useState<boolean>(false);

  const fetcher = useFetcher<Availability>();
  const [availability, setAvailability] = useAtom(availabilityAtom);
  const setCustomerKindAtom = useSetAtom(customerKindAtom);
  const setDateAtom = useSetAtom(dateAtom);
  const businessHours = business?.business_hours ?? [];

  useEffect(() => {
    if (Object.keys(courses).length > 0 && !selectedCourse) {
      setSelectedCourse(Object.keys(courses)[0]);
    }
  }, [courses, selectedCourse]);

  useEffect(() => {
    setIsConfirmModalOpen(result?.status === STATUS.CONFIRMED);
    setIsFinishModalOpen(result?.status === STATUS.FINISHED);
  }, [result]);

  useEffect(() => {
    if (!date || !customerKind || !selectedCourse) return;
    fetcher.load(
      `availability/?${AVAILABILITY_PARAMS.COURSE_ID}=${selectedCourse}&${AVAILABILITY_PARAMS.CUSTOMER_KIND}=${customerKind}&${AVAILABILITY_PARAMS.DATE}=${date}`,
    );
  }, [date, customerKind, selectedCourse]);

  useEffect(() => {
    setSelectedTime(undefined);
  }, [numberOfGuests, date, customerKind, selectedCourse]);

  useEffect(() => {
    if (fetcher.data?.avaliability) {
      setAvailability(fetcher.data.avaliability);
    }
  }, [fetcher.data?.avaliability, setAvailability]);

  useEffect(() => {
    setCustomerKindAtom(customerKind);
  }, [customerKind, setCustomerKindAtom]);

  useEffect(() => {
    setDateAtom(date);
  }, [date, setDateAtom]);

  const handleConfirmModalOpen = () => {
    setIsConfirmModalOpen((prev) => !prev);
  };

  const handleFinishModalOpen = () => {
    setIsFinishModalOpen((prev) => !prev);
  };

  const handleEmailContentModalOpen = () => {
    setShowEmailContent((prev) => !prev);
  };

  // Calculate end time from selected time
  const getEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };

  const getIsAvailableTimesUntilEnd = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalStartMinutes = hours * 60 + minutes;
    const totalEndMinutes = totalStartMinutes + duration;
    const availabilities = fetcher.data;

    const availabilitySlots: boolean[] = [];
    for (let m = totalEndMinutes - 15; m > totalStartMinutes; m -= 15) {
      const hour = Math.floor(m / 60);
      const minute = m % 60;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      if (!availabilities) return false;
      availabilitySlots.push(
        availabilities.avaliability[time] -
          (customerKind === CUSTOMER_KIND.SINGLE ? numberOfGuests : 1) >=
          0,
      );
    }
    return availabilitySlots.every((time) => time);
  };

  // Determine if time slot is selectable
  const isTimeSlotAvailable = (time: string, availableSeats: number) => {
    if (!availableSeats) return false;
    const seatsAvailable =
      availableSeats - (customerKind === CUSTOMER_KIND.SINGLE ? numberOfGuests : 1) >= 0;

    return (
      seatsAvailable && getIsAvailableTimesUntilEnd(time, courses[selectedCourse].timeDuration)
    );
  };

  // Determine whether within selected time range
  const isInSelectedTimeRange = (time: string) => {
    if (!selectedTime) return false;
    const startTime = selectedTime;
    const endTime = getEndTime(selectedTime, courses[selectedCourse].timeDuration);
    return time >= startTime && time < endTime;
  };

  const getNumberOfGuestsOptions = () => {
    if (customerKind === CUSTOMER_KIND.SINGLE) {
      const max = Object.entries(availability ?? {}).reduce((max, [_key, value]) => {
        return Math.max(max, value);
      }, 0);
      return Array.from({ length: max }, (_, i) => i + 1);
    }
    return Array.from({ length: business.capacity_of_group }, (_, i) => i + 1);
  };

  const getAvailableTimeSlots = (): Partial<Record<BusinessHoursKind, string[]>> => {
    if (!businessHours.length) return { [BUSINESS_HOURS_KIND.ALL_DAY]: TIME_SLOTS };

    // const today = new Date();
    const today = new Date(date || new Date());
    const dayOfWeek = today.getDay();
    const dayMap: Record<number, string> = {
      0: DAY_OF_WEEK.SUN,
      1: DAY_OF_WEEK.MON,
      2: DAY_OF_WEEK.TUE,
      3: DAY_OF_WEEK.WED,
      4: DAY_OF_WEEK.THU,
      5: DAY_OF_WEEK.FRI,
      6: DAY_OF_WEEK.SAT,
    };
    const todayHours = businessHours.filter((hour) => hour.day_of_week === dayMap[dayOfWeek]);
    if (!todayHours.length) return { [BUSINESS_HOURS_KIND.ALL_DAY]: TIME_SLOTS };

    const timeSlotsByKind: Partial<Record<BusinessHoursKind, string[]>> = {};

    Object.values(BUSINESS_HOURS_KIND).forEach((kind) => {
      const hours = todayHours.find((hour) => hour.hours_kind === kind);
      if (!hours?.open_time || !hours?.close_time) return;

      const [startHour, startMinute] = hours.open_time.split(':').map(Number);
      const [endHour, endMinute] = hours.close_time.split(':').map(Number);
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      timeSlotsByKind[kind as BusinessHoursKind] = TIME_SLOTS.filter((time) => {
        const [hour, minute] = time.split(':').map(Number);
        const timeInMinutes = hour * 60 + minute;
        return timeInMinutes >= startTimeInMinutes && timeInMinutes < endTimeInMinutes;
      });
    });

    return timeSlotsByKind;
  };
  return {
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
    getNumberOfGuestsOptions,
    getAvailableTimeSlots,
  };
}
