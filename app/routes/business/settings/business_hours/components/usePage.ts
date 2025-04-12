import { useState, useEffect } from "react"
import { useActionData, useLoaderData } from "react-router"
import { useSetAtom } from "jotai"
import { z } from "zod"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { BUSINESS_HOURS_KIND } from "~/constants/enums/BUSINESS_HOURS_KIND"
import { DAY_OF_WEEK } from "~/constants/DAY_OF_WEEK"
import type { BusinessHoursKind } from "~/types/enums/BusinessHoursKind"
import type { DayOfWeek } from "~/types/enums/DayOfWeek"
import type { BusinessHoursRepositoryDTO } from "~/.server/repositories/dtos/BusinessHoursRepositoryDTO"
import { FORM_NAME } from "../constants/FORM_NAME"
import { schema } from "../schemas/schema"
import { STATUS } from "../constants/STATUS"
import { showToastAtom, type ToastStatus } from "../../_layout/stores/toast"
import type { action, loader } from "../route"

export function usePage() {
  const data = useLoaderData<typeof loader>();
  const existingHours = data ?? [];
  const result = useActionData<typeof action>();

  // Create a map to track existing hours
  const existingHoursMap = new Map<string, BusinessHoursRepositoryDTO>()

  // Add existing hours to the map
  existingHours.forEach((hour) => {
    const key = `${hour.day_of_week}_${hour.hours_kind || "NULL"}`
    existingHoursMap.set(key, hour)
  })

  // Create all possible combinations
  const allHours: BusinessHoursRepositoryDTO[] = []

  Object.keys(DAY_OF_WEEK).map((day) => {
    // Add entry for each hours kind
    Object.keys(BUSINESS_HOURS_KIND).forEach((kind) => {
      const key = `${day}_${kind}`
      if (existingHoursMap.has(key)) {
        // Use existing data if available
        allHours.push(existingHoursMap.get(key)!)
      } else {
        // Create default data
        allHours.push({
          id: 0,
          business_id: 0,
          day_of_week: day as DayOfWeek,
          hours_kind: kind as BusinessHoursKind,
          is_open: true,
          open_time: null,
          close_time: null,
        })
      }
    })
  })

  // Determine which days and hours kinds have data
  const [openDayValues, setOpenDayValues] = useState<string[]>([])
  const [openHoursKindValues, setOpenHoursKindValues] = useState<string[]>([])

  useEffect(() => {
    // Set initial open state based on data
    allHours.forEach((hour) => {
      if (hour.open_time || hour.close_time) {
        setOpenDayValues((prev) => [...prev, hour.day_of_week])
        setOpenHoursKindValues((prev) => [...prev, `${hour.day_of_week}_${hour.hours_kind}`])
      }
    })
  }, []);

  const showToast = useSetAtom(showToastAtom);

  useEffect(() => {
    if (result) {
      const status: ToastStatus = result.status === STATUS.SUCCESS ? 'success'
                                  : result.status === STATUS.NO_DIFFERENCE ? 'info'
                                  : 'error';
      const message = result.status === STATUS.SUCCESS ? 'Update successfly!'
                      : result.status === STATUS.NO_DIFFERENCE ? 'No difference.'
                      : 'Update failed.';
      showToast(status, message);
    }
  }, [result]);

  // Group hours by day
  const hoursByDay = allHours.reduce(
    (acc, hour) => {
      if (!acc[hour.day_of_week]) {
        acc[hour.day_of_week] = []
      }
      acc[hour.day_of_week].push(hour)
      return acc
    },
    {} as Record<DayOfWeek, BusinessHoursRepositoryDTO[]>,
  )

  const [form, fields] = useForm<z.infer<typeof schema>>({
    onValidate({ formData }) {
      console.log(parseWithZod(formData, { schema }));
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      // Monday
      [FORM_NAME.MON_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.MON_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.MON_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.MON_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.MON_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.MON_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.MON_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.MON_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.MON_BAR_OPEN]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.MON_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "MON" && h.hours_kind === "BAR")?.close_time,

      // Tuesday
      [FORM_NAME.TUE_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.TUE_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.TUE_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.TUE_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.TUE_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.TUE_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.TUE_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.TUE_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.TUE_BAR_OPEN]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.TUE_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "TUE" && h.hours_kind === "BAR")?.close_time,

      // Wednesday
      [FORM_NAME.WED_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.WED_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.WED_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.WED_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.WED_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.WED_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.WED_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.WED_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.WED_BAR_OPEN]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.WED_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "WED" && h.hours_kind === "BAR")?.close_time,

      // Thursday
      [FORM_NAME.THU_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.THU_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.THU_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.THU_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.THU_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.THU_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.THU_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.THU_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.THU_BAR_OPEN]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.THU_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "THU" && h.hours_kind === "BAR")?.close_time,

      // Friday
      [FORM_NAME.FRI_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.FRI_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.FRI_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.FRI_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.FRI_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.FRI_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.FRI_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.FRI_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.FRI_BAR_OPEN]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.FRI_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "FRI" && h.hours_kind === "BAR")?.close_time,

      // Saturday
      [FORM_NAME.SAT_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.SAT_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.SAT_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.SAT_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.SAT_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.SAT_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.SAT_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.SAT_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.SAT_BAR_OPEN]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.SAT_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "SAT" && h.hours_kind === "BAR")?.close_time,

      // Sunday
      [FORM_NAME.SUN_ALLDAY_OPEN]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "ALL_DAY")?.open_time,
      [FORM_NAME.SUN_ALLDAY_CLOSE]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "ALL_DAY")?.close_time,
      [FORM_NAME.SUN_MORNING_OPEN]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "MORNING")?.open_time,
      [FORM_NAME.SUN_MORNING_CLOSE]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "MORNING")?.close_time,
      [FORM_NAME.SUN_LUNCH_OPEN]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "LUNCH")?.open_time,
      [FORM_NAME.SUN_LUNCH_CLOSE]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "LUNCH")?.close_time,
      [FORM_NAME.SUN_DINNER_OPEN]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "DINNER")?.open_time,
      [FORM_NAME.SUN_DINNER_CLOSE]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "DINNER")?.close_time,
      [FORM_NAME.SUN_BAR_OPEN]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "BAR")?.open_time,
      [FORM_NAME.SUN_BAR_CLOSE]: allHours.find((h) => h.day_of_week === "SUN" && h.hours_kind === "BAR")?.close_time,
    },
  });

  return {
    form,
    openDayValues,
    setOpenDayValues,
    openHoursKindValues,
    setOpenHoursKindValues,
    hoursByDay,
    fields,
  };
}