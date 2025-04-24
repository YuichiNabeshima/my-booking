import { inject, injectable } from 'inversify';

import { CourseNotFoundError } from '~/.server/core/custom_error/errors/repositories/CourseNotFoundError';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

import { BaseBatch } from '../BaseBatch';
import { QueueLoop } from '../QueueLoop';

const KEY = 'Issue5_KEY';

@injectable()
export class Issue5 extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
  ) {
    super();
  }

  async run() {
    const queueClient = new QueueLoop();
    await queueClient.init();
    const courses = await this.courseRepository.fetchAll();

    await queueClient.addQueue(
      KEY,
      courses.map((c) => String(c.id)),
    );

    while (true) {
      const courseIds = await queueClient.popValues(KEY, 5);
      if (courseIds.length === 0) break;

      for (const courseId of courseIds) {
        const course = await this.courseRepository.fetch({ id: Number(courseId) });

        if (!course) {
          throw new CourseNotFoundError('Course not found.');
        }

        if (course.name.includes('Lunch')) {
          await this.courseRepository.update({
            where: { id: course.id },
            data: { name: 'Standard Course' },
          });
        } else {
          await this.courseRepository.update({
            where: { id: course.id },
            data: { name: 'Full Course' },
          });
        }
      }
    }

    await queueClient.clear(KEY);
    await queueClient.quit();
  }
}
