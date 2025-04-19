export interface Gallery {
  url: string;
  caption?: string;
  is_hero?: boolean;
  is_gallery?: boolean;
}

export type BusinessGallery = Gallery[];
