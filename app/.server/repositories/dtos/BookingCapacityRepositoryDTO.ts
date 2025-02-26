import type { CustomerKind } from "~/types/CustomerKind";
import type { DayOfWeek } from "~/types/DayOfWeek";

export interface BookingCapacityRepositoryDTO {
  id:           number;
  business_id: number;
  day: DayOfWeek;
  customer_kind: CustomerKind;
  time_0_1: number;
  time_1_2: number;
  time_2_3: number;
  time_3_4: number;
  time_4_5: number;
  time_5_6: number;
  time_6_7: number;
  time_7_8: number;
  time_8_9: number;
  time_9_10: number;
  time_10_11: number;
  time_11_12: number;
  time_12_13: number;
  time_13_14: number;
  time_14_15: number;
  time_15_16: number;
  time_16_17: number;
  time_17_18: number;
  time_18_19: number;
  time_19_20: number;
  time_20_21: number;
  time_21_22: number;
  time_22_23: number;
  time_23_24: number;
}
