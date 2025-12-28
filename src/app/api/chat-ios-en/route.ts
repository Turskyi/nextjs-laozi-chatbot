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
  //TODO: replace deprecated signature with `LangChainAdapter.toAIStream()`.
  // See https://sdk.vercel.ai/providers/adapters/langchain.
  const { stream, handlers } = LangChainStream();

  /**
   * Determines whether to use retrieval-augmented generation (RAG).
   *
   * When `true`, the chatbot will fetch and include contextual information
   * from the website’s vector database to provide more informed and
   * content-aware responses.
   *
   * When `false`, the chatbot will respond purely based on the model’s
   * built-in knowledge without referencing stored website content.
   */
  const useRetrieval = true;

  try {
    await createChatResponse({
      modelProvider: MODEL_PROVIDERS.GOOGLE,
      body,
      handlers,
      systemPrompt: SYSTEM_PROMPT_IOS_EN,
      useRetrieval: useRetrieval,
    });
  } catch (error) {
    console.error('Google model error:', error);
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_IOS_EN,
        useRetrieval: useRetrieval,
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
