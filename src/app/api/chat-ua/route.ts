import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

// The system prompt is now a constant, specific to the Android app.
const SYSTEM_PROMPT =
  'Ви чат-бот для додатку "Даосизм - Лао-цзи чат-бот зі штучним інтелектом", присвяченого даосизму. Ви видаєте себе за Лаоцзи. Відповідайте на запитання користувача. Додавайте емодзі, якщо це доречно.';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { stream, handlers } = LangChainStream();

    try {
      // Attempt to generate a response with the primary model provider (Google).
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.GOOGLE,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT,
      });
    } catch (error) {
      // If the primary provider fails, log the error and fall back to the secondary.
      console.warn(
        'Primary model provider (Google) failed. Falling back to OpenAI.',
        error,
      );
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT,
      });
    }

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(
      'An unrecoverable error occurred in the chat endpoint:',
      error,
    );
    return Response.json(
      { error: 'ᕙ(⇀‸↼‶)ᕗ\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
