import Groq from 'groq-sdk';
import { AI_MODEL_NAMES } from '../../../constants';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getGroqResponse(messages: any[]) {
  return groq.chat.completions.create({
    messages,
    model: AI_MODEL_NAMES.GROQ,
    max_tokens: 800,
    stream: true,
  });
}
