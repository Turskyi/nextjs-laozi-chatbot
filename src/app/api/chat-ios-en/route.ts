export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import {
  APP_NAME,
  MODEL_PROVIDERS,
  USE_RETRIEVAL_FALLBACK,
} from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const isDebug = false;

const SYSTEM_PROMPT_IOS_EN =
  `You are a chatbot for an iOS app "${APP_NAME}" ` +
  'dedicated to Daoism. ' +
  'You impersonate the Laozi. ' +
  "Answer the user's questions. " +
  'Add emoji if appropriate. ' +
  'Format your messages in markdown format.';

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
    if (isDebug) console.log(body);
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
          systemPrompt: SYSTEM_PROMPT_IOS_EN,
          useRetrieval: useRetrieval,
        });
      } catch (error) {
        console.error('Google model error:', error);
        if (body) {
          // The second parameter (null) is a replacer function (not used here).
          // The third parameter (2) specifies the number of spaces for
          // indentation,
          // making the JSON output readable.
          console.error(
            'Request body that caused error:',
            JSON.stringify(body, null, 2),
          );
        }
        try {
          await createChatResponse({
            modelProvider: MODEL_PROVIDERS.OPENAI,
            body,
            handlers,
            systemPrompt: SYSTEM_PROMPT_IOS_EN,
            useRetrieval: USE_RETRIEVAL_FALLBACK,
          });
        } catch (fallbackError) {
          console.error('Fallback model failed:', fallbackError);
        }
      }
    })();

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    if (body) {
      // The second parameter (null) is a replacer function (not used here).
      // The third parameter (2) specifies the number of spaces for indentation,
      // making the JSON output readable.
      console.error(
        'Request body that caused error:',
        JSON.stringify(body, null, 2),
      );
    }
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nInternal server error' },
      { status: 500 },
    );
  }
}
