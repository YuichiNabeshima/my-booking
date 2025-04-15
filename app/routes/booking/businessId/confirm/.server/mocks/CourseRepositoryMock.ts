import { BaseRepository } from '~/.server/repositories/base/BaseRepository';
import type { CourseRepositoryDTO } from '~/.server/repositories/dtos/CourseRepositoryDTO';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

export class CourseRepositoryMock
  extends BaseRepository<{ TModel: Partial<CourseRepositoryDTO> }>
  implements ICourseRepository<Partial<CourseRepositoryDTO>>
{
  async fetch(args: unknown) {
    void args;
    return {
      id: 1,
      name: 'Test course',
      time_duration: 75,
      business_id: 1,
    };
  }
}
