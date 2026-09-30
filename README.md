[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)
![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=laozi-chatbot&style=plastic)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Turskyi/nextjs-laozi-chatbot)
[![wakatime](https://wakatime.com/badge/user/f9df5074-b4ea-4c17-b001-fff428ab82aa/project/f0ebddc4-8710-4281-967c-ffdc3055cf85.svg)](https://wakatime.com/badge/user/f9df5074-b4ea-4c17-b001-fff428ab82aa/project/f0ebddc4-8710-4281-967c-ffdc3055cf85)
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Turskyi/nextjs-laozi-chatbot">

# Daoism • Laozi AI (Web Version)

This project is a web-based chatbot application that leverages the wisdom of
Laozi and Daoist teachings to provide users with guidance and insights. It is
built using Next.js and a resilient, triple-provider fallback system using \*
\*Groq**, **Mistral**, and **Gemini\*\*.

## AI Infrastructure and Fallback System

The application is designed for maximum reliability and cost-efficiency using a
tiered fallback mechanism:

1. **Groq (Primary):** Uses `qwen/qwen3.6-27b` for lightning-fast
   responses.
2. **Mistral (Secondary):** Falls back to `mistral-small-latest` if Groq is
   unavailable.
3. **Gemini (Tertiary):** Uses `gemini-3.5-flash-lite` as the final safety
   layer.

This architecture ensures that the chatbot remains responsive even if multiple
AI providers experience downtime.

## Data Storage, Caching, and In-Context Site Knowledge

- **Upstash Redis:** Used to cache AI model responses, accelerating load times
  and reducing redundant API calls.
- **In-Context Website & Manuscript Knowledge Base:** Rather than relying on a
  complex external vector database for small site datasets, the system directly
  injects a structured directory of all website routes, 18 Dunhuang manuscript
  pages, chapter mappings (Chapters 1–81), and manuscript histories into system
  prompts (`src/lib/ai/prompts.ts`). This allows the chatbot to instantly and
  deterministically answer questions about site pages, chapters, and manuscripts
  with zero vector search latency.
- **AstraDB (Legacy/Inactive):** Originally used for Retrieval-Augmented
  Generation (RAG) to store vector embeddings of scraped site pages.

> [!NOTE]
> **Why Vector DB (RAG) was Removed from `scripts/generate.ts`
and `src/lib/astradb.ts`:**
> 1. **Direct In-Context Knowledge vs. Chunked Vector Search**: The static site
     content (About, FAQ, and 18 manuscript pages) is compact (~50 KB). Modern
     LLMs (Qwen, Mistral, Gemini) feature large context windows (128k+ tokens).
     Injecting structured page/chapter mappings into system prompts delivers
     100% accurate context without chunking loss or vector lookup latency.
> 2. **Multi-Provider Fallback Flexibility**: The app uses a multi-provider
     fallback system (Groq -> OpenRouter -> Mistral -> Gemini). Different
     embedding models use conflicting vector dimensions (768 for Gemini vs. 1536
     for OpenAI), making a single vector database index vendor-locked.
> 3. **Nuanced Multi-Translation Support**: Daodejing translations vary
     significantly. Restricting responses to a single vector database
     translation limits depth, whereas in-context prompts combined with the
     LLM's pre-trained knowledge allow for multi-translation comparative
     insights.
> 4. **Infrastructure Reliability**: Eliminating vector DB calls removes extra
     network roundtrips and avoids production outages if database credentials
     expire or hibernate.
>
> **AstraDB Credentials & Web Console Access:**
> - **Do you need AstraDB Web Console access?** No, if your `.env.local`
    contains valid credentials (`ASTRA_DB_APPLICATION_TOKEN` and
    `ASTRA_DB_API_ENDPOINT`), the AstraDB client connects programmatically via
    API HTTP requests without needing web console login.
> - **Inactivity Note:** Free-tier AstraDB databases may hibernate or be deleted
    after prolonged inactivity (1–3 months). If API calls fail with 401/404, you
    can create a new database.
> - **How to create a new AstraDB database if needed:**
    >
1. Sign up at [https://astra.datastax.com](https://astra.datastax.com).
>   2. Choose **Serverless (Vector)**.
>   3. Set Database Name: `laozi_chatbot_db` (or `daoism_vectors`).
>   4. Choose Region (e.g. AWS `us-east-1` or `eu-central-1`) and Keyspace:
       `default_keyspace`.
>   5. Select Collection Vector Dimension: `768` (for Gemini
       `text-embedding-004`) or `1536` (for OpenAI).
>
> **How to restore `src/lib/astradb.ts` and Vector RAG:**
>
> 1. Create `src/lib/astradb.ts`:
> ```typescript
> import { DataAPIClient } from '@datastax/astra-db-ts';
>
> const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
> const endpoint = process.env.ASTRA_DB_API_ENDPOINT;
>
> if (!token || !endpoint) {
>   throw new Error('AstraDB environment variables are missing.');
> }

> const client = new DataAPIClient(token);
> export const db = client.db(endpoint);
> ```
> 2. Update `scripts/generate.ts` to generate embeddings using `getGeminiEmbedding` from `src/lib/ai/gemini.ts` and upload chunks to your AstraDB collection.
> 3. Update `src/lib/ai.ts` to perform similarity search before generating chat responses.

## Getting Started

### 1. Prerequisites:

- Node.js and npm (or yarn) installed on your system.
- API Keys for Groq, Mistral, and Gemini.

### 2. Clone the repository:

```bash
git clone https://github.com/Turskyi/nextjs-laozi-chatbot.git
```

### 3. Install dependencies:

```bash
cd nextjs-laozi-chatbot
npm install
```

### 4. Configure Environment Variables:

Create a `.env.local` file with the following:

- `GROQ_API_KEY`
- `MISTRAL_API_KEY`
- `GEMINI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Website:

Visit the [Daoism • Laozi AI](https://daoismonline.com) to experience the
interactive chatbot.

## Tech Stack:

- **Frontend:** Next.js 14, React, Tailwind CSS, DaisyUI.
- **AI Orchestration:** Vercel AI SDK.
- **Providers:** Groq, Mistral, Google Gemini.
- **Database/Cache:** Upstash Redis (AstraDB for vector storage - currently
  legacy).

## Credits

This project was originally inspired by the
[SMART Portfolio Website tutorial](https://youtu.be/1LZltsK5nKI?si=wdvbyJh6RZLzFaxK)
by [Coding in Flow](https://github.com/codinginflow). It has since been heavily
refactored into a resilient multi-provider AI system.
