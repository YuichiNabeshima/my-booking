import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";

export class CourseRepositoryMock
  extends BaseRepository<Partial<CourseRepositoryDTO>>
  implements ICourseRepository<Partial<CourseRepositoryDTO>> {
    async fetch(args: unknown): Promise<Partial<CourseRepositoryDTO> | null> {
      void args;

      return {
        name: 'Sample Course',
        time_duration: 75,
      };
    }
  }
