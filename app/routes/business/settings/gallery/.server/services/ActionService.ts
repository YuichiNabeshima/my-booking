import { inject, injectable } from "inversify";
import type { IActionService } from "../interfaces/IActionService";
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";
import type { IBusinessPictureRepository } from "~/.server/repositories/interfaces/IBusinessPictureRepository";
import { InvalidAuthError } from "~/.server/custom_errors/InvalidAuthError";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import type { IImageUploaderService } from "~/.server/interfaces/IImageUploadService";
import type { IImageDeleteService } from "~/.server/interfaces/IImageDeleteService";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository) private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
    @inject(GLOBAL_DI_TYPES.ImageUploaderService) private imageUploaderService: IImageUploaderService,
    @inject(GLOBAL_DI_TYPES.ImageDeleteService) private imageDeleteService: IImageDeleteService,
  ) {}
  

  async execute({ cookie, images }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.sessionStorageService.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const businessId = session.data.id;

    const businessPictures = await this.businessPictureRepository.fetchAll({ business_id: businessId });

    // should delete
    const shouldDeletePictures = businessPictures.filter(pic => !images.some(img => img.id === pic.id));

    for (const pic of shouldDeletePictures) {
      await this.imageDeleteService.delete(pic.key);
      await this.businessPictureRepository.remove({ id: pic.id });
    }

    for (const image of images) {
      // create
      if (!image.id && image.file) {
        const newKey = await this.imageUploaderService.upload(image.file, 'business');
        await this.businessPictureRepository.create({ key: newKey, business_id: businessId, caption: image.caption ?? '' });
      }

      // existing picture
      if (image.id) {
        const existPicture = await this.businessPictureRepository.fetch({ id: image.id });

        if (!existPicture) {
          continue;
        }

        // update
        if (image.file) {
          await this.imageDeleteService.delete(existPicture.key);
          const newPictureKey = await this.imageUploaderService.upload(image.file, 'business');
          await this.businessPictureRepository.update({ where: { id: existPicture.id }, data: { key: newPictureKey } });
        }

        if (image.caption !== existPicture.caption) {
          await this.businessPictureRepository.update({ where: { id: existPicture.id }, data: { caption: image.caption ?? '' } });
        }
      }
    }

    return true;
  }
}