import { injectable } from "inversify";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "~/lib/s3/s3Client";
import type { IImageDeleteService } from "~/.server/interfaces/IImageDeleteService";

@injectable()
export class ImageDeleteService implements IImageDeleteService {
  async delete(key: string) {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    return true;
  }
}