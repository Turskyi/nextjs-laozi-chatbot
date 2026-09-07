import dotenv from 'dotenv';
// Configure dotenv before other imports.
dotenv.config({ path: '.env.local' });
import { Redis } from '@upstash/redis';

async function generateEmbeddings() {
  // When we generate new vector embeddings we also want to clear the cache,
  // because the information on the website might have changed.

  // Only attempt to flush if the Upstash env vars are present. In CI/builds these
  // are often not set or network access may be restricted; failures should not
  // block the build.
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Skipping Upstash Redis flush: UPSTASH env vars not set.');
  } else {
    try {
      const redis = Redis.fromEnv();
      // Guard against long hangs by racing against a timeout.
      await Promise.race([
        redis.flushdb(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Upstash flush timeout')), 5000)),
      ]);
      console.log('Upstash Redis flush completed.');
    } catch (err: any) {
      // Log a warning but do not fail the build.
      console.warn('Upstash Redis flush failed, continuing build:', err?.message ?? err);
    }
  }

  console.log('Generating embeddings logic disabled until refactored.');
}

generateEmbeddings();
