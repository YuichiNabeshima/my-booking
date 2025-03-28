import { injectable } from "inversify";
import { v4 as uuid } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "~/lib/s3/s3Client";
import type { IImageUploaderService } from "~/.server/interfaces/IImageUploadService";

@injectable()
export class ImageUploaderService implements IImageUploaderService {
  async upload(file: File, path?: string): Promise<string> {
    const buffer = await file.arrayBuffer();
    const body = Buffer.from(buffer);
    const key = `uploads/${path ? path + '/' : ''}${Date.now()}-${uuid()}`;
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    return key;
  }
}