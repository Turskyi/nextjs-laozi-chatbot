import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getGeminiResponse(messages: any[]) {
  // Separate system message from the rest of the history
  const systemMessage = messages.find((m) => m.role === 'system')?.content;
  const otherMessages = messages.filter((m) => m.role !== 'system');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite',
    systemInstruction: systemMessage,
  });

  // Convert remaining messages to Gemini format (starting with 'user')
  const history = otherMessages.slice(0, -1).map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({
    history,
  });

  const lastMessage = otherMessages[otherMessages.length - 1].content;
  return await chat.sendMessageStream(lastMessage);
}

export async function getGeminiEmbedding(text: string, targetDimension: number = 1536) {
  const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
  const result = await model.embedContent(text);
  const embedding = result.embedding.values;

  if (embedding.length > targetDimension) {
    return embedding.slice(0, targetDimension);
  }

  if (embedding.length < targetDimension) {
    const padded = new Array(targetDimension).fill(0);
    for (let i = 0; i < embedding.length; i++) {
      padded[i] = embedding[i];
    }
    return padded;
  }

  return embedding;
}
