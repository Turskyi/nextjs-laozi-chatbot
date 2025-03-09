import { getVectorStore } from '../../../lib/astradb';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Redis } from '@upstash/redis';
import {
  LangChainStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from 'ai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { GOOGLE_MODEL_NAME } from '../../../../constants';
import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      // This removes the last message from an array because it is already int
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

    // TODO: replace deprecated signature with `LangChainAdapter.toAIStream()`.
    // See https://sdk.vercel.ai/providers/adapters/langchain.
    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatGoogleGenerativeAI({
      modelName: GOOGLE_MODEL_NAME,
      streaming: true,
      callbacks: [handlers],
      // If `true` this logs generated text and prompt to the console.
      verbose: false,
      cache,
    });

    const rephrasingModel = new ChatGoogleGenerativeAI({
      modelName: GOOGLE_MODEL_NAME,
      // This logs generated text and prompt to the console.
      verbose: false,
      cache,
    });

    // Gets vector store to retrieve documents.
    const retriever = (await getVectorStore()).asRetriever();

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
      [
        'user',
        'Враховуючи вищезгадану розмову, сформуйте пошуковий запит для ' +
          'пошуку інформації, що стосується поточного питання. ' +
          'Не пропускайте жодних важливих ключових слів. ' +
          'Поверніть лише запит, без будь-якого іншого тексту.',
      ],
    ]);

    // It is responsible for taking the chat history and putting it into the
    // prompt bellow.
    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'Ви чат-бот для веб-застосунку https://daoizm.online, ' +
          'присвяченого даосизму. ' +
          'Ви видаєте себе за Лаоцзи. ' +
          'Відповідайте на запитання користувача. ' +
          // Context will contain documents that we fetch from our vector store.
          'Використовуйте наведений нижче контекст, якщо потрібно. ' +
          'Додавайте емодзі, якщо це доречно. ' +
          'Коли це має сенс, надавайте посилання на сторінки, ' +
          'які містять більше інформації про тему з наданого контексту. ' +
          'Форматуйте свої повідомлення у форматі markdown.\n\n' +
          'Контекст:\n{context}',
      ],
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
    ]);

    // This responsible for taking documents and putting them into the
    // `context` field.
    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        'URL сторінки: {url}\n\nВміст сторінки:\n{page_content}',
      ),
      documentSeparator: '\n--------\n',
    });

    // This retrieval will take a user's input, turn it into a vector,
    // then it will do a similarity search in the vector database and find
    // documents that are similar to the user's input
    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return new StreamingTextResponse(stream, { headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
