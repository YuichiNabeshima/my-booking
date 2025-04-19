import type { BusinessHoursRepositoryDTO } from '~/.server/repositories/dtos/BusinessHoursRepositoryDTO';
import type { BusinessRepositoryDTO } from '~/.server/repositories/dtos/BusinessRepositoryDTO';
import type { BusinessTagRepositoryDTO } from '~/.server/repositories/dtos/BusinessTagRepositoryDTO';

import type { BusinessGallery } from '../../types/BusinessGallery';

export interface LoaderServiceArgsDTO {
  businessUuid: string;
}

export type BusinessInfo = Omit<BusinessRepositoryDTO, 'password'> & {
  business_tag: BusinessTagRepositoryDTO[];
  business_hours: BusinessHoursRepositoryDTO[];
};

export interface CourseFromLoader {
  [id: string]: {
    name: string;
    timeDuration: number;
    color: string;
  };
}

export interface LoaderServiceResultDTO {
  business: BusinessInfo;
  courses: CourseFromLoader;
  images: BusinessGallery;
}
