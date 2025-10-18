import { DataAPIClient } from '@datastax/astra-db-ts';
import { AstraDBVectorStore } from '@langchain/community/vectorstores/astradb';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { TEXT_EMBEDDING_MODELS } from '../../constants';

const endpoint = process.env.ASTRA_DB_ENDPOINT || '';
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || '';
const collection = process.env.ASTRA_DB_COLLECTION || '';

if (!token || !endpoint || !collection) {
  throw new Error(
    'Please set ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, ' +
      'and ASTRA_DB_COLLECTION environment variables.',
  );
}

export async function getGoogleVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new GoogleGenerativeAIEmbeddings({
      modelName: TEXT_EMBEDDING_MODELS.GOOGLE,
    }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: {
          // Max information that can fit in given model, with less dimension
          // we will loose information (not use to the fullest).
          dimension: 768,
          // Name of the algorithm of how these dimensions are compared.
          metric: 'cosine',
        },
      },
    },
  );
}

export async function getOpenAiVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({
      modelName: TEXT_EMBEDDING_MODELS.OPENAI,
    }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: {
          dimension: 1536,
          metric: 'cosine',
        },
      },
    },
  );
}

/** We need this function to be able later delete data from database. */
export async function getEmbeddingsCollection() {
  // Initialize the client and get a "Db" object
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);
  return db.collection(collection);
}
