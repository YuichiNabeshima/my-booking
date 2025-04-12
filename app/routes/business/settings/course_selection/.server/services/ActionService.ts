import { inject, injectable } from "inversify";
import type { IActionService } from "../interfaces/IActionService";
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ISessionStorageManager } from "~/.server/core/session/ISessionStorageManager";
import { InvalidAuthError } from "~/.server/core/custom_error/errors/InvalidAuthError";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import { mapValueToDbKey } from "../../utils/mapValueToDbKey";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager) private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
  ) {}

  async execute({ cookie, courses: newCourses }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {

    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const courses = await this.courseRepository.fetchAll({ business_id: session.data.id });
    const newCoursesMapedToDb = newCourses.map(course => mapValueToDbKey(course));

    const hasChanged = (original: any, updated: any) => {
      if (original.name !== updated.name) {
        return true;
      }
      if (original.time_duration !== updated.time_duration) {
        return true;
      }
      return false;
    };
    
    const toRegister = newCoursesMapedToDb.filter(item => item.id === undefined);
    const toUpdate = newCoursesMapedToDb.filter(item =>
      item.id !== undefined && hasChanged(
        courses.find(original => original.id === item.id),
        item
      )
    );

    const toDelete = courses.filter(course =>
      !newCoursesMapedToDb.some(newCourse => newCourse.id === course.id)
    );
    
    if (toRegister.length === 0 && toUpdate.length === 0 && toDelete.length === 0) {
      return false;
    }

    toRegister.forEach(async course => {
      await this.courseRepository.create({ name: course.name, time_duration: course.time_duration, business_id: session.data.id });
    });

    toUpdate.forEach(async course => {
      await this.courseRepository.update({ where: { id: course.id }, data: { name: course.name, time_duration: course.time_duration, business_id: session.data.id } });
    });

    toDelete.forEach(async course => {
      await this.courseRepository.remove({ id: course.id });
    });

    return true;
  }
}