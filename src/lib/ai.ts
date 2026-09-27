import { StreamingTextResponse, OpenAIStream, GoogleGenerativeAIStream } from 'ai';
import { getGroqResponse } from './ai/groq';
import { getOpenRouterResponse } from './ai/openrouter';
import { getMistralResponse } from './ai/mistral';
import { getGeminiResponse } from './ai/gemini';
import { AI_MODEL_NAMES } from '../../constants';

export async function generateChatResponse(messages: any[]) {
  // 1. Attempt Groq
  try {
    const response = await getGroqResponse(messages);
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream, {
      headers: { 'X-AI-Model': `Groq (${AI_MODEL_NAMES.GROQ})` },
    });
  } catch (error) {
    console.warn('Groq failed, falling back to OpenRouter:', error);
  }

  // 2. Attempt OpenRouter
  try {
    const response = await getOpenRouterResponse(messages);
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream, {
      headers: { 'X-AI-Model': `OpenRouter (${AI_MODEL_NAMES.OPENROUTER})` },
    });
  } catch (error) {
    console.warn('OpenRouter failed, falling back to Mistral:', error);
  }

  // 3. Attempt Mistral
  try {
    const response = await getMistralResponse(messages);
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream, {
      headers: { 'X-AI-Model': `Mistral (${AI_MODEL_NAMES.MISTRAL})` },
    });
  } catch (error) {
    console.warn('Mistral failed, falling back to Gemini:', error);
  }

  // 4. Attempt Gemini
  try {
    const result = await getGeminiResponse(messages);
    const aiStream = GoogleGenerativeAIStream(result);
    return new StreamingTextResponse(aiStream, {
      headers: { 'X-AI-Model': `Gemini (${AI_MODEL_NAMES.GEMINI})` },
    });
  } catch (error) {
    console.error('All AI providers failed:', error);
    return new Response(
      JSON.stringify({ error: 'Service Unavailable' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
