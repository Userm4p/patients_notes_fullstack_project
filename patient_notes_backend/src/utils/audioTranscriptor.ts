import { DeepgramClient, ListenV1Response } from '@deepgram/sdk';
import { envs } from '../config';

const client = new DeepgramClient({
  apiKey: envs.deepgramApiKey!,
});

export async function transcribeAudio(audioBuffer: Buffer): Promise<string | null> {
  const response = await client.listen.v1.media.transcribeFile(audioBuffer, {
    model: envs.transcriptionModel!,
    punctuate: true,
    detect_language: true,
  });

  const { results } = response as ListenV1Response;

  if (!results) {
    return null;
  }

  const text = results.channels?.[0]?.alternatives?.[0]?.transcript || null;

  return text;
}
