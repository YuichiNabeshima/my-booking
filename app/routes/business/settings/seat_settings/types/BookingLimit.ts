import type { DayOfWeek } from "~/types/enums/DayOfWeek";
import type { TIME_SEGMENTS } from "../constants/TIME_SEGMENTS";

export interface TimeSegments {
  [TIME_SEGMENTS.time_0_1]: number;
  [TIME_SEGMENTS.time_1_2]: number;
  [TIME_SEGMENTS.time_2_3]: number;
  [TIME_SEGMENTS.time_3_4]: number;
  [TIME_SEGMENTS.time_4_5]: number;
  [TIME_SEGMENTS.time_5_6]: number;
  [TIME_SEGMENTS.time_6_7]: number;
  [TIME_SEGMENTS.time_7_8]: number;
  [TIME_SEGMENTS.time_8_9]: number;
  [TIME_SEGMENTS.time_9_10]: number;
  [TIME_SEGMENTS.time_10_11]: number;
  [TIME_SEGMENTS.time_11_12]: number;
  [TIME_SEGMENTS.time_12_13]: number;
  [TIME_SEGMENTS.time_13_14]: number;
  [TIME_SEGMENTS.time_14_15]: number;
  [TIME_SEGMENTS.time_15_16]: number;
  [TIME_SEGMENTS.time_16_17]: number;
  [TIME_SEGMENTS.time_17_18]: number;
  [TIME_SEGMENTS.time_18_19]: number;
  [TIME_SEGMENTS.time_19_20]: number;
  [TIME_SEGMENTS.time_20_21]: number;
  [TIME_SEGMENTS.time_21_22]: number;
  [TIME_SEGMENTS.time_22_23]: number;
  [TIME_SEGMENTS.time_23_24]: number;
}

export type Week = {
  [K in DayOfWeek]: TimeSegments;
}

export interface BookingLimit {
  barSeats: Week;
  tableSeats: Week;
}