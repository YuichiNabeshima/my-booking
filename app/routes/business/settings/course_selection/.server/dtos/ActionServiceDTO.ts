import type { Course } from "../../types/Course";

export type IncludeNewCourse = Omit<Course, 'id'> & Partial<Pick<Course, 'id'>>;

export interface ActionServiceArgsDTO {
  cookie: string;
  courses: IncludeNewCourse[];
}

export type ActionServiceResultDTO = boolean;