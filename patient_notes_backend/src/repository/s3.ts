import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3Repository {
  private readonly s3Client: S3Client;

  constructor(s3Client: S3Client) {
    this.s3Client = s3Client;
  }

  async uploadFile(bucketName: string, key: string, body: Buffer, contentType: string) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    };
    await this.s3Client.send(new PutObjectCommand(params));
  }

  async getSignedUrl(bucketName: string, key: string, expiresIn: number = 3600) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn });
    return url;
  }
}
