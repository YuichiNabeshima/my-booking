import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import type { IImageStorage } from '~/.server/core/image_storage/IImageStorage';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessPictureRepository } from '~/.server/repositories/interfaces/IBusinessPictureRepository';

import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from '../dtos/LoaderServiceDTO';
import type { ILoaderService } from '../interfaces/ILoaderService';

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository)
    private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.ImageStorage) private imageStorage: IImageStorage,
  ) {}
  async execute({ cookie }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const businessId = session.data.id;

    const businessPictures = await this.businessPictureRepository.fetchAll({
      business_id: businessId,
    });

    return {
      images: businessPictures.map((p) => {
        const url = this.imageStorage.getImageUrl(p.key);
        return {
          id: p.id,
          url,
          caption: p.caption,
          isMv: p.is_top_slide,
          isGallery: p.is_gallery,
        };
      }),
    };
  }
}
