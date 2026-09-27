import { StreamingTextResponse, OpenAIStream, GoogleGenerativeAIStream } from 'ai';
import { getGroqResponse } from './ai/groq';
import { getOpenRouterResponse } from './ai/openrouter';
import { getMistralResponse } from './ai/mistral';
import { getGeminiResponse } from './ai/gemini';

export async function generateChatResponse(messages: any[]) {
  // 1. Attempt Groq
  try {
    const response = await getGroqResponse(messages);
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream, {
      headers: { 'X-AI-Model': 'Groq (qwen/qwen3.8-27b)' },
    });
  } catch (error) {
    console.warn('Groq failed, falling back to OpenRouter:', error);
  }

  // 2. Attempt OpenRouter
  try {
    const response = await getOpenRouterResponse(messages);
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream, {
      headers: { 'X-AI-Model': 'OpenRouter (deepseek/deepseek-chat)' },
    });
  } catch (error) {
    console.warn('OpenRouter failed, falling back to Mistral:', error);
  }

  // 3. Attempt Mistral
  try {
    const response = await getMistralResponse(messages);
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream, {
      headers: { 'X-AI-Model': 'Mistral (mistral-small-latest)' },
    });
  } catch (error) {
    console.warn('Mistral failed, falling back to Gemini:', error);
  }

  // 4. Attempt Gemini
  try {
    const result = await getGeminiResponse(messages);
    const aiStream = GoogleGenerativeAIStream(result);
    return new StreamingTextResponse(aiStream, {
      headers: { 'X-AI-Model': 'Gemini (gemini-3.5-flash-lite)' },
    });
  } catch (error) {
    console.error('All AI providers failed:', error);
    return new Response(
      JSON.stringify({ error: 'Service Unavailable' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
