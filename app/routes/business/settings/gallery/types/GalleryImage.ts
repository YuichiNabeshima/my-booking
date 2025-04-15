export interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
  isMv?: boolean;
  isGallery?: boolean;
}

export type GalleryImageFieldData = GalleryImage & { file?: File };
