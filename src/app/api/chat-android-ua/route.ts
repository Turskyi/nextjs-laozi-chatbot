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
    const messages = body.messages;

    const { stream, handlers } = LangChainStream();

    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.GOOGLE,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_UA,
        useRetrieval: false,
      });
    } catch {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT_UA,
        useRetrieval: false,
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
