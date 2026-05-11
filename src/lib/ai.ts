import { StreamingTextResponse, OpenAIStream, GoogleGenerativeAIStream } from 'ai';
import { getGroqResponse } from './ai/groq';
import { getMistralResponse } from './ai/mistral';
import { getGeminiResponse } from './ai/gemini';

export async function generateChatResponse(messages: any[]) {
  // 1. Attempt Groq
  try {
    const response = await getGroqResponse(messages);
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.warn('Groq failed, falling back to Mistral:', error);
  }

  // 2. Attempt Mistral
  try {
    const response = await getMistralResponse(messages);
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.warn('Mistral failed, falling back to Gemini:', error);
  }

  // 3. Attempt Gemini
  try {
    const result = await getGeminiResponse(messages);
    const aiStream = GoogleGenerativeAIStream(result);
    return new StreamingTextResponse(aiStream);
  } catch (error) {
    console.error('All AI providers failed:', error);
    return new Response(
      JSON.stringify({ error: 'Service Unavailable' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
