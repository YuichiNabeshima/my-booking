import { inject, injectable } from "inversify";
import type { IActionService } from "../interfaces/IActionService";
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ISessionStorageManager } from "~/.server/core/session/ISessionStorageManager";
import { InvalidAuthError } from "~/.server/core/custom_error/errors/InvalidAuthError";
import type { ITransactionManager } from "~/.server/core/transaction/ITransactionManager";
import type { IBusinessHoursRepository } from "~/.server/repositories/interfaces/IBusinessHoursRepository";
import type { BusinessHoursRepositoryDTO } from "~/.server/repositories/dtos/BusinessHoursRepositoryDTO";
import type { DayOfWeek } from "~/types/enums/DayOfWeek";
import type { BusinessHoursKind } from "~/types/enums/BusinessHoursKind";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager) private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
    @inject(GLOBAL_DI_TYPES.BusinessHoursRepostory) private businessHoursRepository: IBusinessHoursRepository,
  ) {}

  async execute({ cookie, inputData }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }
    const businessId = session.data.id as number;

    const existingBusinessHours = await this.businessHoursRepository.fetchAll({ business_id: businessId });

    const businessHours: BusinessHoursRepositoryDTO[] = [];
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
    const hoursKinds = ['all_day', 'morning', 'lunch', 'dinner', 'bar'] as const;

    for (const day of days) {
      for (const hoursKind of hoursKinds) {
        const openKey = `${day}-${hoursKind}-open` as keyof typeof inputData;
        const closeKey = `${day}-${hoursKind}-close` as keyof typeof inputData;
        const openTime = inputData[openKey];
        const closeTime = inputData[closeKey];

        if (openTime || closeTime) {
          businessHours.push({
            id: 0, // Temporary ID for new records
            business_id: businessId,
            day_of_week: day.toUpperCase() as DayOfWeek,
            hours_kind: hoursKind.toUpperCase() as BusinessHoursKind,
            is_open: true,
            open_time: openTime || null,
            close_time: closeTime || null,
          });
        }
      }
    }

    // Check if there are any changes between existing and new data
    const hasChanges = businessHours.some((newHours) => {
      const existing = existingBusinessHours.find(
        existing => existing.day_of_week === newHours.day_of_week && existing.hours_kind === newHours.hours_kind
      );

      if (!existing) return true; // New record found
      
      return (
        existing.is_open !== newHours.is_open ||
        existing.open_time !== newHours.open_time ||
        existing.close_time !== newHours.close_time
      );
    }) || existingBusinessHours.some(existing => 
      !businessHours.some(newHours => 
        newHours.day_of_week === existing.day_of_week && newHours.hours_kind === existing.hours_kind
      )
    );

    if (!hasChanges) {
      return false;
    }

    // Data to update or create
    const toUpdateOrCreate = businessHours.map(newHours => {
      const existing = existingBusinessHours.find(
        existing => existing.day_of_week === newHours.day_of_week && existing.hours_kind === newHours.hours_kind
      );

      if (existing) {
        // Update existing record
        return {
          ...newHours,
          id: existing.id,
        };
      }

      // Create new record
      return {
        ...newHours,
        business_id: businessId,
      };
    });

    // Data to delete (exists in current data but not in new data)
    const toDelete = existingBusinessHours.filter(existing => 
      !businessHours.some(newHours => 
        newHours.day_of_week === existing.day_of_week && newHours.hours_kind === existing.hours_kind
      )
    );

    await this.transactionManager.execute(async () => {
      // Update or create records
      for (const data of toUpdateOrCreate) {
        if (data.id) {
          await this.businessHoursRepository.update({ where: { id: data.id }, data });
        } else {
          const { id, ...createData } = data;
          await this.businessHoursRepository.create(createData);
        }
      }

      // Delete records
      for (const data of toDelete) {
        await this.businessHoursRepository.remove({ id: data.id });
      }
    });

    return true;
  }
}