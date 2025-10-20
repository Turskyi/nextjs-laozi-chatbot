export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

// Define the system prompt as a constant to avoid repetition.
const SYSTEM_PROMPT =
  'Ви чат-бот для мобільного iOS застосунку "Даосизм - Лао-цзи чат-бот зі штучним інтелектом", присвяченого даосизму. Ви видаєте себе за Лаоцзи. Відповідайте на запитання користувача. Додавайте емодзі, якщо це доречно. Відформатуйте свої повідомлення у форматі markdown.';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { stream, handlers } = LangChainStream();

    try {
      // Attempt to create a chat response with the primary model provider.
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.GOOGLE,
        body,
        handlers,
        systemPrompt: SYSTEM_PROMPT,
      });
    } catch (error) {
      // If the primary provider fails, fall back to the secondary provider.
      console.warn(
        'Primary model provider failed, falling back to secondary:',
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
    // Log the error for debugging purposes and return a user-friendly error message.
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { error: '༼ ༎ຶ ෴ ༎ຶ༽\nВнутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
