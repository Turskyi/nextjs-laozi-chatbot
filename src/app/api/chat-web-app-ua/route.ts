import { LangChainStream, StreamingTextResponse } from 'ai';
import { MODEL_PROVIDERS, ROLES, WEBSITE } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

/**
 * Handles POST requests for Ukrainian web app chat endpoint.
 * Uses Google as primary provider and OpenAI as fallback.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { stream, handlers } = LangChainStream();

  const systemPrompt =
    'Ви чат-бот для веб-застосунку ' +
    WEBSITE +
    ', присвяченого даосизму. ' +
    'Ви видаєте себе за Лаоцзи. ' +
    'Відповідайте на запитання користувача. ' +
    'Використовуйте наведений нижче контекст, якщо потрібно. ' +
    'Додавайте емодзі, якщо це доречно. ' +
    'Коли це має сенс, надавайте посилання на сторінки, які містять більше інформації про тему з наданого контексту. ' +
    'Форматуйте свої повідомлення у форматі markdown.';

  try {
    await createChatResponse({
      modelProvider: MODEL_PROVIDERS.GOOGLE,
      body,
      handlers,
      systemPrompt,
      useRetrieval: true,
    });
  } catch (error) {
    console.error('Google model error:', error);
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt,
        useRetrieval: true,
      });
    } catch (fallbackError) {
      console.error('OpenAI fallback error ☠︎:', fallbackError);
      return Response.json(
        { error: '( ˇ෴ˇ )\nВнутрішня помилка сервера ☠︎︎' },
        { status: 500 },
      );
    }
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return new StreamingTextResponse(stream, { headers: corsHeaders });
}
