import { inject, injectable } from "inversify";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import type { RestaurantCard } from "../../types/RestaurantCard";
import { CUISINE_LABELS } from "~/constants/enums/CUISINE_LABELS";
import type { CuisineLabels } from "~/types/enums/CuisineLabels";
import type { Neighborhood } from "~/types/enums/Neighborhood";
import type { PriceLevel } from "~/types/PriceLabel";

const ITEMS_IN_PAGE = 6;

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
  ) {}

  async execute({ page = 2, cuisine, price, neighborhood }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const take = ITEMS_IN_PAGE;
    const skip = (page - 1) * ITEMS_IN_PAGE;
    const cuisines = cuisine ? [cuisine.toUpperCase() as CuisineLabels] : undefined;
    const neighborhoods = neighborhood ? [neighborhood.toUpperCase() as Neighborhood] : undefined;
    const priceLevel = price ? (Number(price) as PriceLevel) : undefined;
    const businesses = await this.businessRepository.fetchBusinesses({ take, skip, cuisine: cuisines, price: priceLevel, neighborhood: neighborhoods });
    const totalCount = await this.businessRepository.getTotalCount({ cuisine: cuisines, price: priceLevel, neighborhood: neighborhoods });
    const totalPages = Math.ceil(totalCount / ITEMS_IN_PAGE);

    const cards: RestaurantCard[] = businesses.map(b => ({
      id: b.id,
      name: b.name,
      description: `cuisine type: ${CUISINE_LABELS[b.cuisine_kind as CuisineLabels]}`,
      tags: b.business_tag.map(tag => tag.name),
      cuisine: b.cuisine_kind as CuisineLabels,
      price: b.price as PriceLevel,
      neighborhood: b.neighborhood as Neighborhood,
      priceRange: b.price ?? undefined,
    }));

    return {
      cards, 
      totalPages,
    };
  }
}