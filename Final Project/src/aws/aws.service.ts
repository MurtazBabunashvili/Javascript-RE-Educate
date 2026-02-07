import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
@Injectable()
export class AwsService {
  private bucketName;
  private s3;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_REGION,
    });
  }

  async uploadImage(filePath, file) {
    if (!filePath || !file) {
      throw new BadRequestException('File path and file are required fields');
    }
    const config = {
      Key: filePath,
      Bucket: this.bucketName,
      Body: file,
    };
    const uploadCommand = new PutObjectCommand(config);
    await this.s3.send(uploadCommand);
    return filePath;
  }

  async getImageById(fileId) {
    if (!fileId) {
      throw new BadRequestException('File id is required field');
    }
    const config = {
      Key: fileId,
      Bucket: this.bucketName,
    };
    const getCommand = new GetObjectCommand(config);
    const fileStream = await this.s3.send(getCommand);

    if (fileStream.Body instanceof Readable) {
      const chunks: Buffer[] = [];
      for await (const chunk of fileStream.Body) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);
      const base64 = fileBuffer.toString('base64');
      const file = `data:${fileStream.ContentType};base64,${base64}`;
      return file;
    }
  }
}
