import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { BookingCapacityRepositoryDTO } from '~/.server/repositories/dtos/BookingCapacityRepositoryDTO';
import type { IBookingCapacityRepository } from '~/.server/repositories/interfaces/IBookingCapacityRepository';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';

import type { Week } from '../../types/BookingLimit';
import type { TimeSegments } from '../../types/BookingLimit';
import type { UpdateBookingCapacityServiceArgsDTO } from '../dtos/UpdateBookingCapacityServiceDTO';
import type { IUpdateBookingCapacityService } from '../interfaces/IUpdateBookingCapacityService';

@injectable()
export class UpdateBookingCapacityService implements IUpdateBookingCapacityService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingCapacityRepository)
    private bookingCapacityRepository: IBookingCapacityRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
  ) {}

  async execute({ businessId, bookingLimit }: UpdateBookingCapacityServiceArgsDTO) {
    // Get all the data up front
    const existingCapacities = await this.bookingCapacityRepository.fetchAll({
      business_id: businessId,
    });

    // Convert acquired data into a searchable format
    const capacityMap = new Map<string, BookingCapacityRepositoryDTO>();
    for (const capacity of existingCapacities) {
      capacityMap.set(`${capacity.customer_kind}_${capacity.day}`, capacity);
    }

    const newEntries: Omit<BookingCapacityRepositoryDTO, 'id'>[] = [];
    const updates: { id: number; data: Partial<BookingCapacityRepositoryDTO> }[] = [];

    for (const [customerKind, week] of Object.entries(bookingLimit) as [string, Week][]) {
      const customer_kind =
        customerKind === 'barSeats' ? CUSTOMER_KIND.SINGLE : CUSTOMER_KIND.GROUP;

      for (const [day, times] of Object.entries(week) as [
        keyof typeof DAY_OF_WEEK,
        TimeSegments,
      ][]) {
        const key = `${customer_kind}_${day}`;
        const existing = capacityMap.get(key);

        if (!existing) {
          // If there is no existing data, register new data
          newEntries.push({
            business_id: businessId,
            customer_kind,
            day,
            ...times,
          });
        } else {
          // If there is existing data, add it to the update list if there are any changes
          const updateData: Partial<BookingCapacityRepositoryDTO> = {};
          let needsUpdate = false;

          for (const field of Object.keys(times) as (keyof TimeSegments)[]) {
            if (existing[field] !== times[field]) {
              updateData[field] = times[field];
              needsUpdate = true;
            }
          }

          if (needsUpdate) {
            updates.push({ id: existing.id, data: updateData });
          }
        }
      }
    }

    if (newEntries.length === 0 && updates.length === 0) {
      return false;
    }

    // Do transaction
    await this.transactionManager.execute(async () => {
      if (newEntries.length > 0) {
        await this.bookingCapacityRepository.create(newEntries);
      }

      await Promise.all(
        updates.map(({ id, data }) =>
          this.bookingCapacityRepository.update({ where: { id }, data }),
        ),
      );
    });

    return true;
  }
}
