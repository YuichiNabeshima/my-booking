import { BaseRepository } from '~/.server/repositories/base/BaseRepository';
import type { CourseRepositoryDTO } from '~/.server/repositories/dtos/CourseRepositoryDTO';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

export class CourseRepositoryMock
  extends BaseRepository<{ TModel: Partial<CourseRepositoryDTO> }>
  implements ICourseRepository<Partial<CourseRepositoryDTO>>
{
  async fetchAll(args: unknown) {
    void args;
    return [
      {
        id: 1,
        business_id: 1,
        name: 'Test Course 1',
        time_duration: 60,
      },
      {
        id: 2,
        business_id: 1,
        name: 'Test Course 2',
        time_duration: 75,
      },
      {
        id: 3,
        business_id: 1,
        name: 'Test Course 3',
        time_duration: 90,
      },
    ];
  }
}
