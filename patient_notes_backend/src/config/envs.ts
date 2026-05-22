import { config } from 'dotenv';

config();

const {
  PORT,
  FRONTEND_URL,
  DATABASE_CONNECTION_STRING,
  API_VERSION,
  OPEN_ROUTER_KEY,
  SUMMARY_MODEL,
  OPENAI_BASE_URL,
  DEEPGRAM_API_KEY,
  TRANSCRIPTION_MODEL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION,
  AUDIO_BUCKET_NAME,
  AUDIO_FILE_PATH,
  AWS_ENDPOINT_URL
} = process.env;

const envs = {
  port: PORT,
  frontendUrl: FRONTEND_URL,
  dbConnectionString: DATABASE_CONNECTION_STRING,
  apiVersion: API_VERSION,
  openRouterKey: OPEN_ROUTER_KEY,
  summaryModel: SUMMARY_MODEL,
  openaiBaseUrl: OPENAI_BASE_URL,
  deepgramApiKey: DEEPGRAM_API_KEY,
  transcriptionModel: TRANSCRIPTION_MODEL,
  awsAccessKeyId: AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
  awsDefaultRegion: AWS_DEFAULT_REGION,
  audioBucketName: AUDIO_BUCKET_NAME,
  audioFilePath: AUDIO_FILE_PATH,
  awsEndpointUrl: AWS_ENDPOINT_URL
};

const checkEnvs = () => {
  const values = Object.values(envs);
  const missingEnvs = values.filter((value) => !value);
  if (missingEnvs.length > 0) {
    const missingKeys = Object.keys(envs).filter((key) => !envs[key as keyof typeof envs]);
    throw new Error(
      `Warning: Missing environment variables: ${missingKeys.join(', ')}. Please check your .env file.`,
    );
  }
};

export { envs, checkEnvs };
