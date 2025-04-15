import type { Tag } from '../../types/Tag';

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export interface LoaderServiceResultDTO {
  tags: Tag[];
}
