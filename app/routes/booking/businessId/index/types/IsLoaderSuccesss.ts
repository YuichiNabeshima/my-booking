import { STATUS } from "../constants/STATUS";
import type { BusinessGallery } from "./BusinessGallery";
import type { CourseFromLoader } from "../.server/dtos/LoaderServiceDTO";

export interface IsLoaderSuccess {
  status: typeof STATUS.SUCCESS;
  courses: CourseFromLoader;
  images: BusinessGallery;
}
