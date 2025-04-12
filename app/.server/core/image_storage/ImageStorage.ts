import { v4 as uuid } from "uuid";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import type { PutObjectCommandInput, DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "~/lib/s3/s3Client";
import type { IImageStorage } from "./IImageStorage";

export class ImageStorage implements IImageStorage {
  getImageUrl(key: string) {
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }

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

  async delete(key: string) {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    return true;
  }

}