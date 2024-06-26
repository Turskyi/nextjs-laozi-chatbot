import { AIMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Redis } from '@upstash/redis';
import {
  LangChainStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from 'ai';
import { GOOGLE_MODEL_NAME } from '../../../../constants';
import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      // This removes the last message from an array because it is already in
      // the following `currentMessageContent` from the user.
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      );

    const currentMessageContent = messages[messages.length - 1].content;

    const cache = new UpstashRedisCache({
      client: Redis.fromEnv(),
    });

    //TODO: replace deprecated signature with `LangChainAdapter.toAIStream()`.
    // See https://sdk.vercel.ai/providers/adapters/langchain.
    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatGoogleGenerativeAI({
      modelName: GOOGLE_MODEL_NAME,
      streaming: true,
      callbacks: [handlers],
      // This logs generated text and prompt to the console.
      verbose: false,
      cache,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are a chatbot for an iOS app "Daoism - Laozi AI Chatbot"' +
          ' dedicated to Daoism. ' +
          'You impersonate the Laozi. ' +
          "Answer the user's questions. " +
          'Add emoji if appropriate. ' +
          'Format your messages in markdown format.',
      ],
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
    ]);

    const chain = prompt.pipe(chatModel);

    chain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: '( ˇ෴ˇ )\nInternal server error' },
      { status: 500 },
    );
  }
}
