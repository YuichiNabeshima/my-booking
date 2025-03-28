import { injectable, inject } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { CourseNotFoundError } from "~/.server/custom_errors/repositories/CourseNotFoundError";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { CourseFromLoader, LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";
import type { IBusinessPictureRepository } from "~/.server/repositories/interfaces/IBusinessPictureRepository";
import type { IImageGetService } from "~/.server/interfaces/IImageGetService";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(GLOBAL_DI_TYPES.BusinessPictureRepository) private businessPictureRepository: IBusinessPictureRepository,
    @inject(GLOBAL_DI_TYPES.ImageGetService) private imageGetService: IImageGetService,
  ){}

  async execute({ businessId }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const courses = await this.courseRepository.fetchAll({ business_id: businessId });

    if (courses.length === 0) {
      throw new CourseNotFoundError('Courses are empty.');
    }

    const coursesResult = courses.reduce((acc, course, i) => {
      acc[course.id] = {
        name: course.name,
        timeDuration: course.time_duration,
        color: i % 3 === 0 ? "bg-amber-100"
          : i % 2 === 0    ? "bg-blue-100"
          : "bg-purple-100",
      };
      return acc;
    }, {} as CourseFromLoader);

    const images = (await this.businessPictureRepository.fetchAll({ business_id: businessId })).map(p => {
      const url = this.imageGetService.getImageUrl(p.key);
      return {
        url,
        caption: p.caption,
      };
    });

    return {
      courses: coursesResult,
      images,
    };
  }
}