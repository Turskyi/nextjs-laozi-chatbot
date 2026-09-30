export const runtime = 'edge';
export const preferredRegion = 'auto';
import { generateChatResponse } from '@/lib/ai';
import { SYSTEM_PROMPT_EN } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, pageContext, pageContent } = body;

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

    return await generateChatResponse(finalMessages, {
      locale: 'en',
      pageContext,
    });
  } catch (error) {
    console.error('Error in chat-ios-en route:', error);
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nInternal server error' },
      { status: 500 },
    );
  }
}
