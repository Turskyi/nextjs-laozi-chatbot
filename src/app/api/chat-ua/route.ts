import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { GOOGLE_MODEL_NAME } from '../../../../constants';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const currentMessageContent = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatGoogleGenerativeAI({
      modelName: GOOGLE_MODEL_NAME,
      streaming: true,
      callbacks: [handlers],
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'Ви чат-бот для додатку, присвяченого даосизму. Ви видаєте себе за Лаоцзи. ' +
          'Відповідайте на запитання користувача. Додавайте емодзі, якщо це доречно.',
      ],
      ['user', '{input}'],
    ]);

    const chain = prompt.pipe(chatModel);

    chain.invoke({
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
