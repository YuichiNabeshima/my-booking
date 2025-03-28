import type { IImageGetService } from "~/.server/interfaces/IImageGetService";
import { bucketName } from "~/lib/s3/s3Client";

export class ImageGetService implements IImageGetService {
  getImageUrl(key: string) {
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }
}