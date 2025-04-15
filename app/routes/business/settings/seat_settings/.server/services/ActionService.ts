import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DI_TYPES } from '../di_container/DI_TYPES';
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';
import type { IUpdateBookingCapacityService } from '../interfaces/IUpdateBookingCapacityService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
    @inject(DI_TYPES.UpdateBookingCapacityService)
    private updateBookingCapacityService: IUpdateBookingCapacityService,
  ) {}

  async execute({ cookie, bookingLimit }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }
    const businessId = session.data.id as number;

    return await this.updateBookingCapacityService.execute({ businessId, bookingLimit });
  }
}
