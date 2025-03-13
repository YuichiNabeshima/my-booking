import { inject, injectable } from "inversify";
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";
import type { IActionService } from "../interfaces/IActionService";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";
import { InvalidAuthError } from "~/.server/custom_errors/InvalidAuthError";
import { DI_TYPES } from "../di_container/DI_TYPES";
import type { IUpdateBookingCapacityService } from "../interfaces/IUpdateBookingCapacityService";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
    @inject(DI_TYPES.UpdateBookingCapacityService) private updateBookingCapacityService: IUpdateBookingCapacityService,
  ) {}

  async execute({ cookie, bookingLimit }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.sessionStorageService.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }
    const businessId = session.data.id as number;

    return await this.updateBookingCapacityService.execute({ businessId, bookingLimit });

    // (Object.entries(bookingLimit) as [string, Week][]).forEach(([customerKind, week]) => {
    //   (Object.entries(week) as [keyof typeof DAY_OF_WEEK, TimeSegments][]).forEach(async ([day, times]) => {
    //     const customer_kind = customerKind === 'barSeats' ? CUSTOMER_KIND.SINGLE : CUSTOMER_KIND.GROUP;
    //     const existingBookingCapacity = await this.bookingCapacityRepository.fetch({ business_id_day_customer_kind: { business_id: businessId, customer_kind, day } });

    //     if (!existingBookingCapacity) {
    //       await this.bookingCapacityRepository.create({
    //         business_id: businessId,
    //         day,
    //         customer_kind,
    //         time_0_1: times.time_0_1,
    //         time_1_2: times.time_1_2,
    //         time_2_3: times.time_2_3,
    //         time_3_4: times.time_3_4,
    //         time_4_5: times.time_4_5,
    //         time_5_6: times.time_5_6,
    //         time_6_7: times.time_6_7,
    //         time_7_8: times.time_7_8,
    //         time_8_9: times.time_8_9,
    //         time_9_10: times.time_9_10,
    //         time_10_11: times.time_10_11,
    //         time_11_12: times.time_11_12,
    //         time_12_13: times.time_12_13,
    //         time_13_14: times.time_13_14,
    //         time_14_15: times.time_14_15,
    //         time_15_16: times.time_15_16,
    //         time_16_17: times.time_16_17,
    //         time_17_18: times.time_17_18,
    //         time_18_19: times.time_18_19,
    //         time_19_20: times.time_19_20,
    //         time_20_21: times.time_20_21,
    //         time_21_22: times.time_21_22,
    //         time_22_23: times.time_22_23,
    //         time_23_24: times.time_23_24,
    //       });
    //     } else {
    //       for (const field of Object.values(TIME_SEGMENTS)) {
    //         if (existingBookingCapacity[field] && existingBookingCapacity[field] !== times[field]) {
    //           await this.bookingCapacityRepository.update({ where: { id: existingBookingCapacity.id }, data: { ...times } });
    //         }
    //       }
    //     }
    //   });
    // });
  }
}