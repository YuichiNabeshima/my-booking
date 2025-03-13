import type { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { BookingCapacityRepositoryDTO } from "~/.server/repositories/dtos/BookingCapacityRepositoryDTO";
import type { IBookingCapacityRepository } from "~/.server/repositories/interfaces/IBookingCapacityRepository";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import { DAY_OF_WEEK } from "~/constants/DAY_OF_WEEK";

@injectable()
export class BookingCapacityRepositoryMock extends BaseRepository<Partial<BookingCapacityRepositoryDTO>> implements IBookingCapacityRepository<Partial<BookingCapacityRepositoryDTO>> {
  async fetch(args: unknown): Promise<BookingCapacityRepositoryDTO | null> {
    void args;
    return {
      id: 1,
      business_id: 0,
      day: DAY_OF_WEEK.FRI,
      customer_kind: CUSTOMER_KIND.SINGLE,
      time_0_1: 0,
      time_1_2: 0,
      time_2_3: 0,
      time_3_4: 0,
      time_4_5: 0,
      time_5_6: 0,
      time_6_7: 0,
      time_7_8: 0,
      time_8_9: 0,
      time_9_10: 0,
      time_10_11: 0,
      time_11_12: 2,
      time_12_13: 2,
      time_13_14: 2,
      time_14_15: 2,
      time_15_16: 0,
      time_16_17: 0,
      time_17_18: 0,
      time_18_19: 2,
      time_19_20: 2,
      time_20_21: 2,
      time_21_22: 2,
      time_22_23: 2,
      time_23_24: 2,
    };
  }
}