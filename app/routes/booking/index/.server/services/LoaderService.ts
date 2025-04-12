import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import type { CuisineKind } from "~/types/enums/CuisineKind";
import type { Neighborhood } from "~/types/enums/Neighborhood";
import type { PriceLevel } from "~/types/PriceLabel";
import type { IImageStorage } from "~/.server/core/image_storage/IImageStorage";
import type { BusinessPictureRepositoryDTO } from "~/.server/repositories/dtos/BusinessPictureRepositoryDTO";
import { ITEMS_IN_PAGE } from "../../constants/ITEMS_IN_PAGE";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";
import type { RestaurantCard } from "../../types/RestaurantCard";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.ImageStorage) private imageStorage: IImageStorage,
  ) {}

  async execute({ page = 1, cuisine, price, neighborhood }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const take = ITEMS_IN_PAGE;
    const skip = (page - 1) * ITEMS_IN_PAGE;
    const cuisines = cuisine ? [cuisine.toUpperCase() as CuisineKind] : undefined;
    const neighborhoods = neighborhood ? [neighborhood.toUpperCase() as Neighborhood] : undefined;
    const priceLevel = price ? (Number(price) as PriceLevel) : undefined;

    const businesses = await this.businessRepository.fetchBusinesses({ take, skip, cuisine: cuisines, price_level: priceLevel, neighborhood: neighborhoods });
    const totalCount = await this.businessRepository.getTotalCount({ cuisine: cuisines, price_level: priceLevel, neighborhood: neighborhoods });
    const totalPages = Math.ceil(totalCount / ITEMS_IN_PAGE);

    const cards: RestaurantCard[] = businesses.map(b => ({
      id: b.id,
      thumbnail: this.getThumbnail(b.business_picture),
      name: b.name,
      description: b.description ?? undefined,
      tags: b.business_tag.map(tag => tag.name),
      cuisine: b.cuisine_kind as CuisineKind,
      neighborhood: b.neighborhood as Neighborhood,
      priceLevel: b.price_level ?? undefined,
    }));

    return {
      cards, 
      totalPages,
    };
  }

  private getThumbnail(pictures: BusinessPictureRepositoryDTO[]) {
    if (!pictures.length) {
      return undefined;
    }

    const filteredPictures = pictures.filter(p => p.is_top_slide);
    if (filteredPictures.length) {
      return this.imageStorage.getImageUrl(filteredPictures[0].key);
    }

    return this.imageStorage.getImageUrl(pictures[0].key);
  }
}