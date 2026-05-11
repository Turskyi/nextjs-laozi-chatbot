export const runtime = 'edge';
export const preferredRegion = 'auto';
import { generateChatResponse } from '@/lib/ai';
import { SYSTEM_PROMPT_UA } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    const finalMessages = [
      { role: 'system', content: SYSTEM_PROMPT_UA },
      ...messages
    ];

    return await generateChatResponse(finalMessages);
  } catch (error) {
    console.error(
      'An unrecoverable error occurred in the chat endpoint:',
      error,
    );
    return Response.json(
      { error: 'ᕙ(⇀‸↼‶)ᕗ\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
