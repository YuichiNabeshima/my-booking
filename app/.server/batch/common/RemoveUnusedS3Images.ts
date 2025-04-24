import { inject, injectable } from 'inversify';

import type { IImageStorage } from '~/.server/core/image_storage/IImageStorage';
import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessPictureRepository } from '~/.server/repositories/interfaces/IBusinessPictureRepository';

import { BaseBatch } from '../BaseBatch';
import { QueueLoop } from '../QueueLoop';

const S3_KEY = 'RemoveUnusedS3Images_S3_Key';

@injectable()
export class RemoveUnusedS3Images extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.ImageStorage) private ImageStorage: IImageStorage,
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository)
    private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.Logger)
    private logger: ILogger,
  ) {
    super();
  }

  async run() {
    const queueClient = new QueueLoop();
    await queueClient.init();

    const businessPictures = await this.businessPictureRepository.fetchAll();
    const uploadImages = await this.ImageStorage.listKeys('uploads/business/');

    queueClient.addQueue(S3_KEY, uploadImages);

    const dbKeys = new Set(businessPictures.map((p) => p.key));

    while (true) {
      const s3Keys = await queueClient.popValues<string>(S3_KEY, 5);
      if (!s3Keys.length) break;
      const shouldDeletes = s3Keys.filter((key) => !dbKeys.has(key));

      for (const deleteKey of shouldDeletes) {
        try {
          await this.ImageStorage.delete(deleteKey);
          console.log('deleteKey', deleteKey);
        } catch (error) {
          console.error(`Failed to delete S3 key: ${deleteKey}`, error);
          this.logger.error(error as Error);
        }
      }
    }

    await queueClient.clear(S3_KEY);
    await queueClient.quit();
  }
}
