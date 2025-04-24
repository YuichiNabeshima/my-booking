import { inject, injectable } from 'inversify';

import { BookingNotFoundError } from '~/.server/core/custom_error/errors/repositories/BookingNotFoundError';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';

import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
  ) {}

  async execute({ bookingId, status }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const booking = await this.bookingRepository.fetch({ id: bookingId });

    if (!booking) {
      throw new BookingNotFoundError('Booking not found.');
    }

    if (booking.status === status) {
      return null;
    }

    await this.bookingRepository.update({
      where: { id: bookingId },
      data: { status },
    });
    return status;
  }
}
