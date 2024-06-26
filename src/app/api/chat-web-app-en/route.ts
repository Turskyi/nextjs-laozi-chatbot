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
      // This logs generated text and prompt to the console.
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
        'Given the above conversation, ' +
          'generate a search query to look up in order to get information ' +
          'relevant to the current question. ' +
          "Don't leave out any relevant keywords. " +
          'Only return the query and no other text.',
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
        'You are a chatbot for a web application https://daoizm.online ' +
          'dedicated to Daoism. ' +
          'You impersonate the Laozi. ' +
          // Context will contain documents that we fetch from our vector store.
          "Answer the user's questions. Use the below context if needed. " +
          'Add emoji if appropriate. ' +
          'Whenever it makes sense, ' +
          'provide links to pages that contain more information about the ' +
          'topic from the given context. ' +
          'Format your messages in markdown format.\n\n' +
          'Context:\n{context}',
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
        'Page URL: {url}\n\nPage content:\n{page_content}',
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
