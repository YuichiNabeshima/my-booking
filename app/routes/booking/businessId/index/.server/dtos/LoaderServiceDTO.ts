import type { BusinessGallery } from "../../types/BusinessGallery";

export interface LoaderServiceArgsDTO {
  businessId: number;
}

export interface CourseFromLoader {
  [id: string]: {
    name: string;
    timeDuration: number;
    color: string;
  },
}

export interface LoaderServiceResultDTO {
  courses: CourseFromLoader;
  images: BusinessGallery;
}