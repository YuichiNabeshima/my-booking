import { beforeEach, describe, expect, it } from 'vitest';

import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';

import { DI_TYPES } from '../di_container/DI_TYPES';
import { DIContainer } from '../di_container/DIContainer';
import type { ILoaderService } from '../interfaces/ILoaderService';

describe('LoaderService', () => {
  let loaderService: ILoaderService;
  let diContainer: DIContainer;

  beforeEach(() => {
    diContainer = new DIContainer();
    diContainer.bindMockRepository();
    const container = diContainer.getContainer();
    loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  });

  describe('execute', () => {
    it('should return availability data for single seat', async () => {
      const data = await loaderService.execute({
        businessUuid: '0ff59d2d-32c1-4e6b-8ff1-e0f7ed2dfea8',
        customerKind: CUSTOMER_KIND.SINGLE,
        courseId: 1,
        date: new Date('2025-04-25'),
      });

      expect(data.avaliability).toBeDefined();
      expect(data.avaliability).toMatchObject({
        '00:00': 0,
        '00:15': 0,
        '00:30': 0,
        '00:45': 0,
        '01:00': 0,
        '01:15': 0,
        '01:30': 0,
        '01:45': 0,
        '02:00': 0,
        '02:15': 0,
        '02:30': 0,
        '02:45': 0,
        '03:00': 0,
        '03:15': 0,
        '03:30': 0,
        '03:45': 0,
        '04:00': 0,
        '04:15': 0,
        '04:30': 0,
        '04:45': 0,
        '05:00': 0,
        '05:15': 0,
        '05:30': 0,
        '05:45': 0,
        '06:00': 0,
        '06:15': 0,
        '06:30': 0,
        '06:45': 0,
        '07:00': 0,
        '07:15': 0,
        '07:30': 0,
        '07:45': 0,
        '08:00': 0,
        '08:15': 0,
        '08:30': 0,
        '08:45': 0,
        '09:00': 0,
        '09:15': 0,
        '09:30': 0,
        '09:45': 0,
        '10:00': 0,
        '10:15': 0,
        '10:30': 0,
        '10:45': 0,
        '11:00': 2,
        '11:15': 2,
        '11:30': 2,
        '11:45': 2,
        '12:00': 2,
        '12:15': 2,
        '12:30': 2,
        '12:45': 2,
        '13:00': 2,
        '13:15': 2,
        '13:30': 2,
        '13:45': 2,
        '14:00': 2,
        '14:15': 2,
        '14:30': 2,
        '14:45': 2,
        '15:00': 0,
        '15:15': 0,
        '15:30': 0,
        '15:45': 0,
        '16:00': 0,
        '16:15': 0,
        '16:30': 0,
        '16:45': 0,
        '17:00': 0,
        '17:15': 0,
        '17:30': 0,
        '17:45': 0,
        '18:00': 2,
        '18:15': 2,
        '18:30': 2,
        '18:45': 2,
        '19:00': 2,
        '19:15': 2,
        '19:30': 2,
        '19:45': 2,
        '20:00': 0,
        '20:15': 0,
        '20:30': 0,
        '20:45': 0,
        '21:00': 2,
        '21:15': 2,
        '21:30': 2,
        '21:45': 2,
        '22:00': 2,
        '22:15': 2,
        '22:30': 2,
        '22:45': 2,
        '23:00': 2,
        '23:15': 2,
        '23:30': 2,
        '23:45': 2,
      });
    });

    it('should throw BusinessNotFoundError when business is not found', async () => {
      await expect(
        loaderService.execute({
          businessUuid: 'invalid-uuid',
          customerKind: CUSTOMER_KIND.SINGLE,
          courseId: 1,
          date: new Date('2025-04-25'),
        }),
      ).rejects.toThrow('Business not found.');
    });

    it('should throw InvalidDayOfWeekError when date is invalid', async () => {
      await expect(
        loaderService.execute({
          businessUuid: '0ff59d2d-32c1-4e6b-8ff1-e0f7ed2dfea8',
          customerKind: CUSTOMER_KIND.SINGLE,
          courseId: 1,
          date: new Date('invalid-date'),
        }),
      ).rejects.toThrow('Invalid day of week.');
    });
  });
});
