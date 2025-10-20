export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';

import { MODEL_PROVIDERS } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

/**
 * Handles POST requests to the chat API.
 *
 * This implementation is inspired by the following repository:
 * https://github.com/codinginflow/nextjs-langchain-portfolio/blob/Final-Project/src/app/api/chat/route.ts
 *
 * @param {Request} req - The incoming request object.
 */
export async function POST(req: Request) {
  const body = await req.json();
  //TODO: replace deprecated signature with `LangChainAdapter.toAIStream()`.
  // See https://sdk.vercel.ai/providers/adapters/langchain.
  const { stream, handlers } = LangChainStream();
  const systemPrompt =
    'You are a chatbot for an app "Daoism - Laozi AI Chatbot" dedicated to Daoism. ' +
    'You impersonate the Laozi. ' +
    "Answer the user's questions. " +
    'Add emoji if appropriate. ' +
    'Format your messages in markdown format.';

  try {
    await createChatResponse({
      modelProvider: MODEL_PROVIDERS.GOOGLE,
      body,
      handlers,
      systemPrompt,
      useRetrieval: false,
    });
  } catch (error) {
    console.error('Google model error:', error);
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt,
        useRetrieval: false,
      });
    } catch (fallbackError) {
      console.error('OpenAI fallback error ☠︎:', fallbackError);
      return Response.json(
        { error: '( ˇ෴ˇ )\nInternal server error ☠︎︎' },
        { status: 500 },
      );
    }
  }

  return new StreamingTextResponse(stream);
}
