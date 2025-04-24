import { BaseRepository } from '~/.server/repositories/base/BaseRepository';
import type { BusinessPictureRepositoryDTO } from '~/.server/repositories/dtos/BusinessPictureRepositoryDTO';
import type { IBusinessPictureRepository } from '~/.server/repositories/interfaces/IBusinessPictureRepository';

export class BusinessPictureRepositoryMock
  extends BaseRepository<{ TModel: Partial<BusinessPictureRepositoryDTO> }>
  implements IBusinessPictureRepository<Partial<BusinessPictureRepositoryDTO>>
{
  async fetchAll(args: { business_id: number }): Promise<BusinessPictureRepositoryDTO[]> {
    if (args.business_id !== 4) {
      return [];
    }

    return [
      {
        id: 1,
        business_id: 4,
        key: '1745233389394-bc4d0890-efa9-45e6-9418-af7e713d14f7',
        caption: 'Exterior',
        is_top_slide: true,
        is_gallery: true,
      },
      {
        id: 2,
        business_id: 4,
        key: '1745233391249-56273d58-1dd4-498d-8218-52cdc0defd4e',
        caption: 'Morning',
        is_top_slide: true,
        is_gallery: true,
      },
    ];
  }
}
