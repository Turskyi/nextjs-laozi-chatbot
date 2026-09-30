import { StreamingTextResponse, OpenAIStream, GoogleGenerativeAIStream } from 'ai';
import { getGroqResponse } from './ai/groq';
import { getOpenRouterResponse } from './ai/openrouter';
import { getMistralResponse } from './ai/mistral';
import { getGeminiResponse } from './ai/gemini';
import { AI_MODEL_NAMES } from '../../constants';
import { getCacheKey, getCachedResponse, setCachedResponse } from './cache';

const DEBUG = process.env.NODE_ENV === 'development';

export async function generateChatResponse(
  messages: any[],
  options?: { locale?: string; pageContext?: string },
) {
  const cacheKey = getCacheKey(
    messages,
    options?.locale,
    options?.pageContext,
  );

  if (DEBUG) {
    console.log(`[AI LOG] generateChatResponse invoked. Message count: ${messages?.length}. Options:`, options);
    console.log(`[AI LOG] Computed Cache Key: ${cacheKey}`);
  }

  // 1. Attempt to return cached response from Upstash Redis
  const cachedContent = await getCachedResponse(cacheKey);
  if (cachedContent) {
    if (DEBUG) {
      console.log(`[AI LOG] RETURNING CACHED RESPONSE (${cachedContent.length} chars). Setting header X-Cache: HIT.`);
    }

    // Format response per Vercel AI SDK Data Stream Protocol: 0:"text"\n
    const dataStreamPayload = `0:${JSON.stringify(cachedContent)}\n`;
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(dataStreamPayload));
        controller.close();
      },
    });
    return new StreamingTextResponse(stream, {
      headers: {
        'X-AI-Model': 'Upstash Redis Cache',
        'X-Cache': 'HIT',
      },
    });
  }

  if (DEBUG) {
    console.log(`[AI LOG] CACHE MISS. Proceeding to invoke live AI providers fallback chain...`);
  }

  // Callback to store completed AI response in Redis
  const callbacks = {
    onCompletion: async (completion: string) => {
      if (DEBUG) {
        console.log(`[AI LOG] onCompletion callback fired! Received ${completion.length} chars from AI provider.`);
      }
      await setCachedResponse(cacheKey, completion);
    },
  };

  // 2. Attempt Groq
  try {
    if (DEBUG) console.log(`[AI LOG] Trying Groq (${AI_MODEL_NAMES.GROQ})...`);
    const response = await getGroqResponse(messages);
    const stream = OpenAIStream(response, callbacks);
    if (DEBUG) console.log(`[AI LOG] Groq stream created successfully.`);
    return new StreamingTextResponse(stream, {
      headers: {
        'X-AI-Model': `Groq (${AI_MODEL_NAMES.GROQ})`,
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.warn('[AI LOG] Groq failed, falling back to OpenRouter:', error);
  }

  // 3. Attempt OpenRouter
  try {
    if (DEBUG) console.log(`[AI LOG] Trying OpenRouter (${AI_MODEL_NAMES.OPENROUTER})...`);
    const response = await getOpenRouterResponse(messages);
    const stream = OpenAIStream(response as any, callbacks);
    if (DEBUG) console.log(`[AI LOG] OpenRouter stream created successfully.`);
    return new StreamingTextResponse(stream, {
      headers: {
        'X-AI-Model': `OpenRouter (${AI_MODEL_NAMES.OPENROUTER})`,
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.warn('[AI LOG] OpenRouter failed, falling back to Mistral:', error);
  }

  // 4. Attempt Mistral
  try {
    if (DEBUG) console.log(`[AI LOG] Trying Mistral (${AI_MODEL_NAMES.MISTRAL})...`);
    const response = await getMistralResponse(messages, callbacks);
    const stream = OpenAIStream(response as any, callbacks);
    if (DEBUG) console.log(`[AI LOG] Mistral stream created successfully.`);
    return new StreamingTextResponse(stream, {
      headers: {
        'X-AI-Model': `Mistral (${AI_MODEL_NAMES.MISTRAL})`,
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.warn('[AI LOG] Mistral failed, falling back to Gemini:', error);
  }

  // 5. Attempt Gemini
  try {
    if (DEBUG) console.log(`[AI LOG] Trying Gemini (${AI_MODEL_NAMES.GEMINI})...`);
    const result = await getGeminiResponse(messages);
    const aiStream = GoogleGenerativeAIStream(result, callbacks);
    if (DEBUG) console.log(`[AI LOG] Gemini stream created successfully.`);
    return new StreamingTextResponse(aiStream, {
      headers: {
        'X-AI-Model': `Gemini (${AI_MODEL_NAMES.GEMINI})`,
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('[AI LOG] All AI providers failed:', error);
    return new Response(
      JSON.stringify({ error: 'Service Unavailable' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
