[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Turskyi/nextjs-laozi-chatbot">

# Daoism - Laozi AI Chatbot (Web Version)

This project is a web-based chatbot application that leverages the wisdom of
Laozi and Daoist teachings to provide users with guidance and insights. It is
built using Next.js, a popular React framework, TypeScript for enhanced type
safety and maintainability, and bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Data Storage and Caching

This application utilizes two main technologies for data storage and caching:

- **AstraDB:** We leverage AstraDB, a NoSQL database service from DataStax, to
  store vector embeddings of text data. These embeddings enable efficient
  comparison and retrieval of similar information, allowing the AI model to
  provide relevant responses to user queries. You can learn more about AstraDB
  at
  [https://docs.datastax.com/en/astra-db-serverless/index.html](https://docs.datastax.com/en/astra-db-serverless/index.html)
  .
- **Please note:** We do not share any sensitive AstraDB credentials in this
  documentation for security reasons.
- **Upstash Redis:** Upstash Redis, a managed Redis service, is used to cache
  responses from the AI model. This caching mechanism significantly improves
  application performance by avoiding redundant calls to the model for
  previously generated responses. Upstash Redis stores these cached responses,
  allowing for faster retrieval when similar user queries are encountered. You
  can find more information about Upstash Redis at
  [https://upstash.com/docs/redis/overall/getstarted](https://upstash.com/docs/redis/overall/getstarted)
  .
- **Security Note:** Similar to AstraDB, we avoid sharing access credentials
  for Upstash Redis in this documentation.

## Local Development and Data Reset

When running the application locally, the vector embeddings might be stored in
a separate AstraDB collection compared to the production environment. This is
a common practice to isolate development data and prevent conflicts.

To reset the local vector embedding collection during development, you can run
the command `npm run generate`. This script triggers a process that
deletes the existing collection in local AstraDB instance and generates a
new one, by populating it with fresh embeddings.

## Getting Started

### 1. Prerequisites:

- Node.js and npm (or yarn) installed on your system.
- Basic understanding of Next.js and TypeScript concepts is recommended.

### 2. Clone the repository:

```bash
git clone https://github.com/Turskyi/nextjs-laozi-chatbot.git
```

### 3. Install dependencies:

```bash
cd Daoism-Laozi-AI-Web
npm install  # or yarn install
npm i langchain @langchain/google-genai ai clsx tailwind-merge ts-node dotenv lucide-react next-themes react-markdown @datastax/astra-db-ts @upstash/redis
```

### 4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Website:

Visit the [Daoism - Laozi AI Chatbot](https://daoizm.online/) to experience the
interactive chatbot and explore Daoist teachings.

## Features:

- Engaging conversation with a Laozi-inspired AI chatbot.
- Access to key Daoist teachings and philosophies.
- Modern and user-friendly web interface.

## Tech Stack:

- [Next.js](https://nextjs.org/): A React framework for building full-stack web
  applications.
- **Programming language**: [TypeScript](https://www.typescriptlang.org);
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom
  designs.
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
  automatically optimize and load Inter, a custom Google Font.
- **Version control system**: [Git](https://git-scm.com);
- **Git Hosting Service**: [GitHub](https://github.com);
- **CI/CD**: [Vercel](https://vercel.com/features/previews) is used to
  deliver the new releases to the production environment after every push to the
  **master** branch;
- **Architectural pattern** :
  [Monolith](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#all-in-one-applications);
- **Code Readability:** code is easily readable with no unnecessary blank lines,
  no unused variables or methods, and no commented-out code, all variables,
  methods, and resource IDs are descriptively named such that another developer
  reading the code can easily understand their function.

## Project Structure:

```text
Daoism-Laozi-AI-Web/
├── public/       # Static assets (images, fonts, etc.)
│   └── ...
└── src/           # Project source code
    ├── app/        # Application pages
    │   ├── about/   # About page content
    │   │   └── ...
    │   ├── privacy/  # Privacy policy content
    │   │   └── ...
    │   └── social/   # Social channels content
    │       └── ...
    ├── assets/      # Application-specific assets (images, etc.)
    │   └── ...
    ├── components/  # Reusable UI components
    │   └── ui/        # UI component subfolder
    │       └── ...
    ├── lib/         # Custom logic or utility functions
    │   └── ...
    ├── constants.ts # Application-wide constants
    └── README.md    # Project documentation
```

## Scripts:

- `npm run dev` (or `yarn dev`): Starts the development server.
- `npm run build` (or `yarn build`): Creates an optimized production build.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment:

This project can be deployed to any platform that supports Next.js applications.
Refer to the Next.js documentation for deployment instructions:
https://nextjs.org/docs/pages/building-your-application/deploying
The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

## Contributing

We welcome contributions! Fork this repository, make your enhancements, and
submit a pull request.

## Contact:

For any questions or feedback, please feel free to create an issue in this
repository.
