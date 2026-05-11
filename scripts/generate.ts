import dotenv from 'dotenv';
// Configure dotenv before other imports.
dotenv.config({ path: '.env.local' });
import { Redis } from '@upstash/redis';

async function generateEmbeddings() {
  // When we generate new vector embeddings we also want to clear the cache,
  // because the information on the website might have changed.
  await Redis.fromEnv().flushdb();

  console.log('Generating embeddings logic disabled until refactored.');
}

generateEmbeddings();
