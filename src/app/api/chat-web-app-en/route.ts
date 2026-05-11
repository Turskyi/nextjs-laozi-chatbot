export const runtime = 'edge';
export const preferredRegion = 'auto';
import { generateChatResponse } from '@/lib/ai';
import { SYSTEM_PROMPT_EN } from '@/lib/ai/prompts';

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
  try {
    const body = await req.json();
    const { messages } = body;

    const finalMessages = [
      { role: 'system', content: SYSTEM_PROMPT_EN },
      ...messages
    ];

    const response = await generateChatResponse(finalMessages);

    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error('Error in chat-web-app-en route:', error);
    return new Response(
      JSON.stringify({ error: '( ˇ෴ˇ )\nInternal server error ☠︎︎' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      },
    );
  }
}
