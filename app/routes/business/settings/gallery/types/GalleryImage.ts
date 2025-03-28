export interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
}

export type GalleryImageFieldData = GalleryImage & { file?: File };