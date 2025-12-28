export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import {
  MODEL_PROVIDERS,
  USE_RETRIEVAL_FALLBACK,
  WEBSITE,
} from '../../../../constants';
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

  // Start the chat response generation asynchronously.
  // We do not await this to ensure the stream is returned immediately,
  // avoiding Vercel timeouts for the initial response.
  (async () => {
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.GOOGLE,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_WEB_EN,
        useRetrieval: useRetrieval,
      });
    } catch (error) {
      console.error('Google model error:', error);
      try {
        await createChatResponse({
          modelProvider: MODEL_PROVIDERS.OPENAI,
          body,
          handlers,
          systemPrompt: SYSTEM_PROMPT_WEB_EN,
          useRetrieval: USE_RETRIEVAL_FALLBACK,
        });
      } catch (fallbackError) {
        console.error('OpenAI fallback error ☠︎:', fallbackError);
      }
    }
  })();

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return new StreamingTextResponse(stream, { headers: corsHeaders });
}
