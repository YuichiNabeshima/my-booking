import { beforeEach, describe, expect, it } from 'vitest';

import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { createBookingConfirmationDataToken } from '~/utils/createBookingConfirmationDataToken.server';

import { DI_TYPES } from '../di_container/DI_TYPES';
import { DIContainer } from '../di_container/DIContainer';
import type { ILoaderService } from '../interfaces/ILoaderService';

describe('LoaderService', () => {
  let loaderService: ILoaderService;
  let diContainer: DIContainer;
  let token: string;

  beforeEach(() => {
    diContainer = new DIContainer();
    diContainer.bindMock();
    const container = diContainer.getContainer();
    loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
    token = createBookingConfirmationDataToken({
      numberOfGuests: 2,
      customerKind: CUSTOMER_KIND.SINGLE,
      courseId: 1,
      date: new Date('2025-04-25'),
      time: '17:00',
      fullName: 'Yuichi Nabeshima',
      email: 'test@my-booking.tech',
    });
  });

  describe('execute', () => {
    it('should return booking data', async () => {
      const data = await loaderService.execute({
        businessUuid: '0ff59d2d-32c1-4e6b-8ff1-e0f7ed2dfea8',
        token: token,
      });
      expect(data.businessName).equal('Test Restaurant');
      expect(data.courseName).equal('Test course (75min)');
      expect(data.customerKind).equal('Bar seat');
      expect(data).toMatchObject({
        fullName: 'Yuichi Nabeshima',
        email: 'test@my-booking.tech',
        businessName: 'Test Restaurant',
        dateTime: `${new Date('2025-04-25').toLocaleDateString()} 17:00`,
        courseName: 'Test course (75min)',
        customerKind: 'Bar seat',
        numberOfGuests: 2,
      });
    });
  });
});
