import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";

export class CourseRepositoryMock implements Partial<ICourseRepository<void, void, void, void>> {
  async fetch(args: void): Promise<CourseRepositoryDTO | null> {
    return {
      id: 1,
      name: 'Normal Course',
      time_duration: 60,
      business_id: 1,
    };
  }
}