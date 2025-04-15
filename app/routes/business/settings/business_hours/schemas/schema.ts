import { z } from 'zod';

import { FORM_NAME } from '../constants/FORM_NAME';

// Time format validation pattern (HH:MM, 00:00-23:59)
const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const validateTimePair = (
  open: string | undefined,
  close: string | undefined,
  openFieldName: string,
) => {
  if (open === undefined && close === undefined) return { isValid: true };
  if (open === undefined || close === undefined) return { isValid: false, field: openFieldName };
  return { isValid: true };
};

export const schema = z
  .object({
    // Monday
    [FORM_NAME.MON_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.MON_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.MON_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.MON_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.MON_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.MON_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.MON_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.MON_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.MON_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.MON_BAR_CLOSE]: z.string().optional(),

    // Tuesday
    [FORM_NAME.TUE_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.TUE_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.TUE_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.TUE_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.TUE_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.TUE_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.TUE_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.TUE_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.TUE_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.TUE_BAR_CLOSE]: z.string().optional(),

    // Wednesday
    [FORM_NAME.WED_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.WED_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.WED_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.WED_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.WED_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.WED_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.WED_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.WED_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.WED_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.WED_BAR_CLOSE]: z.string().optional(),

    // Thursday
    [FORM_NAME.THU_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.THU_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.THU_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.THU_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.THU_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.THU_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.THU_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.THU_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.THU_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.THU_BAR_CLOSE]: z.string().optional(),

    // Friday
    [FORM_NAME.FRI_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.FRI_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.FRI_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.FRI_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.FRI_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.FRI_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.FRI_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.FRI_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.FRI_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.FRI_BAR_CLOSE]: z.string().optional(),

    // Saturday
    [FORM_NAME.SAT_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.SAT_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.SAT_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.SAT_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.SAT_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.SAT_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.SAT_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.SAT_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.SAT_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.SAT_BAR_CLOSE]: z.string().optional(),

    // Sunday
    [FORM_NAME.SUN_ALLDAY_OPEN]: z.string().optional(),
    [FORM_NAME.SUN_ALLDAY_CLOSE]: z.string().optional(),
    [FORM_NAME.SUN_MORNING_OPEN]: z.string().optional(),
    [FORM_NAME.SUN_MORNING_CLOSE]: z.string().optional(),
    [FORM_NAME.SUN_LUNCH_OPEN]: z.string().optional(),
    [FORM_NAME.SUN_LUNCH_CLOSE]: z.string().optional(),
    [FORM_NAME.SUN_DINNER_OPEN]: z.string().optional(),
    [FORM_NAME.SUN_DINNER_CLOSE]: z.string().optional(),
    [FORM_NAME.SUN_BAR_OPEN]: z.string().optional(),
    [FORM_NAME.SUN_BAR_CLOSE]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const errors: string[] = [];

    // Time format validation
    Object.entries(data).forEach(([key, value]) => {
      if (value && !timePattern.test(value)) {
        errors.push(key);
      }
    });

    if (errors.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Time must be in HH:MM format (e.g., 09:00)',
        path: [errors[0]],
      });
    }

    // Monday
    const monAllDay = validateTimePair(
      data[FORM_NAME.MON_ALLDAY_OPEN],
      data[FORM_NAME.MON_ALLDAY_CLOSE],
      FORM_NAME.MON_ALLDAY_OPEN,
    );
    if (!monAllDay.isValid) errors.push(monAllDay.field!);
    const monMorning = validateTimePair(
      data[FORM_NAME.MON_MORNING_OPEN],
      data[FORM_NAME.MON_MORNING_CLOSE],
      FORM_NAME.MON_MORNING_OPEN,
    );
    if (!monMorning.isValid) errors.push(monMorning.field!);
    const monLunch = validateTimePair(
      data[FORM_NAME.MON_LUNCH_OPEN],
      data[FORM_NAME.MON_LUNCH_CLOSE],
      FORM_NAME.MON_LUNCH_OPEN,
    );
    if (!monLunch.isValid) errors.push(monLunch.field!);
    const monDinner = validateTimePair(
      data[FORM_NAME.MON_DINNER_OPEN],
      data[FORM_NAME.MON_DINNER_CLOSE],
      FORM_NAME.MON_DINNER_OPEN,
    );
    if (!monDinner.isValid) errors.push(monDinner.field!);
    const monBar = validateTimePair(
      data[FORM_NAME.MON_BAR_OPEN],
      data[FORM_NAME.MON_BAR_CLOSE],
      FORM_NAME.MON_BAR_OPEN,
    );
    if (!monBar.isValid) errors.push(monBar.field!);

    // Tuesday
    const tueAllDay = validateTimePair(
      data[FORM_NAME.TUE_ALLDAY_OPEN],
      data[FORM_NAME.TUE_ALLDAY_CLOSE],
      FORM_NAME.TUE_ALLDAY_OPEN,
    );
    if (!tueAllDay.isValid) errors.push(tueAllDay.field!);
    const tueMorning = validateTimePair(
      data[FORM_NAME.TUE_MORNING_OPEN],
      data[FORM_NAME.TUE_MORNING_CLOSE],
      FORM_NAME.TUE_MORNING_OPEN,
    );
    if (!tueMorning.isValid) errors.push(tueMorning.field!);
    const tueLunch = validateTimePair(
      data[FORM_NAME.TUE_LUNCH_OPEN],
      data[FORM_NAME.TUE_LUNCH_CLOSE],
      FORM_NAME.TUE_LUNCH_OPEN,
    );
    if (!tueLunch.isValid) errors.push(tueLunch.field!);
    const tueDinner = validateTimePair(
      data[FORM_NAME.TUE_DINNER_OPEN],
      data[FORM_NAME.TUE_DINNER_CLOSE],
      FORM_NAME.TUE_DINNER_OPEN,
    );
    if (!tueDinner.isValid) errors.push(tueDinner.field!);
    const tueBar = validateTimePair(
      data[FORM_NAME.TUE_BAR_OPEN],
      data[FORM_NAME.TUE_BAR_CLOSE],
      FORM_NAME.TUE_BAR_OPEN,
    );
    if (!tueBar.isValid) errors.push(tueBar.field!);

    // Wednesday
    const wedAllDay = validateTimePair(
      data[FORM_NAME.WED_ALLDAY_OPEN],
      data[FORM_NAME.WED_ALLDAY_CLOSE],
      FORM_NAME.WED_ALLDAY_OPEN,
    );
    if (!wedAllDay.isValid) errors.push(wedAllDay.field!);
    const wedMorning = validateTimePair(
      data[FORM_NAME.WED_MORNING_OPEN],
      data[FORM_NAME.WED_MORNING_CLOSE],
      FORM_NAME.WED_MORNING_OPEN,
    );
    if (!wedMorning.isValid) errors.push(wedMorning.field!);
    const wedLunch = validateTimePair(
      data[FORM_NAME.WED_LUNCH_OPEN],
      data[FORM_NAME.WED_LUNCH_CLOSE],
      FORM_NAME.WED_LUNCH_OPEN,
    );
    if (!wedLunch.isValid) errors.push(wedLunch.field!);
    const wedDinner = validateTimePair(
      data[FORM_NAME.WED_DINNER_OPEN],
      data[FORM_NAME.WED_DINNER_CLOSE],
      FORM_NAME.WED_DINNER_OPEN,
    );
    if (!wedDinner.isValid) errors.push(wedDinner.field!);
    const wedBar = validateTimePair(
      data[FORM_NAME.WED_BAR_OPEN],
      data[FORM_NAME.WED_BAR_CLOSE],
      FORM_NAME.WED_BAR_OPEN,
    );
    if (!wedBar.isValid) errors.push(wedBar.field!);

    // Thursday
    const thuAllDay = validateTimePair(
      data[FORM_NAME.THU_ALLDAY_OPEN],
      data[FORM_NAME.THU_ALLDAY_CLOSE],
      FORM_NAME.THU_ALLDAY_OPEN,
    );
    if (!thuAllDay.isValid) errors.push(thuAllDay.field!);
    const thuMorning = validateTimePair(
      data[FORM_NAME.THU_MORNING_OPEN],
      data[FORM_NAME.THU_MORNING_CLOSE],
      FORM_NAME.THU_MORNING_OPEN,
    );
    if (!thuMorning.isValid) errors.push(thuMorning.field!);
    const thuLunch = validateTimePair(
      data[FORM_NAME.THU_LUNCH_OPEN],
      data[FORM_NAME.THU_LUNCH_CLOSE],
      FORM_NAME.THU_LUNCH_OPEN,
    );
    if (!thuLunch.isValid) errors.push(thuLunch.field!);
    const thuDinner = validateTimePair(
      data[FORM_NAME.THU_DINNER_OPEN],
      data[FORM_NAME.THU_DINNER_CLOSE],
      FORM_NAME.THU_DINNER_OPEN,
    );
    if (!thuDinner.isValid) errors.push(thuDinner.field!);
    const thuBar = validateTimePair(
      data[FORM_NAME.THU_BAR_OPEN],
      data[FORM_NAME.THU_BAR_CLOSE],
      FORM_NAME.THU_BAR_OPEN,
    );
    if (!thuBar.isValid) errors.push(thuBar.field!);

    // Friday
    const friAllDay = validateTimePair(
      data[FORM_NAME.FRI_ALLDAY_OPEN],
      data[FORM_NAME.FRI_ALLDAY_CLOSE],
      FORM_NAME.FRI_ALLDAY_OPEN,
    );
    if (!friAllDay.isValid) errors.push(friAllDay.field!);
    const friMorning = validateTimePair(
      data[FORM_NAME.FRI_MORNING_OPEN],
      data[FORM_NAME.FRI_MORNING_CLOSE],
      FORM_NAME.FRI_MORNING_OPEN,
    );
    if (!friMorning.isValid) errors.push(friMorning.field!);
    const friLunch = validateTimePair(
      data[FORM_NAME.FRI_LUNCH_OPEN],
      data[FORM_NAME.FRI_LUNCH_CLOSE],
      FORM_NAME.FRI_LUNCH_OPEN,
    );
    if (!friLunch.isValid) errors.push(friLunch.field!);
    const friDinner = validateTimePair(
      data[FORM_NAME.FRI_DINNER_OPEN],
      data[FORM_NAME.FRI_DINNER_CLOSE],
      FORM_NAME.FRI_DINNER_OPEN,
    );
    if (!friDinner.isValid) errors.push(friDinner.field!);
    const friBar = validateTimePair(
      data[FORM_NAME.FRI_BAR_OPEN],
      data[FORM_NAME.FRI_BAR_CLOSE],
      FORM_NAME.FRI_BAR_OPEN,
    );
    if (!friBar.isValid) errors.push(friBar.field!);

    // Saturday
    const satAllDay = validateTimePair(
      data[FORM_NAME.SAT_ALLDAY_OPEN],
      data[FORM_NAME.SAT_ALLDAY_CLOSE],
      FORM_NAME.SAT_ALLDAY_OPEN,
    );
    if (!satAllDay.isValid) errors.push(satAllDay.field!);
    const satMorning = validateTimePair(
      data[FORM_NAME.SAT_MORNING_OPEN],
      data[FORM_NAME.SAT_MORNING_CLOSE],
      FORM_NAME.SAT_MORNING_OPEN,
    );
    if (!satMorning.isValid) errors.push(satMorning.field!);
    const satLunch = validateTimePair(
      data[FORM_NAME.SAT_LUNCH_OPEN],
      data[FORM_NAME.SAT_LUNCH_CLOSE],
      FORM_NAME.SAT_LUNCH_OPEN,
    );
    if (!satLunch.isValid) errors.push(satLunch.field!);
    const satDinner = validateTimePair(
      data[FORM_NAME.SAT_DINNER_OPEN],
      data[FORM_NAME.SAT_DINNER_CLOSE],
      FORM_NAME.SAT_DINNER_OPEN,
    );
    if (!satDinner.isValid) errors.push(satDinner.field!);
    const satBar = validateTimePair(
      data[FORM_NAME.SAT_BAR_OPEN],
      data[FORM_NAME.SAT_BAR_CLOSE],
      FORM_NAME.SAT_BAR_OPEN,
    );
    if (!satBar.isValid) errors.push(satBar.field!);

    // Sunday
    const sunAllDay = validateTimePair(
      data[FORM_NAME.SUN_ALLDAY_OPEN],
      data[FORM_NAME.SUN_ALLDAY_CLOSE],
      FORM_NAME.SUN_ALLDAY_OPEN,
    );
    if (!sunAllDay.isValid) errors.push(sunAllDay.field!);
    const sunMorning = validateTimePair(
      data[FORM_NAME.SUN_MORNING_OPEN],
      data[FORM_NAME.SUN_MORNING_CLOSE],
      FORM_NAME.SUN_MORNING_OPEN,
    );
    if (!sunMorning.isValid) errors.push(sunMorning.field!);
    const sunLunch = validateTimePair(
      data[FORM_NAME.SUN_LUNCH_OPEN],
      data[FORM_NAME.SUN_LUNCH_CLOSE],
      FORM_NAME.SUN_LUNCH_OPEN,
    );
    if (!sunLunch.isValid) errors.push(sunLunch.field!);
    const sunDinner = validateTimePair(
      data[FORM_NAME.SUN_DINNER_OPEN],
      data[FORM_NAME.SUN_DINNER_CLOSE],
      FORM_NAME.SUN_DINNER_OPEN,
    );
    if (!sunDinner.isValid) errors.push(sunDinner.field!);
    const sunBar = validateTimePair(
      data[FORM_NAME.SUN_BAR_OPEN],
      data[FORM_NAME.SUN_BAR_CLOSE],
      FORM_NAME.SUN_BAR_OPEN,
    );
    if (!sunBar.isValid) errors.push(sunBar.field!);

    if (errors.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Opening and closing times must be set together',
        path: [errors[0]],
      });
    }
  });
