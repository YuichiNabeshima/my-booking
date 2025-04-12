import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";
import type { BusinessGallery } from "../../types/BusinessGallery";
import type { BusinessTagRepositoryDTO } from "~/.server/repositories/dtos/BusinessTagRepositoryDTO";
import type { BusinessHoursRepositoryDTO } from "~/.server/repositories/dtos/BusinessHoursRepositoryDTO";

export interface LoaderServiceArgsDTO {
  businessId: number;
}

export type BusinessInfo = Omit<BusinessRepositoryDTO, 'id' | 'password'> & {
  business_tag: BusinessTagRepositoryDTO[];
  business_hours: BusinessHoursRepositoryDTO[];
};

export interface CourseFromLoader {
  [id: string]: {
    name: string;
    timeDuration: number;
    color: string;
  },
}

export interface LoaderServiceResultDTO {
  business: BusinessInfo,
  courses: CourseFromLoader;
  images: BusinessGallery;
}