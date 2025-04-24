import { beforeEach, describe, expect, it } from 'vitest';

import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';

import { DI_TYPES } from '../di_container/DI_TYPES';
import { DIContainer } from '../di_container/DIContainer';
import type { IActionService } from '../interfaces/IActionService';

describe('ActionService', () => {
  let actionService: IActionService;

  beforeEach(() => {
    const diContainer = new DIContainer();
    diContainer.bindMock();
    const container = diContainer.getContainer();
    actionService = container.get<IActionService>(DI_TYPES.ActionService);
  });

  describe('execute', () => {
    it('should return success status', async () => {
      const result = await actionService.execute({
        numberOfGuests: 1,
        customerKind: CUSTOMER_KIND.SINGLE,
        courseId: 1,
        date: new Date('2025-04-25'),
        time: '12:00',
        fullName: 'Yuichi Nabeshima',
        email: 'test@example.com',
        url: 'https://my-booking.tech/booking/1/confirm',
      });
      expect(result).toMatchObject({
        mail: {
          to: 'test@example.com',
          subject: 'Confirm Your Email to Complete Your Reservation',
        },
      });
    });
  });
});
