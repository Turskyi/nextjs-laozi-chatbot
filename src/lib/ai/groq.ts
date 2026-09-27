import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getGroqResponse(messages: any[]) {
  return groq.chat.completions.create({
    messages,
    model: 'qwen/qwen3.8-27b',
    max_tokens: 800,
    stream: true,
  });
}
