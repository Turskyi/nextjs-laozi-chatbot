import { getGoogleVectorStore, getOpenAiVectorStore } from '@/lib/astradb';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Redis } from '@upstash/redis';
import { Message as VercelChatMessage } from 'ai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createRetrievalChain } from 'langchain/chains/retrieval';

import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis';
import { ChatOpenAI } from '@langchain/openai';
import {
  AI_MODEL_NAMES,
  ROLES,
  WEBSITE,
  MODEL_PROVIDERS,
} from '../../constants';

export async function createRetrievalResponse({
  modelProvider,
  body,
  handlers,
}: {
  modelProvider: typeof MODEL_PROVIDERS.GOOGLE | typeof MODEL_PROVIDERS.OPENAI;
  body: any;
  handlers: any;
}) {
  const messages = body.messages;
  const chatHistory = messages
    // This removes the last message from an array because it is already in
    // the following `currentMessageContent` from the user.
    .slice(0, -1)
    .map((m: VercelChatMessage) =>
      m.role === ROLES.USER
        ? new HumanMessage(m.content)
        : new AIMessage(m.content),
    );

  const currentMessageContent = messages[messages.length - 1].content;

  const cache = new UpstashRedisCache({ client: Redis.fromEnv() });

  const isVerboseLoggingEnabled = false;

  const ChatModelClass =
    modelProvider === MODEL_PROVIDERS.GOOGLE
      ? ChatGoogleGenerativeAI
      : ChatOpenAI;

  const chatModel = new ChatModelClass({
    modelName:
      modelProvider === MODEL_PROVIDERS.GOOGLE
        ? AI_MODEL_NAMES.GOOGLE
        : AI_MODEL_NAMES.OPENAI,
    streaming: true,
    callbacks: [handlers],
    // This logs generated text and prompt to the console.
    verbose: isVerboseLoggingEnabled,
    cache,
  });

  const rephrasingModel = new ChatModelClass({
    modelName:
      modelProvider === MODEL_PROVIDERS.GOOGLE
        ? AI_MODEL_NAMES.GOOGLE
        : AI_MODEL_NAMES.OPENAI,
    // This logs generated text and prompt to the console.
    verbose: isVerboseLoggingEnabled,
    cache,
  });

  const retriever =
    modelProvider === MODEL_PROVIDERS.GOOGLE
      ? (await getGoogleVectorStore()).asRetriever()
      : (await getOpenAiVectorStore()).asRetriever();

  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder('chat_history'),
    [ROLES.USER, '{input}'],
    [
      ROLES.USER,
      'Given the above conversation, generate a search query to look up in order to get information relevant to the current question. Don’t leave out any relevant keywords. Only return the query and no other text.',
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
      ROLES.SYSTEM,
      // Context will contain documents that we fetch from our vector store.
      `You are a chatbot for a website ${WEBSITE} dedicated to Daoism. You impersonate the Laozi. Answer the user's questions using the context if needed. Add emoji if appropriate. Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. Format your messages in markdown format.\n\nContext:\n{context}`,
    ],
    new MessagesPlaceholder('chat_history'),
    [ROLES.USER, '{input}'],
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
}
