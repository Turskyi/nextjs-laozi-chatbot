import React from 'react';

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why did you create Laozi AI?
        </h2>
        <p className="mb-4">
          Laozi AI was born from a mix of curiosity, reflection, and a desire to
          give thoughtful answers to questions that many people - including
          myself - ask about life, meaning, and belief. Over time, I noticed
          that people around me often found their spiritual direction in
          Christianity, but for me, the texts and traditions of Daoism felt far
          more natural and logical.
        </p>
        <p className="mb-4">
          The real spark for the idea came after watching Mike Flanagan’s
          miniseries &quot;The Fall of the House of Usher&quot;, where I first
          heard about the idea of preserving a person’s identity and wisdom
          through AI. This inspired me to imagine what it would be like if we
          could &quot;revive &quot; Laozi&apos;s wisdom to act as a personal
          tutor, instantly clarifying the abstract and metaphorical concepts of
          the Tao Te Ching for anyone - whether they are a novice or facing
          challenging questions.
        </p>
        <p className="mb-4">
          At first, I considered building a playful app called “Jeez Christ”,
          inspired by the common phrase people say when surprised or frustrated
          - not as a reference to religion, but as a humorous way to make people
          reflect on how they approach big questions. But I realized I wanted to
          create something deeper and more genuine.
        </p>
        <p>
          That’s how Laozi AI came to life: a space for people to explore Daoist
          ideas, reflect on timeless wisdom, and have meaningful dialogue with
          an AI that channels Laozi’s philosophy. It’s not about converting
          anyone - it’s about inviting calm, curiosity, and perspective into a
          world that often feels too fast and too certain.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why are chapter numbers inconsistent?
        </h2>
        <p className="mb-4">
          The inconsistencies in chapter numbering arise because the AI draws on
          multiple sources for the Tao Te Ching, each with its own way of
          dividing and numbering the text. Different translations and editions
          sometimes group verses differently or assign varying numbers to
          chapters.
        </p>
        <p className="mb-4">
          While it might seem logical to restrict the AI to a single,
          authoritative “source of truth,” at this stage we’ve found it more
          beneficial to allow flexibility. Drawing from multiple translations
          and commentaries helps the AI form more nuanced and expanded answers
          that reflect the richness and diversity of Daoist thought.
        </p>
        <p>
          This approach may introduce occasional inconsistencies in chapter
          numbering, but so far it seems to enhance the overall quality and
          depth of responses. Unless we find that this variety causes more
          confusion than clarity, we’ll continue to let the AI explore wisdom
          from more than one source.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Will you add more languages?
        </h2>
        <p className="mb-4">
          The web version currently supports only English, but Ukrainian might
          be added in the future when time allows, as I am currently focused on
          parenting and a full-time job.
        </p>
        <p className="mb-4">
          The mobile version already supports both English and Ukrainian, and
          there are no plans to add more languages because maintaining accuracy
          requires fluency and responsibility for potential language mistakes.
        </p>
        <p>
          In practice, the AI often responds in the same language the user
          writes in, depending on the AI provider, so users might still get
          answers in other languages even if the interface is English.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why did Laozi stop answering in the middle of my question?
        </h2>
        <p className="mb-4">
          Sometimes, Laozi AI will give a shorter response or seem to pause
          before fully addressing your question. This isn’t a mistake - it’s
          designed to keep the conversation natural and readable, just as a real
          person might offer a thought, pause, and wait for your reply.
        </p>
        <p className="mb-4">
          If a response feels cut off or incomplete, simply say{' '}
          <strong>&quot;please continue&quot;</strong>. Laozi AI remembers the
          context of your conversation and will pick up right where it left off.
        </p>
        <p>
          For the most authentic experience, try speaking to Laozi as if you
          were in conversation with a real person. Even the historical Laozi
          wouldn’t answer every question in a single, endless speech - wisdom
          often comes one thought at a time.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why are answers different on web and mobile?
        </h2>
        <p className="mb-4">
          Laozi AI uses different AI setups depending on the platform you are
          using.
        </p>
        <p className="mb-4">
          The web version includes a retrieval system that leverages website
          content to provide more context-aware and detailed answers.
        </p>
        <p>
          On the other hand, the mobile versions rely solely on the AI model’s
          internal knowledge, which can lead to slightly different or more
          conversational responses.
        </p>
      </section>
    </main>
  );
}
