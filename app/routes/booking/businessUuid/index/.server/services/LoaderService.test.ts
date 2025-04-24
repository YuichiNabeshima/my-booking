import { beforeEach, describe, expect, it } from 'vitest';

import { DI_TYPES } from '../di_container/DI_TYPES';
import { DIContainer } from '../di_container/DIContainer';
import type { ILoaderService } from '../interfaces/ILoaderService';

describe('LoaderService', () => {
  let loaderService: ILoaderService;
  let diContainer: DIContainer;

  beforeEach(() => {
    diContainer = new DIContainer();
    diContainer.bindMock();
    const container = diContainer.getContainer();
    loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  });

  describe('execute', () => {
    it('should return business, courses, and images data', async () => {
      const data = await loaderService.execute({
        businessUuid: '0ff59d2d-32c1-4e6b-8ff1-e0f7ed2dfea8',
      });

      expect(data.business).toBeDefined();
      expect(data.business.id).toBe(4);
      expect(data.business.name).toBe('Robson Street Bistro');

      expect(data.courses).toBeDefined();
      expect(Object.keys(data.courses)).toHaveLength(3);
      expect(data.courses[1]).toEqual({
        name: 'Test Course 1',
        timeDuration: 60,
        color: 'bg-amber-100',
      });
      expect(data.courses[2]).toEqual({
        name: 'Test Course 2',
        timeDuration: 75,
        color: 'bg-purple-100',
      });
      expect(data.courses[3]).toEqual({
        name: 'Test Course 3',
        timeDuration: 90,
        color: 'bg-blue-100',
      });

      expect(data.images).toBeDefined();
      expect(data.images).toHaveLength(2);
      expect(data.images[0]).toEqual({
        url: 'https://my-booking-bucket-prod.s3.amazonaws.com/uploads/business/1745233389394-bc4d0890-efa9-45e6-9418-af7e713d14f7',
        caption: 'Exterior',
        is_hero: true,
        is_gallery: true,
      });
      expect(data.images[1]).toEqual({
        url: 'https://my-booking-bucket-prod.s3.amazonaws.com/uploads/business/1745233391249-56273d58-1dd4-498d-8218-52cdc0defd4e',
        caption: 'Morning',
        is_hero: true,
        is_gallery: true,
      });
    });

    it('should throw BusinessNotFoundError when business is not found', async () => {
      await expect(
        loaderService.execute({
          businessUuid: 'invalid-uuid',
        }),
      ).rejects.toThrow('Business not found.');
    });
  });
});
