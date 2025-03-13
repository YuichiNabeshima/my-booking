import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";

export class CourseRepositoryMock extends BaseRepository<Partial<CourseRepositoryDTO>> implements ICourseRepository<Partial<CourseRepositoryDTO>> {
  async fetch(args: unknown): Promise<CourseRepositoryDTO | null> {
    void args;
    return {
      id: 1,
      name: 'Normal Course',
      time_duration: 60,
      business_id: 1,
    };
  }
}