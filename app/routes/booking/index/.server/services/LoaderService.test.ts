import { describe, it, expect, beforeEach } from 'vitest'
import { DIContainer } from '../di_container/DIContainer'
import { DI_TYPES } from '../di_container/DI_TYPES';
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
    it('should return all restaurants with correct structure when no filters are applied', async () => {
      const result = await loaderService.execute({});
      if (!result) throw new Error('Result is null');

      expect(result.cards).toHaveLength(2);
      expect(result.totalPages).toBe(1);

      // Test first restaurant (Sushi Master)
      const sushiMaster = result.cards[0];
      expect(sushiMaster).toMatchObject({
        id: 1,
        name: "Sushi Master",
        cuisine: "ASIAN",
        description: "Authentic Japanese sushi restaurant with fresh ingredients",
        neighborhood: "DOWNTOWN",
        priceLevel: 3,
        tags: ["Sushi", "Japanese", "Fine Dining"],
      });

      // Test second restaurant (Pasta Paradise)
      const pastaParadise = result.cards[1];
      expect(pastaParadise).toMatchObject({
        id: 2,
        name: "Pasta Paradise",
        cuisine: "ITALIAN",
        description: "Italian restaurant serving homemade pasta and wine",
        neighborhood: "YALETOWN",
        priceLevel: 2,
        tags: ["Italian", "Pasta", "Wine"],
      });
    });

    it('should filter restaurants by cuisine', async () => {
      const result = await loaderService.execute({ cuisine: 'ASIAN' });
      if (!result) throw new Error('Result is null');

      expect(result.cards).toHaveLength(1);
      expect(result.cards[0].name).toBe("Sushi Master");
      expect(result.cards[0].cuisine).toBe('ASIAN');
    });

    it('should filter restaurants by neighborhood', async () => {
      const result = await loaderService.execute({ neighborhood: 'YALETOWN' });
      if (!result) throw new Error('Result is null');

      expect(result.cards).toHaveLength(1);
      expect(result.cards[0].name).toBe("Pasta Paradise");
      expect(result.cards[0].neighborhood).toBe("YALETOWN");
    });

    it('should filter restaurants by price level', async () => {
      const result = await loaderService.execute({ price: 3 });
      if (!result) throw new Error('Result is null');

      expect(result.cards).toHaveLength(1);
      expect(result.cards[0].name).toBe("Sushi Master");
      expect(result.cards[0].priceLevel).toBe(3);
    });

    it('should combine multiple filters', async () => {
      const result = await loaderService.execute({
        cuisine: 'ITALIAN',
        neighborhood: 'YALETOWN',
        price: 2
      });
      if (!result) throw new Error('Result is null');

      expect(result.cards).toHaveLength(1);
      expect(result.cards[0].name).toBe("Pasta Paradise");
      expect(result.cards[0].cuisine).toBe("ITALIAN");
      expect(result.cards[0].neighborhood).toBe("YALETOWN");
      expect(result.cards[0].priceLevel).toBe(2);
    });
  });
});
