import dotenv from 'dotenv';
// Configure dotenv before other imports.
dotenv.config({ path: '.env.local' });
import { DocumentInterface } from '@langchain/core/documents';
import { Redis } from '@upstash/redis';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import {
  getEmbeddingsCollection,
  getGoogleVectorStore,
  getOpenAiVectorStore,
} from '../src/lib/astradb';

async function generateEmbeddings() {
  // When we generate new vector embeddings we also want to clear the cache,
  // because the information on the website might have changed.
  await Redis.fromEnv().flushdb();

  // Prepare data once
  const loader = new DirectoryLoader(
    'src/app/',
    {
      // This will load `tsx` file as a string.
      '.tsx': (path) => new TextLoader(path),
    },
    // Recursive boolean decides if we load nested folders, we pass `true`,
    // because we might have nested routes.
    true,
  );

  // This loader will load files that we set up above.
  const docs = (await loader.load())
    // We want only the content from `page.tsx` files.
    .filter((doc) => doc.metadata.source.endsWith('page.tsx'))
    .map((doc): DocumentInterface => {
      const url =
        doc.metadata.source
          // This replaces backward slashes with forward slashes.
          .replace(/\\/g, '/')
          // We want to throw away the first part and take the second part.
          .split('/src/app')[1]
          // We want the first element, that located before the split part.
          // Home page does not have a `page` in the path, so we handle this
          // case too, by splitting by `/`.
          .split('/page.')[0] || '/';

      // Get rid of not relevant text.
      const pageContentTrimmed = doc.pageContent
        // Remove all import statements.
        .replace(/^import.*$/gm, '')
        // Remove all className props.
        .replace(/ className=(["']).*?\1| className={.*?}/g, '')
        // Remove empty lines.
        .replace(/^\s*[\r]/gm, '')
        .trim();
      return { pageContent: pageContentTrimmed, metadata: { url } };
    });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage('html');
  const splitDocs = await splitter.splitDocuments(docs);

  // Try Google first, fallback to OpenAI.
  try {
    console.log('Generating embeddings using Google...');
    const googleVectorStore = await getGoogleVectorStore();
    // It is important to call `await getGoogleVectorStore` before
    // `getEmbeddingsCollection`, because `getGoogleVectorStore` internally
    // initializes this collection if it does not already exist.
    (await getEmbeddingsCollection()).deleteMany({});
    await googleVectorStore.addDocuments(splitDocs);
    console.log('✅ Google embeddings generated successfully.');
  } catch (error) {
    console.error('❌ Google embedding generation failed:', error);
    console.log('⚙️ Falling back to OpenAI...');
    const openAiVectorStore = await getOpenAiVectorStore();
    // It is important to call `await getOpenAiVectorStore` before
    // `getEmbeddingsCollection`, because `getOpenAiVectorStore` internally
    // initializes this collection if it does not already exist.
    (await getEmbeddingsCollection()).deleteMany({});
    await openAiVectorStore.addDocuments(splitDocs);
    console.log('✅ OpenAI embeddings generated successfully.');
  }
}

generateEmbeddings();
