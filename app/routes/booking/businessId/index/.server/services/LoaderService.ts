import { injectable, inject } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { CourseNotFoundError } from "~/.server/custom_errors/repositories/CourseNotFoundError";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { CourseFromLoader, LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
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

    return {
      courses: coursesResult,
    };
  }
}