import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class CourseNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'COURSE_NOT_FOUND', details);
  }
}
