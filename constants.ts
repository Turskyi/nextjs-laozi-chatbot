export const APP_NAME = 'Daoism - Laozi AI';
export const CHAT_NAME = 'Laozi Chatbot';
export const DOMAIN = 'daoizm.online';
export const WEBSITE = 'https://' + DOMAIN;
export const AUTHOR = 'Dmytro Turskyi';
export const RESEND_DOMAIN = 'kima.website';
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
  GOOGLE: 'gemini-2.5-flash',
  OPENAI: 'gpt-4o-mini',
} as const;

export const ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

export const MODEL_PROVIDERS = {
  GOOGLE: 'google',
  OPENAI: 'openai',
} as const;

export const TEXT_EMBEDDING_MODELS = {
  GOOGLE: 'text-embedding-004',
  OPENAI: 'text-embedding-3-small',
} as const;

export const LOCALES = {
  ENGLISH: 'en',
  UKRAINIAN: 'uk',
  LATVIAN: 'lv',
} as const;
