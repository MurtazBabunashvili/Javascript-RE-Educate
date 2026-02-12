import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import sharp from 'sharp';
import { Readable } from 'stream';
import { buffer } from 'stream/consumers';
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

  async transformImage(fileBuffer, transformations) {
    let transformer = sharp(fileBuffer);

    if (transformations.resize) {
      transformer = transformer.resize(
        transformations.resize.width,
        transformations.resize.height,
      );
    }

    if (transformations.crop) {
      transformer = transformer.extract({
        left: transformations.crop.x || 0,
        top: transformations.crop.y || 0,
        width: transformations.crop.width,
        height: transformations.crop.height,
      });
    }

    if (transformations.rotate) {
      transformer = transformer.rotate(transformations.rotate);
    }

    if (transformations.flip) {
      transformer = transformer.flip();
    }

    if (transformations.flop) {
      transformer = transformer.flop();
    }

    if (transformations.filters?.grayscale) {
      transformer = transformer.grayscale();
    }

    if (transformations.filters?.blur) {
      transformer = transformer.blur();
    }

    if (transformations.filters?.sharpen) {
      transformer = transformer.sharpen();
    }

    if (transformations.format) {
      transformer = transformer.toFormat(transformations.format);
    }
    if (transformations.quality) {
      transformer = transformer.jpeg({ quality: transformations.quality });
    }

    const transformedBuffer = await transformer.toBuffer();

    const randomPath = Math.random().toString().slice(2);
    const transformedPath = `images/transformed/${randomPath}`;

    await this.uploadImage(transformedPath, transformedBuffer);

    return {
      filePath: transformedPath,
      transformations,
    };
  }
  async transformImageById(imageId: string, transformations: any) {
    if (!imageId) {
      throw new BadRequestException('Image ID is required');
    }

    const base64Image = await this.getImageById(imageId);

    if (!base64Image) {
      throw new NotFoundException('Image not found');
    }
    const base64Data = base64Image.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    return this.transformImage(imageBuffer, transformations);
  }

  async getImages(page, take) {
    const config = {
      Bucket: this.bucketName,
      Prefix: 'images/',
    };
    const getFilesCommand = new ListObjectsV2Command(config);
    const streamFiles = await this.s3.send(getFilesCommand);

    const images = streamFiles.Contents || [];
    const start = (page - 1) * take;
    const end = start + take;
    return images.slice(start, end);
  }
}
