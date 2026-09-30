import { Redis } from '@upstash/redis';

const DEBUG = process.env.NODE_ENV === 'development';

let redisInstance: Redis | null = null;
let isRedisDisabled = false;

function getRedis(): Redis | null {
  if (isRedisDisabled) return null;

  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    if (DEBUG) console.log('[CACHE LOG] Upstash env vars missing in process.env.');
    return null;
  }

  if (!redisInstance) {
    try {
      redisInstance = Redis.fromEnv();
      if (DEBUG) console.log('[CACHE LOG] Upstash Redis client initialized fromEnv.');
    } catch (err) {
      console.warn('[CACHE LOG] Failed to initialize Upstash Redis client:', err);
      isRedisDisabled = true;
      return null;
    }
  }
  return redisInstance;
}

/**
 * Generates a deterministic cache key based on the last user message,
 * locale, and pageContext. Compatible with both Node.js and Edge runtimes.
 */
export function getCacheKey(
  messages: any[],
  locale?: string,
  pageContext?: string,
): string {
  const userMessages = (messages || []).filter((m) => m.role === 'user');
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || '';
  const normalizedText = lastUserMessage.trim().toLowerCase();
  const localePart = locale ? locale.toLowerCase().trim() : 'en';
  const pagePart = pageContext ? pageContext.toLowerCase().trim() : 'global';

  const rawKey = `${localePart}:${pagePart}:${normalizedText}`;

  // Fast deterministic hash compatible with Edge runtime (no Node 'crypto' module)
  let hash = 0;
  for (let i = 0; i < rawKey.length; i++) {
    const char = rawKey.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hexHash = Math.abs(hash).toString(16);
  return `chat:cache:${localePart}:${hexHash}`;
}

/**
 * Retrieves a cached AI response from Upstash Redis if available.
 */
export async function getCachedResponse(
  cacheKey: string,
): Promise<string | null> {
  if (DEBUG) console.log(`[CACHE LOG] Checking Upstash Redis cache key: "${cacheKey}"`);
  const redis = getRedis();
  if (!redis) {
    if (DEBUG) console.log(`[CACHE LOG] Redis client unavailable or disabled.`);
    return null;
  }

  try {
    const cached = await Promise.race([
      redis.get<string>(cacheKey),
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout (1500ms)')), 1500),
      ),
    ]);
    if (cached) {
      if (DEBUG) {
        console.log(
          `[CACHE LOG] Cache HIT! Found ${cached.length} characters in Redis for key "${cacheKey}".`,
        );
      }
    } else {
      if (DEBUG) {
        console.log(
          `[CACHE LOG] Cache MISS! No entry found in Redis for key "${cacheKey}".`,
        );
      }
    }
    return cached || null;
  } catch (err: any) {
    const message = err?.message ?? String(err);
    console.warn(
      `[CACHE LOG] Upstash Redis read failed (${message}). Host: "${process.env.UPSTASH_REDIS_REST_URL}". Disabling Redis cache for current process.`,
    );
    isRedisDisabled = true;
    return null;
  }
}

/**
 * Saves an AI response string in Upstash Redis with a default TTL of 7 days (604,800s).
 */
export async function setCachedResponse(
  cacheKey: string,
  content: string,
  ttlSeconds: number = 604800,
): Promise<void> {
  if (DEBUG) {
    console.log(
      `[CACHE LOG] Saving completion (${content.length} chars) to Redis key: "${cacheKey}"`,
    );
  }
  const redis = getRedis();
  if (!redis || !content || content.trim().length === 0) {
    if (DEBUG) {
      console.log(
        `[CACHE LOG] Skip saving to Redis (client unavailable or content empty).`,
      );
    }
    return;
  }

  try {
    await Promise.race([
      redis.set(cacheKey, content, { ex: ttlSeconds }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout (1500ms)')), 1500),
      ),
    ]);
    if (DEBUG) {
      console.log(
        `[CACHE LOG] Successfully saved completion to Redis key: "${cacheKey}"`,
      );
    }
  } catch (err: any) {
    const message = err?.message ?? String(err);
    console.warn(`[CACHE LOG] Upstash Redis write failed (${message}).`);
    isRedisDisabled = true;
  }
}
