import { inject, injectable } from 'inversify';

import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import { CourseNotFoundError } from '~/.server/core/custom_error/errors/repositories/CourseNotFoundError';
import type { IImageStorage } from '~/.server/core/image_storage/IImageStorage';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessPictureRepository } from '~/.server/repositories/interfaces/IBusinessPictureRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

import type {
  CourseFromLoader,
  LoaderServiceArgsDTO,
  LoaderServiceResultDTO,
} from '../dtos/LoaderServiceDTO';
import type { ILoaderService } from '../interfaces/ILoaderService';

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository)
    private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.ImageStorage) private imageStorage: IImageStorage,
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
  ) {}

  async execute({ businessUuid }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const existingBusiness = await this.businessRepository.fetch({ uuid: businessUuid });

    if (!existingBusiness || !existingBusiness.is_published) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const businessId = existingBusiness.id;
    const courses = await this.courseRepository.fetchAll({ business_id: businessId });

    if (courses.length === 0) {
      throw new CourseNotFoundError('Courses are empty.');
    }

    const coursesResult = courses.reduce((acc, course, i) => {
      acc[course.id] = {
        name: course.name,
        timeDuration: course.time_duration,
        color: i % 3 === 0 ? 'bg-amber-100' : i % 2 === 0 ? 'bg-blue-100' : 'bg-purple-100',
      };
      return acc;
    }, {} as CourseFromLoader);

    const images = (await this.businessPictureRepository.fetchAll({ business_id: businessId })).map(
      (p) => {
        const url = this.imageStorage.getImageUrl(p.key);
        return {
          url,
          caption: p.caption,
          is_hero: p.is_top_slide,
          is_gallery: p.is_gallery,
        };
      },
    );

    const business = await this.businessRepository.fetchInfo({ id: businessId });

    return {
      business,
      courses: coursesResult,
      images,
    };
  }
}
