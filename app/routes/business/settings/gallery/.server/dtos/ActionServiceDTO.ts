export interface ActionServiceArgsDTO {
  cookie: string;
  images: {
    id?: number;
    caption?: string;
    file?: File;
  }[];
}

export type ActionServiceResultDTO = boolean;