import { beforeEach, describe, expect, it } from 'vitest';

import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';

import { DI_TYPES } from '../di_container/DI_TYPES';
import { DIContainer } from '../di_container/DIContainer';
import type { IActionService } from '../interfaces/IActionService';

describe('ActionService', () => {
  let actionService: IActionService;
  let diContainer: DIContainer;

  beforeEach(() => {
    diContainer = new DIContainer();
    diContainer.bindMock();
    const container = diContainer.getContainer();
    actionService = container.get<IActionService>(DI_TYPES.ActionService);
  });

  describe('execute', () => {
    it('should confirm booking successfully', async () => {
      const result = await actionService.execute({
        businessUuid: '0ff59d2d-32c1-4e6b-8ff1-e0f7ed2dfea8',
        fullName: 'Yuichi Nabeshima',
        email: 'test@my-booking.tech',
        date: new Date('2025-04-25'),
        time: '17:00',
        courseId: 1,
        customerKind: CUSTOMER_KIND.SINGLE,
        numberOfguests: 2,
      });

      expect(result.status).toBe('SUCCESS');
    });
  });
});
