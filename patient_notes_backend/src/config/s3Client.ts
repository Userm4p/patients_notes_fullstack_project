import { S3Client } from '@aws-sdk/client-s3';
import { envs } from './envs';

const s3Client = new S3Client({
  region: envs.awsDefaultRegion,
  endpoint: envs.awsEndpointUrl,
  forcePathStyle: true,
  credentials: {
    accessKeyId: envs.awsAccessKeyId!,
    secretAccessKey: envs.awsSecretAccessKey!,
  },
});

export { s3Client };
