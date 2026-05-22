import OpenAI from 'openai';
import { envs } from './envs';

const openai = new OpenAI({
  baseURL: envs.openaiBaseUrl,
  apiKey: envs.openRouterKey,
});

export { openai };
