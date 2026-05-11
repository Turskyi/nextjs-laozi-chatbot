import { Mistral } from '@mistralai/mistralai';

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function getMistralResponse(messages: any[]) {
  const stream = await mistral.chat.stream({
    model: 'mistral-small-latest',
    messages,
  });

  // Convert the Mistral SDK stream into a standard Response-like object
  // that OpenAIStream can recognize and parse.
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        // Map Mistral chunk to OpenAI-compatible chunk format
        const openAIChunk = {
          id: (chunk as any).data?.id,
          object: 'chat.completion.chunk',
          created: (chunk as any).data?.created,
          model: (chunk as any).data?.model,
          choices: (chunk as any).data?.choices?.map((c: any) => ({
            index: c.index,
            delta: {
              content: c.delta?.content,
              role: c.delta?.role,
            },
            finish_reason: c.finishReason,
          })),
        };

        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(openAIChunk)}\n\n`));
      }
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readableStream);
}
