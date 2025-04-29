import { inject, injectable } from 'inversify';

import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IEmailQueueRepository } from '~/.server/repositories/interfaces/IEmailQueueRepository';
import { createBookingConfirmationDataToken } from '~/utils/createBookingConfirmationDataToken.server';

import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.EmailQueueRepository)
    private emailQueueRepository: IEmailQueueRepository,
  ) {}
  async execute({
    numberOfGuests,
    customerKind,
    courseId,
    date,
    time,
    fullName,
    email,
    url,
  }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const token = createBookingConfirmationDataToken(
      {
        numberOfGuests,
        customerKind,
        courseId,
        date,
        time,
        fullName,
        email,
      },
      3600,
    );

    const subject = 'Confirm Your Email to Complete Your Reservation';
    const body = `
Dear ${fullName},

Thank you for starting your reservation. Before you proceed, please confirm your email address by clicking the link below:

👉 ${url}/confirm?token=${token}

This link will expire in 1 hours. If you did not request this, please ignore this email.

Best regards,
My Booking Team
`;

    await this.emailQueueRepository.create({
      to: email,
      from: process.env.EMAIL_FROM as string,
      subject,
      body,
    });

    return {
      mail: {
        to: email,
        subject,
        body,
      },
    };
  }
}
