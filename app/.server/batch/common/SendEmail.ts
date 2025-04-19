import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IEmailLogRepository } from '~/.server/repositories/interfaces/IEmailLogRepository';
import type { IEmailQueueRepository } from '~/.server/repositories/interfaces/IEmailQueueRepository';

import { BaseBatch } from '../BaseBatch';

const client = new SESClient({ region: process.env.AWS_REGION });

@injectable()
export class SendEmail extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.EmailQueueRepository)
    private emailQueueRepository: IEmailQueueRepository,
    @inject(GLOBAL_DI_TYPES.EmailLogRepository) private emailLogRepository: IEmailLogRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
  ) {
    super();
  }

  async run() {
    const emailQueues = await this.emailQueueRepository.fetchAll();

    for (const emailQueue of emailQueues) {
      await this.transactionManager.execute(async () => {
        const { id, to, from, subject, body } = emailQueue;
        const params = {
          Destination: {
            ToAddresses: [to],
          },
          Message: {
            Body: {
              Text: { Data: body },
            },
            Subject: { Data: subject },
          },
          Source: process.env.EMAIL_FROM,
        };

        const command = new SendEmailCommand(params);
        await client.send(command);

        await this.emailLogRepository.create({
          from,
          to,
          subject,
          body,
        });

        await this.emailQueueRepository.remove({ id });
      });
    }
  }
}
