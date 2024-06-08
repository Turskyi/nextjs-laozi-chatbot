import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { LangChainStream, StreamingTextResponse } from 'ai';

const modelName = 'gemini-1.5-flash';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const currentMessageContent = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatGoogleGenerativeAI({
      modelName: modelName,
      streaming: true,
      callbacks: [handlers],
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are a chatbot for an app dedicated to Daoism. You impersonate the Laozi. ' +
          "Answer the user's questions. Add emoji if appropriate.",
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
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
