import type { BusinessHoursKind } from '~/types/enums/BusinessHoursKind';
import type { DayOfWeek } from '~/types/enums/DayOfWeek';

export interface BusinessHoursRepositoryDTO {
  id: number;
  business_id: number;
  day_of_week: DayOfWeek;
  hours_kind: BusinessHoursKind | null;
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
}
