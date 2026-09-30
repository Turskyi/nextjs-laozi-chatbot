/**
 * @file Chat API Route
 * @see {@link https://github.com/codinginflow/nextjs-langchain-portfolio/blob/Final-Project/src/app/api/chat/route.ts | Original Inspiration (Coding in Flow Next.js LangChain Portfolio)}
 *
 * Architectural Note on LangChain vs. Direct SDKs & Vercel AI SDK:
 *
 * Although the original tutorial implementation utilized LangChain, this
 * codebase evolved to bypass LangChain in favor of direct provider SDKs
 * (Groq, OpenRouter, Mistral, Gemini) combined with the Vercel AI SDK (`ai`).
 *
 * Why we do not use LangChain here and why it is better for this application:
 * 1. **Robust Multi-Provider Fallback**: Our app implements an intelligent
 *    multi-provider fallback strategy
 *    (Groq -> OpenRouter -> Mistral -> Gemini).
 *    LangChain's abstractions and chain runnables make multi-vendor fallback
 *    routing and custom error handling across different third-party APIs
 *    unnecessarily complex and rigid.
 * 2. **Performance & Bundle Overhead**: LangChain introduces a heavy
 *    abstraction layer and dependency footprint
 *    (requiring strict version overrides like `@langchain/core`).
 *    Direct SDK usage keeps the runtime lightweight, reduces cold start times,
 *    and avoids version mismatch issues.
 * 3. **Flexibility & Direct Control**: Direct manipulation of message arrays
 *    (system prompts, localized language handling, dynamic page context
 *    insertion) and seamless integration with Vercel AI SDK streaming utilities
 *    (`OpenAIStream`, `GoogleGenerativeAIStream`) provide fine-grained,
 *    transparent control over API requests and streaming headers
 *    (`X-AI-Model`) without framework lock-in.
 */
export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

import { LOCALES } from '../../../../constants';
import { generateChatResponse } from '@/lib/ai';
import {
  SYSTEM_PROMPT_EN,
  SYSTEM_PROMPT_LV,
  SYSTEM_PROMPT_UA,
} from '@/lib/ai/prompts';

const DEBUG = process.env.NODE_ENV === 'development';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: Request) {
  let body: any = null;
  try {
    body = await req.json();
  } catch (e) {
    console.warn('Error parsing JSON body:', e);
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const { locale, messages, pageContext, pageContent } = body;
  if (DEBUG) {
    console.log('[ROUTE LOG /api/chat] Incoming request. Message count:', messages?.length, 'Locale:', locale, 'pageContext:', pageContext);
  }

  let systemPrompt = SYSTEM_PROMPT_EN;

  if (
    locale &&
    (locale === LOCALES.UKRAINIAN || locale.startsWith(LOCALES.UKRAINIAN))
  ) {
    systemPrompt = SYSTEM_PROMPT_UA;
  } else if (
    locale &&
    (locale === LOCALES.LATVIAN || locale.startsWith(LOCALES.LATVIAN))
  ) {
    systemPrompt = SYSTEM_PROMPT_LV;
  } else if (
    locale &&
    locale !== LOCALES.ENGLISH &&
    !locale.startsWith(LOCALES.ENGLISH)
  ) {
    try {
      const languageName = new Intl.DisplayNames([LOCALES.ENGLISH], {
        type: 'language',
      }).of(locale);
      systemPrompt += `\nAnswer in ${languageName || locale}.`;
    } catch (e) {
      systemPrompt += `\nAnswer in the language with code "${locale}".`;
    }
  }

  if (pageContext) {
    systemPrompt += `\n\n${pageContext}`;
    if (pageContent) {
      systemPrompt += `\n\nManuscript page content:\n${pageContent}`;
    }
  }

  const finalMessages = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ];

  const response = await generateChatResponse(finalMessages, {
    locale,
    pageContext,
  });

  // Apply CORS headers to the response
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
