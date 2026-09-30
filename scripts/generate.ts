/**
 * @file Generate Script
 * @see {@link https://github.com/codinginflow/nextjs-langchain-portfolio/blob/Final-Project/scripts/generate.ts | Original Inspiration (Coding in Flow Next.js LangChain Portfolio)}
 *
 * Architectural Note on Vector Database & RAG Removal:
 *
 * Originally inspired by Florian Walther's SMART Portfolio Website tutorial, this script
 * was designed to scrape site pages, split content into text chunks using LangChain, compute
 * OpenAI vector embeddings, and store them in an AstraDB vector database.
 *
 * Why we do NOT use a vector database (AstraDB RAG) here and why in-context prompts are better:
 *
 * 1. **Direct In-Context Knowledge vs. Chunked Vector Retrieval**:
 *    The entire static dataset of this app (the 18 Dunhuang manuscript pages, chapter mappings,
 *    About page, and FAQ) is compact (~50 KB total). Modern LLMs (Qwen, Mistral, Gemini) feature
 *    large context windows (128k+ tokens). Injecting the structured manuscript directory and page
 *    content directly into system prompts ensures 100% deterministic, accurate responses with
 *    zero chunking loss, zero vector search hallucinations, and zero DB lookup latency.
 *
 * 2. **Multi-Provider Fallback Compatibility**:
 *    The app uses a resilient multi-provider fallback system (Groq -> OpenRouter -> Mistral -> Gemini).
 *    Different AI providers and embedding models use conflicting vector dimension sizes (e.g., 768 for
 *    Gemini `text-embedding-004` vs. 1536 for OpenAI `text-embedding-3-small`), making a single vector
 *    database index fragile and tightly coupled to a single vendor.
 *
 * 3. **Preserving Nuance Across Multiple Daodejing Translations**:
 *    The Daodejing is inherently subtle and multi-layered. A static vector store restricts the AI
 *    to retrieving chunks from a single rigid translation. By giving the AI broad structured context
 *    plus its pre-trained knowledge across multiple historical translations (e.g., Legge, Waley,
 *    Ames & Hall, Ziporyn), the chatbot offers deeper, more comparative, and nuanced guidance.
 *
 * 4. **Operational Reliability & Zero Third-Party Infrastructure Failure**:
 *    Eliminating AstraDB vector store queries removes extra API latency on every chat message and
 *    prevents production downtime if AstraDB credentials expire, hibernate, or reach rate limits.
 *
 * Currently, this script flushes the Upstash Redis cache (to clear stale AI response caches)
 * during build/deployment.
 */

import dotenv from 'dotenv';
// Configure dotenv before other imports.
dotenv.config({ path: '.env.local' });
import { Redis } from '@upstash/redis';

async function generateEmbeddings() {
  // When we deploy or rebuild, we want to clear the Upstash response cache
  // so that responses reflect any updated prompt context or system rules.

  // Only attempt to flush if the Upstash env vars are present. In CI/builds
  // these are often not set or network access may be restricted; failures
  // should not block the build.
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    console.warn('Skipping Upstash Redis flush: UPSTASH env vars not set.');
  } else {
    try {
      const redis = Redis.fromEnv();
      // Guard against long hangs by racing against a timeout.
      await Promise.race([
        redis.flushdb(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Upstash flush timeout')), 5000),
        ),
      ]);
      console.log('Upstash Redis flush completed.');
    } catch (err: any) {
      // Log a warning but do not fail the build.
      console.warn(
        'Upstash Redis flush failed, continuing build:',
        err?.message ?? err,
      );
    }
  }

  console.log('Upstash cache flush checked.');
}

generateEmbeddings();

