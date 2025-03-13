import type { Course } from "../../types/Course";

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export interface LoaderServiceResultDTO {
  courses: Course[];
}