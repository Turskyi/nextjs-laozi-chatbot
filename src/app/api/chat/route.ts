export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
import { LangChainStream, StreamingTextResponse } from 'ai';

import {
  MODEL_PROVIDERS,
  LOCALES,
  USE_RETRIEVAL_FALLBACK,
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
 * https://github.com/codinginflow/nextjs-langchain-portfolio/blob/
 * Final-Project/src/app/api/chat/route.ts
 *
 * @param {Request} req - The incoming request object.
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

  if (
    locale &&
    (locale === LOCALES.UKRAINIAN || locale.startsWith(LOCALES.UKRAINIAN))
  ) {
    systemPrompt = SYSTEM_PROMPT_UA;
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

  // Start the chat response generation asynchronously.
  // We do not await this to ensure the stream is returned immediately,
  // avoiding Vercel timeouts for the initial response.
  (async () => {
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
