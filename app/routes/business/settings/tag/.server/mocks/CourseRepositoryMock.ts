import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";

export class CourseRepositoryMock extends BaseRepository<{ TModel: Partial<CourseRepositoryDTO> }> implements ICourseRepository<Partial<CourseRepositoryDTO>> {
  async fetchAll(args?: unknown): Promise<Partial<CourseRepositoryDTO>[]> {
    void args;
    return [
      {
        id: 1,
        name: 'Normal course',
        time_duration: 60,
      },
      {
        id: 2,
        name: 'Long course',
        time_duration: 90,
      },
    ];
  }

  async update(args: { where: unknown; data: unknown; }): Promise<Partial<CourseRepositoryDTO>> {
    void args;
    console.log('args', args);
    return { id: 1, name: 'Normal course', time_duration: 60 };
  }
}