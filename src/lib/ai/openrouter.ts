import OpenAI from 'openai';
import { AI_MODEL_NAMES } from '../../../constants';

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function getOpenRouterResponse(messages: any[]) {
  return openrouter.chat.completions.create({
    messages,
    // NOTE: Never prefix AI model slugs with ":free" as it causes 404 errors on OpenRouter.
    model: AI_MODEL_NAMES.OPENROUTER,
    stream: true,
  });
}
