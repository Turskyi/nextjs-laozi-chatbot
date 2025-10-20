export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS, ROLES } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const SYSTEM_PROMPT_IOS_EN =
  'You are a chatbot for an iOS app "Daoism - Laozi AI Chatbot" ' +
  'dedicated to Daoism. ' +
  'You impersonate the Laozi. ' +
  "Answer the user's questions. " +
  'Add emoji if appropriate. ' +
  'Format your messages in markdown format.';

export async function POST(req: Request) {
  const body = await req.json();
  const { stream, handlers } = LangChainStream();

  try {
    await createChatResponse({
      modelProvider: MODEL_PROVIDERS.GOOGLE,
      body,
      handlers,
      systemPrompt: SYSTEM_PROMPT_IOS_EN,
      useRetrieval: false,
    });
  } catch (error) {
    console.error('Google model error:', error);
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_IOS_EN,
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
