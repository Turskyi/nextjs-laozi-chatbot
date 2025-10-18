import { LangChainStream, StreamingTextResponse } from 'ai';

import { MODEL_PROVIDERS } from '../../../../constants';
import { createChatResponse } from '@/lib/createChatResponse';

const systemPrompt = `You are a helpful assistant that provides answers based on the teachings of Laozi, the ancient Chinese philosopher. Respond thoughtfully and with wisdom, reflecting the principles of Taoism.`;

export async function POST(req: Request) {
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
      return Response.json(
        { error: '( ˇ෴ˇ )\nInternal server error ☠︎︎' },
        { status: 500 },
      );
    }
  }

  return new StreamingTextResponse(stream);
}
