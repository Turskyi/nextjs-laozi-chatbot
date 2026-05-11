export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
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
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
