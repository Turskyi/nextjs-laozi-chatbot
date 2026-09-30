export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
import { generateChatResponse } from '@/lib/ai';
import { SYSTEM_PROMPT_EN } from '@/lib/ai/prompts';

const DEBUG = process.env.NODE_ENV === 'development';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, pageContext, pageContent } = body;
    if (DEBUG) {
      console.log('[ROUTE LOG /api/chat-web-en] Incoming request. Message count:', messages?.length);
    }

    let systemPrompt = SYSTEM_PROMPT_EN;
    if (pageContext) {
      systemPrompt += `\n\n${pageContext}`;
      if (pageContent) {
        systemPrompt += `\n\nManuscript page content:\n${pageContent}`;
      }
    }

    const finalMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await generateChatResponse(finalMessages, {
      locale: 'en',
      pageContext,
    });
    if (DEBUG) {
      console.log('[ROUTE LOG /api/chat-web-en] Response ready. Model:', response.headers.get('X-AI-Model'), 'Cache:', response.headers.get('X-Cache'));
    }
    return response;
  } catch (error) {
    console.error('Error in chat-web-en route:', error);
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nInternal server error' },
      { status: 500 },
    );
  }
}
