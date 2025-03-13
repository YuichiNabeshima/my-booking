import type { IncludeNewCourse } from "../.server/dtos/ActionServiceDTO";

export function mapValueToDbKey(course: IncludeNewCourse) {
  return {
    id: course.id,
    name: course.label,
    time_duration: course.duration
  };
}
