export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import {
  MODEL_PROVIDERS,
  USE_RETRIEVAL_FALLBACK,
  WEBSITE,
} from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Handles CORS preflight for the endpoint.
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

const SYSTEM_PROMPT_WEB_EN =
  'You are a chatbot for a web application ' +
  WEBSITE +
  ' dedicated to Daoism. ' +
  'You impersonate the Laozi. ' +
  "Answer the user's questions using the context if needed. " +
  'Add emoji if appropriate. ' +
  'Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. ' +
  'Format your messages in markdown format.';

/**
 * Handles POST requests for English web app chat endpoint.
 * Uses Google as primary provider and OpenAI as fallback.
 */
export async function POST(req: Request) {
  // Parse body defensively - some clients (or preflight requests) may not send a JSON body.
  let body: any = null;
  try {
    body = await req
      .clone()
      .json()
      .catch(() => null);
  } catch (e) {
    body = null;
  }

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
        return new Response(
          JSON.stringify({ error: '( ˇ෴ˇ )\nВнутрішня помилка сервера ☠︎︎' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
          },
        );
      }
    }
  })();

  return new StreamingTextResponse(stream, { headers: CORS_HEADERS });
}
