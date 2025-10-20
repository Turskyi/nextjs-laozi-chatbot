export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

export async function POST(req: Request) {
  const body = await req.json();
  const { stream, handlers } = LangChainStream();

  const systemPrompt =
    'You are a chatbot for an Android app "Daoism - Laozi AI Chatbot" ' +
    'dedicated to Daoism. ' +
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
