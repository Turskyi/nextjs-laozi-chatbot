import zod from 'zod';

const envSchema = zod.object({
  DOMAIN_URL: zod.string().nonempty(),
  SUPER_ADMIN: zod.string().nonempty(),
  RESEND_API_KEY: zod.string().nonempty(),
  GROQ_API_KEY: zod.string().nonempty(),
  MISTRAL_API_KEY: zod.string().nonempty(),
  GEMINI_API_KEY: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
