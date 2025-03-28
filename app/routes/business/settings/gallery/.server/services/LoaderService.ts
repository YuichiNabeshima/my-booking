import { inject, injectable } from "inversify";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBusinessPictureRepository } from "~/.server/repositories/interfaces/IBusinessPictureRepository";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";
import { InvalidAuthError } from "~/.server/custom_errors/InvalidAuthError";
import type { IImageGetService } from "~/.server/interfaces/IImageGetService";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository) private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
    @inject(GLOBAL_DI_TYPES.ImageGetService) private imageGetService: IImageGetService,
  ) {}
  async execute({ cookie }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const session = await this.sessionStorageService.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const businessId = session.data.id;

    const businessPictures = await this.businessPictureRepository.fetchAll({ business_id: businessId });

    return {
      images: businessPictures.map(p => {
        const url = this.imageGetService.getImageUrl(p.key);
        return {
          id: p.id,
          url,
          caption: p.caption,
        };
      }),
    };
  }
}