import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import type { IImageStorage } from '~/.server/core/image_storage/IImageStorage';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessPictureRepository } from '~/.server/repositories/interfaces/IBusinessPictureRepository';

import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository)
    private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
    @inject(GLOBAL_DI_TYPES.ImageStorage) private imageStorage: IImageStorage,
  ) {}

  async execute({ cookie, images }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const businessId = session.data.id;
    const businessPictures = await this.businessPictureRepository.fetchAll({
      business_id: businessId,
    });

    // should delete
    const shouldDeletePictures = businessPictures.filter(
      (pic) => !images.some((img) => img.id === pic.id),
    );

    // do transaction
    return await this.transactionManager.execute(async () => {
      for (const pic of shouldDeletePictures) {
        await this.businessPictureRepository.remove({ id: pic.id });
      }

      for (const image of images) {
        // create
        if (!image.id && image.file) {
          const newKey = await this.imageStorage.upload(image.file, 'business');
          await this.businessPictureRepository.create({
            key: newKey,
            business_id: businessId,
            caption: image.caption ?? '',
            is_top_slide: image.isMv,
            is_gallery: image.isGallery,
          });
        }

        // existing picture
        if (image.id) {
          const existPicture = await this.businessPictureRepository.fetch({ id: image.id });

          if (!existPicture) {
            continue;
          }

          // update
          const updateData: {
            key?: string;
            caption?: string;
            is_top_slide?: boolean;
            is_gallery?: boolean;
          } = {};

          if (image.file) {
            const newPictureKey = await this.imageStorage.upload(image.file, 'business');
            updateData.key = newPictureKey;
          }

          if (image.caption !== existPicture.caption) {
            updateData.caption = image.caption ?? '';
          }

          if (image.isMv !== existPicture.is_top_slide) {
            updateData.is_top_slide = image.isMv;
          }

          if (image.isGallery !== existPicture.is_gallery) {
            updateData.is_gallery = image.isGallery;
          }

          if (Object.keys(updateData).length > 0) {
            await this.businessPictureRepository.update({
              where: { id: existPicture.id },
              data: updateData,
            });
          }
        }
      }

      return true;
    });
  }
}
