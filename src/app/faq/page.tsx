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


      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why do the manuscripts never say &apos;Tao Te Ching&apos;?
        </h2>
        <p className="mb-4">
          &quot;Tao Te Ching&quot; and &quot;Daodejing&quot; are the same book and
          the same Chinese characters (道德經). The difference is only the
          romanization system: &quot;Tao Te Ching&quot; is the older Wade-Giles
          spelling long used in the West, while &quot;Daodejing&quot; is modern
          Hanyu Pinyin (where Tao = Dao, meaning the Way; Te = De, meaning
          virtue; and Ching = Jing, meaning classic).
        </p>
        <p className="mb-4">
          The Dunhuang manuscripts never use the combined title &quot;Tao Te
          Ching&quot; or &quot;Daodejing&quot;. They name the two parts separately,
          attributed to Laozi: 老子道經上 (&quot;Laozi&apos;s Daojing - Upper
          Part&quot;) and 老子德經下 (&quot;Laozi&apos;s Dejing - Lower Part&quot;).
          The combined title 道德經, literally &quot;Classic of Dao and De&quot;,
          is a later editorial convention for the two parts bound as one book.
        </p>
        <p>
          So when the site greeting says &quot;Tao Te Ching&quot; and the
          manuscript notes say &quot;Daodejing&quot;, both mean the same text,
          and the English translation matches the manuscript content chapter
          by chapter—only the title naming differs.
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
          {' '}
          Can I ask Laozi to clarify or rephrase his response?
        </h2>
        <p className="mb-4">
          Absolutely! You can interact with Laozi AI just as you would with a
          real person. If an answer feels unclear, too complex, or doesn&apos;t
          quite resonate with you, simply ask for a rephrase or clarification in
          your next message.
        </p>
        <p>
          Try saying things like:{' '}
          <strong>&quot;Can you explain that more simply?&quot;</strong>,{' '}
          <strong>
            &quot;I don&apos;t quite understand, can you put it
            differently?&quot;
          </strong>
          , or{' '}
          <strong>
            &quot;Could you approach this from a different angle?&quot;
          </strong>
          . This conversational back-and-forth often leads to insights that the
          original answer didn&apos;t capture. Even the historical Laozi would
          have engaged in dialogue with his students - asking for clarification
          is a sign of genuine curiosity and engagement.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          {' '}
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
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why did I get an error or timeout after waiting?
        </h2>
        <p className="mb-4">
          Occasionally, Laozi AI may return an error or stop responding after
          about 10 seconds. This happens because the system is designed to
          emulate natural human conversation - not lengthy computations.
        </p>
        <p className="mb-4">
          If this occurs, try simplifying your question or rephrasing it. This
          helps keep the dialogue flowing smoothly and ensures the AI can
          respond effectively.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Are my conversations saved?
        </h2>
        <p className="mb-4">
          No, the app doesn’t currently save your past chat sessions. This is a
          complex feature to build, and there are no immediate plans to add it.
        </p>
        <p>
          On the positive side, this ensures that every conversation is
          completely private. You can ask anything you like, and there’s
          absolutely no way for me (or anyone else) to see or store your chats.
          This offers a level of freedom and anonymity that isn’t possible with
          apps that require accounts to sync conversations.
        </p>
      </section>
    </main>
  );
}
