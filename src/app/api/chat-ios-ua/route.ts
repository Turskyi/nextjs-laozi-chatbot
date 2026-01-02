export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import {
  APP_NAME_UA,
  MODEL_PROVIDERS,
  USE_RETRIEVAL_FALLBACK,
} from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

// Define the system prompt as a constant to avoid repetition.
const SYSTEM_PROMPT =
  'Ви чат-бот для мобільного iOS застосунку ' +
  `"${APP_NAME_UA}", присвяченого даосизму. ` +
  'Ви видаєте себе за Лаоцзи. Відповідайте на запитання користувача. ' +
  'Додавайте емодзі, якщо це доречно. ' +
  'Відформатуйте свої повідомлення у форматі markdown.';

export async function POST(req: Request) {
  try {
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
        // Attempt to create a chat response with the primary model provider.
        await createChatResponse({
          modelProvider: MODEL_PROVIDERS.GOOGLE,
          body,
          handlers,
          systemPrompt: SYSTEM_PROMPT,
          useRetrieval: useRetrieval,
        });
      } catch (error) {
        // If the primary provider fails, fall back to the secondary provider.
        console.warn(
          'Primary model provider failed, falling back to secondary:',
          error,
        );
        try {
          await createChatResponse({
            modelProvider: MODEL_PROVIDERS.OPENAI,
            body,
            handlers,
            systemPrompt: SYSTEM_PROMPT,
            useRetrieval: USE_RETRIEVAL_FALLBACK,
          });
        } catch (fallbackError) {
          console.error('Fallback model failed:', fallbackError);
        }
      }
    })();

    return new StreamingTextResponse(stream);
  } catch (error) {
    // Log the error for debugging purposes and return a user-friendly error
    // message.
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
