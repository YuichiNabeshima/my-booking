import { inject, injectable } from 'inversify';

import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IMailQueRepository } from '~/.server/repositories/interfaces/IMailQueRepository';

import { createToken } from '../../utils/createToken.server';
import type { HandleActionArgsDTO, HandleActionResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.MailQueRepository) private mailQueRepository: IMailQueRepository,
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
  }: HandleActionArgsDTO): Promise<HandleActionResultDTO> {
    const token = createToken(
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
My Reservation Team
`;

    await this.mailQueRepository.create({
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
