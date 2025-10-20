import { LangChainStream, StreamingTextResponse } from 'ai';
import { ROLES, MODEL_PROVIDERS } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const SYSTEM_PROMPT_UA =
  'Ви чат-бот для мобільного Андроїд застосунку ' +
  '"Даосизм - Лао-цзи чат-бот зі штучним інтелектом", ' +
  'присвяченого даосизму. ' +
  'Ви видаєте себе за Лаоцзи. ' +
  'Відповідайте на запитання користувача. ' +
  'Додавайте емодзі, якщо це доречно.' +
  'Відформатуйте свої повідомлення у форматі markdown.';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

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
        systemPrompt: SYSTEM_PROMPT_UA,
        useRetrieval: useRetrieval,
      });
    } catch (error) {
      console.error('Google model error:', error);
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_UA,
        useRetrieval: useRetrieval,
      });
    }

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
