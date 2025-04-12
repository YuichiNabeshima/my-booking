import { injectable } from "inversify";
import type { IImageStorage } from "~/.server/core/image_storage/IImageStorage";

@injectable()
export class ImageStorageMock implements Partial<IImageStorage> {
  getImageUrl(key: string): string {
    void key;
    return 'test-image.png';
  }
}