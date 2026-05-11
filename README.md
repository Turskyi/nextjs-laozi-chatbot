[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)
![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=laozi-chatbot&style=plastic)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Turskyi/nextjs-laozi-chatbot)
[![wakatime](https://wakatime.com/badge/user/f9df5074-b4ea-4c17-b001-fff428ab82aa/project/f0ebddc4-8710-4281-967c-ffdc3055cf85.svg)](https://wakatime.com/badge/user/f9df5074-b4ea-4c17-b001-fff428ab82aa/project/f0ebddc4-8710-4281-967c-ffdc3055cf85)
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Turskyi/nextjs-laozi-chatbot">

# Daoism • Laozi AI (Web Version)

This project is a web-based chatbot application that leverages the wisdom of
Laozi and Daoist teachings to provide users with guidance and insights. It is
built using Next.js and a resilient, triple-provider fallback system using *
*Groq**, **Mistral**, and **Gemini**.

## AI Infrastructure and Fallback System

The application is designed for maximum reliability and cost-efficiency using a
tiered fallback mechanism:

1. **Groq (Primary):** Uses `llama-3.3-70b-versatile` for lightning-fast
   responses.
2. **Mistral (Secondary):** Falls back to `mistral-small-latest` if Groq is
   unavailable.
3. **Gemini (Tertiary):** Uses `gemini-2.0-flash-lite` as the final safety
   layer.

This architecture ensures that the chatbot remains responsive even if multiple
AI providers experience downtime.

## Data Storage and Caching

- **Upstash Redis:** Used to cache responses from the AI models, improving
  performance and reducing redundant API calls.
- **AstraDB (Legacy/Inactive):** Previously used for Retrieval-Augmented
  Generation (RAG) to store vector embeddings of Daoist texts.

> [!NOTE]
> **RAG Feature Removal:** As of the latest migration, the RAG feature has been
> removed to simplify the architecture and migrate away from tightly coupled AI
> SDKs. The chatbot currently responds based on the broad knowledge of the modern
> AI models.
>
> **How to restore RAG:**
> 1. Re-implement the `src/lib/astradb.ts` utility using the
     `@datastax/astra-db-ts` client.
> 2. Update `scripts/generate.ts` to use the `getGeminiEmbedding` function from
     `src/lib/ai/gemini.ts` (ensuring dimensions match your AstraDB collection,
     e.g., 768 or 1536).
> 3. Refactor `src/lib/ai.ts` to include a retrieval step (similarity search)
     before generating the chat response.

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

Visit the [Daoism • Laozi AI](https://daoizm.online/) to experience the
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
