export interface ActionServiceArgsDTO {
  cookie: string;
  images: {
    id?: number;
    caption?: string;
    isMv?: boolean;
    isGallery?: boolean;
    file?: File;
  }[];
}

export type ActionServiceResultDTO = boolean;