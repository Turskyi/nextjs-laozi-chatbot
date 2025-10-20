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
  console.log('--- createChatResponse start ---');
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

  console.log('Creating UpstashRedisCache...');
  const cache = new UpstashRedisCache({ client: Redis.fromEnv() });
  console.log('UpstashRedisCache created.');

  // This logs generated text and prompt to the console.
  const isVerboseLoggingEnabled = false;

  const ChatModelClass =
    modelProvider === MODEL_PROVIDERS.GOOGLE
      ? ChatGoogleGenerativeAI
      : ChatOpenAI;

  console.log(`Initializing ${ChatModelClass.name}...`);
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
  console.log(`${ChatModelClass.name} initialized.`);

  console.log(`Initializing rephrasing model...`);
  const rephrasingModel = new ChatModelClass({
    modelName:
      modelProvider === MODEL_PROVIDERS.GOOGLE
        ? AI_MODEL_NAMES.GOOGLE
        : AI_MODEL_NAMES.OPENAI,
    verbose: isVerboseLoggingEnabled,
    cache,
  });
  console.log(`Rephrasing model initialized.`);

  if (useRetrieval) {
    console.log('--- Retrieval-augmented chat start ---');
    console.log(`Getting retriever for ${modelProvider}...`);
    // Retrieval-augmented chat logic (for web version)
    const retriever =
      modelProvider === MODEL_PROVIDERS.GOOGLE
        ? // Gets vector store to retrieve documents.
          (
            await (async () => {
              console.log('Getting GoogleVectorStore...');
              const store = await getGoogleVectorStore();
              console.log('GoogleVectorStore obtained.');
              return store;
            })()
          ).asRetriever()
        : (
            await (async () => {
              console.log('Getting OpenAiVectorStore...');
              const store = await getOpenAiVectorStore();
              console.log('OpenAiVectorStore obtained.');
              return store;
            })()
          ).asRetriever();
    console.log('Retriever obtained.');

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder('chat_history'),
      [ROLES.USER, '{input}'],
      [
        ROLES.USER,
        'Given the above conversation, generate a search query to look up in order to get information relevant to the current question. Don’t leave out any relevant keywords. Only return the query and no other text.',
      ],
    ]);

    console.log('Creating history-aware retriever chain...');
    // It is responsible for taking the chat history and putting it into the
    // prompt bellow.
    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });
    console.log('History-aware retriever chain created.');

    const prompt = ChatPromptTemplate.fromMessages([
      [ROLES.SYSTEM, `${systemPrompt}\n\nContext:\n{context}`],
      new MessagesPlaceholder('chat_history'),
      [ROLES.USER, '{input}'],
    ]);

    console.log('Creating stuff documents chain...');
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
    console.log('Stuff documents chain created.');

    console.log('Creating retrieval chain...');
    // This retrieval will take a user's input, turn it into a vector,
    // then it will do a similarity search in the vector database and find
    // documents that are similar to the user's input.
    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });
    console.log('Retrieval chain created.');

    console.log('Invoking retrieval chain...');
    await retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });
    console.log('Retrieval chain invoked.');
    console.log('--- Retrieval-augmented chat end ---');
  } else {
    console.log('--- Simple chat start ---');
    // If no retrieval is needed, run a simple prompt chain
    const prompt = ChatPromptTemplate.fromMessages([
      [ROLES.SYSTEM, systemPrompt],
      new MessagesPlaceholder('chat_history'),
      [ROLES.USER, '{input}'],
    ]);

    const chain = prompt.pipe(chatModel);

    if (modelProvider === MODEL_PROVIDERS.GOOGLE) {
      console.log('Invoking simple chain with google...');
      try {
        await Promise.race([
          chain.invoke({
            input: currentMessageContent,
            chat_history: chatHistory,
          }),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error('Google AI timeout after 8s')),
              8000,
            ),
          ),
        ]);
      } catch (error) {
        console.warn('Google AI timeout, falling back to OpenAI...');
        // Fallback to OpenAI directly inside createChatResponse
        const openAiChatModel = new ChatOpenAI({
          modelName: AI_MODEL_NAMES.OPENAI,
          streaming: true,
          callbacks: [handlers],
          verbose: false,
          cache,
        });
        const chain = prompt.pipe(openAiChatModel);
        await chain.invoke({
          input: currentMessageContent,
          chat_history: chatHistory,
        });
      }
    } else {
      console.log('Invoking simple chain with openai...');
      await chain.invoke({
        input: currentMessageContent,
        chat_history: chatHistory,
      });
    }

    console.log('Simple chain invoked.');
    console.log('--- Simple chat end ---');
  }
  console.log('--- createChatResponse end ---');
}
