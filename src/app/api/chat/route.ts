export const runtime = 'edge';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';

import { MODEL_PROVIDERS, LOCALES } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const SYSTEM_PROMPT_EN =
  'You are a chatbot for an app ' +
  '"Daoism • Laozi AI" dedicated to Daoism. ' +
  'You impersonate the Laozi. ' +
  "Answer the user's questions. " +
  'Add emoji if appropriate. ' +
  'Format your messages in markdown format.';

const SYSTEM_PROMPT_UA =
  'Ви чат-бот для застосунку ' +
  '"Даосизм • Лао-цзи чат-бот зі штучним інтелектом", ' +
  'присвяченого даосизму. ' +
  'Ви видаєте себе за Лаоцзи. ' +
  'Відповідайте на запитання користувача. ' +
  'Додавайте емодзі, якщо це доречно.' +
  'Відформатуйте свої повідомлення у форматі markdown.';

const SYSTEM_PROMPT_LV =
  'Jūs esat tērzēšanas robots lietotnei ' +
  '"Daoisms • Laodzi AI", ' +
  'kas veltīta daoisma tēmai. ' +
  'Jūs atveidojat Laodzi. ' +
  'Atbildiet uz lietotāja jautājumiem. ' +
  'Pievienojiet emocijzīmes, ja tas ir piemēroti.' +
  'Formatējiet savus ziņojumus markdown formātā.';

/**
 * Handles POST requests to the chat API.
 *
 * This implementation is inspired by the following repository:
 * https://github.com/codinginflow/nextjs-langchain-portfolio/blob/Final-Project/src/app/api/chat/route.ts
 *
 * @param {Request} req - The incoming request object.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { locale } = body;

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

  let systemPrompt = SYSTEM_PROMPT_EN;
  let isUa = false;

  if (
    locale &&
    (locale === LOCALES.UKRAINIAN || locale.startsWith(LOCALES.UKRAINIAN))
  ) {
    systemPrompt = SYSTEM_PROMPT_UA;
    isUa = true;
  } else if (
    locale &&
    (locale === LOCALES.LATVIAN || locale.startsWith(LOCALES.LATVIAN))
  ) {
    systemPrompt = SYSTEM_PROMPT_LV;
  } else if (
    locale &&
    locale !== LOCALES.ENGLISH &&
    !locale.startsWith(LOCALES.ENGLISH)
  ) {
    try {
      const languageName = new Intl.DisplayNames([LOCALES.ENGLISH], {
        type: 'language',
      }).of(locale);
      systemPrompt += `\nAnswer in ${languageName || locale}.`;
    } catch (e) {
      systemPrompt += `\nAnswer in the language with code "${locale}".`;
    }
  }

  try {
    await createChatResponse({
      modelProvider: MODEL_PROVIDERS.GOOGLE,
      body,
      handlers,
      systemPrompt,
      useRetrieval: useRetrieval,
    });
  } catch (error) {
    console.error('Google model error:', error);
    try {
      await createChatResponse({
        modelProvider: MODEL_PROVIDERS.OPENAI,
        body,
        handlers,
        systemPrompt,
        useRetrieval: useRetrieval,
      });
    } catch (fallbackError) {
      console.error('OpenAI fallback error ☠︎:', fallbackError);
      if (isUa) {
        return Response.json(
          { error: '༼ ༎ຶ ෴ ༎ຶ༽\nВнутрішня помилка сервера' },
          { status: 500 },
        );
      }
      return Response.json(
        { error: '( ˇ෴ˇ )\nInternal server error ☠︎︎' },
        { status: 500 },
      );
    }
  }

  return new StreamingTextResponse(stream);
}
