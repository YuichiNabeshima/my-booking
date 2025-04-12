import type { Tag } from "../../types/Tag";

export type IncludeNewCourse = Omit<Tag, 'id'> & Partial<Pick<Tag, 'id'>>;

export interface ActionServiceArgsDTO {
  cookie: string;
  tags: IncludeNewCourse[];
}

export type ActionServiceResultDTO = boolean;