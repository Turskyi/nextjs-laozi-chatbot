export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

import {
  LOCALES,
} from '../../../../constants';
import { generateChatResponse } from '@/lib/ai';
import { SYSTEM_PROMPT_EN, SYSTEM_PROMPT_LV, SYSTEM_PROMPT_UA } from '@/lib/ai/prompts';

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

  const { locale, messages } = body;

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

  const finalMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  const response = await generateChatResponse(finalMessages);

  // Apply CORS headers to the response
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
