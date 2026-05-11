export const APP_NAME = 'Daoism • Laozi AI';
export const APP_NAME_UA = 'Даосизм • чат-бот Лао-цзи';
export const APP_NAME_LV = 'Daoisms • Laodzi MI';
export const CHAT_NAME = 'Laozi Chatbot';

// Expiration Jun 8, 2026 - auto-renew is off
export const DOMAIN = 'daoizm.online';
export const WEBSITE = 'https://' + DOMAIN;
export const AUTHOR = 'Dmytro Turskyi';

// Expiration Jun 8, 2026 - auto-renew is off
export const RESEND_DOMAIN = 'daoizm.online';

//TODO: replace these links
export const FACEBOOK = 'https://www.facebook.com/LaoziPhilosopher';
export const X = 'https://x.com/laozi_daoism';
export const INSTAGRAM = 'https://www.instagram.com/daoism_daily/';
export const YOUTUBE =
  'https://www.youtube.com/playlist?list=PLRv4wM7dLffxB2ru0M4HZmMmgKheqA5Q2';
export const YOUTUBE_SHORTS = 'https://www.youtube.com/@George-Thompson/shorts';

export const API_ENDPOINTS = {
  CHAT: 'api/chat',
  CHAT_ANDROID_EN: 'api/chat-android-en',
  CHAT_ANDROID_UA: 'api/chat-android-ua',
  CHAT_IOS_EN: 'api/chat-ios-en',
  CHAT_IOS_UA: 'api/chat-ios-ua',
  CHAT_UA: 'api/chat-ua',
  CHAT_WEB_APP_EN: ' api/chat-web-app-en',
  CHAT_WEB_APP_UA: 'api/chat-web-app-ua',
  CHAT_WEB_EN: 'api/chat-web-en',
  SEND: 'api/send',
} as const;

export const AI_MODEL_NAMES = {
  GROQ: 'llama-3.3-70b-versatile',
  MISTRAL: 'mistral-small-latest',
  GEMINI: 'gemini-2.0-flash-lite',
} as const;

export const ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

export const MODEL_PROVIDERS = {
  GROQ: 'groq',
  MISTRAL: 'mistral',
  GEMINI: 'gemini',
} as const;

export const TEXT_EMBEDDING_MODELS = {
  GEMINI: 'gemini-embedding-001',
} as const;

export const LOCALES = {
  ENGLISH: 'en',
  UKRAINIAN: 'uk',
  LATVIAN: 'lv',
} as const;

/**
 * Disables retrieval-augmented generation (RAG) for fallback requests.
 *
 * This is set to `false` to avoid "Collection already exists" errors that occur
 * when switching between model providers that use
 * different vector embedding dimensions.
 */
export const USE_RETRIEVAL_FALLBACK = false;
