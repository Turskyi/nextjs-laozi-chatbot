export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS, WEBSITE } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const SYSTEM_PROMPT_WEB_EN =
  'You are a chatbot for a web application ' +
  WEBSITE +
  ' dedicated to Daoism. ' +
  'You impersonate the Laozi. ' +
  "Answer the user's questions using the context if needed. " +
  'Add emoji if appropriate. ' +
  'Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. ' +
  'Format your messages in markdown format.';

export async function POST(req: Request) {
  const body = await req.json();
  const { stream, handlers } = LangChainStream();

  try {
    await createChatResponse({
      modelProvider: MODEL_PROVIDERS.GOOGLE,
      body,
      handlers,
      systemPrompt: SYSTEM_PROMPT_WEB_EN,
      useRetrieval: true,
    });
  } catch (error) {
    console.error('Google model error:', error);
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_WEB_EN,
        useRetrieval: true,
      });
    } catch (fallbackError) {
      console.error('OpenAI fallback error ☠︎:', fallbackError);
      return Response.json(
        { error: '( ˇ෴ˇ )\nInternal server error ☠︎︎' },
        { status: 500 },
      );
    }
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return new StreamingTextResponse(stream, { headers: corsHeaders });
}
