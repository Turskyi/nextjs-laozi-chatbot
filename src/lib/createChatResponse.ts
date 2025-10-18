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
import { AI_MODEL_NAMES, ROLES, MODEL_PROVIDERS } from '../../constants';

/**
 * Universal chat response generator for all app variants (web, Android, iOS).
 * Supports both simple chat and retrieval-augmented chat depending on `useRetrieval`.
 */
export async function createChatResponse({
  modelProvider,
  body,
  handlers,
  systemPrompt,
  useRetrieval = false,
}: {
  modelProvider: typeof MODEL_PROVIDERS.GOOGLE | typeof MODEL_PROVIDERS.OPENAI;
  body: any;
  handlers: any;
  systemPrompt: string;
  useRetrieval?: boolean;
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

  // This logs generated text and prompt to the console.
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
    verbose: isVerboseLoggingEnabled,
    cache,
  });

  const rephrasingModel = new ChatModelClass({
    modelName:
      modelProvider === MODEL_PROVIDERS.GOOGLE
        ? AI_MODEL_NAMES.GOOGLE
        : AI_MODEL_NAMES.OPENAI,
    verbose: isVerboseLoggingEnabled,
    cache,
  });

  if (useRetrieval) {
    // Retrieval-augmented chat logic (for web version)
    const retriever =
      modelProvider === MODEL_PROVIDERS.GOOGLE
        ? // Gets vector store to retrieve documents.
          (await getGoogleVectorStore()).asRetriever()
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
      [ROLES.SYSTEM, `${systemPrompt}\n\nContext:\n{context}`],
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
    // documents that are similar to the user's input.
    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    await retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });
  } else {
    // If no retrieval is needed, run a simple prompt chain
    const prompt = ChatPromptTemplate.fromMessages([
      [ROLES.SYSTEM, systemPrompt],
      new MessagesPlaceholder('chat_history'),
      [ROLES.USER, '{input}'],
    ]);

    const chain = prompt.pipe(chatModel);

    await chain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });
  }
}
