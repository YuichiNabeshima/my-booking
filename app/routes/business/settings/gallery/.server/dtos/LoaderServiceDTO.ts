import type { GalleryImage } from "../../types/GalleryImage";

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export interface LoaderServiceResultDTO {
  images: GalleryImage[];
}