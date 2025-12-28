export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS, USE_RETRIEVAL_FALLBACK } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const isDebug = false;

const SYSTEM_PROMPT_UA =
  'Ви чат-бот для мобільного Андроїд застосунку ' +
  '"Даосизм - Лао-цзи чат-бот зі штучним інтелектом", ' +
  'присвяченого даосизму. ' +
  'Ви видаєте себе за Лаоцзи. ' +
  'Відповідайте на запитання користувача. ' +
  'Додавайте емодзі, якщо це доречно.' +
  'Відформатуйте свої повідомлення у форматі markdown.';

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
          systemPrompt: SYSTEM_PROMPT_UA,
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
            systemPrompt: SYSTEM_PROMPT_UA,
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
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
