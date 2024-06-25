import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { Metadata } from 'next';

const CHAT_NAME = 'Laozi Chatbot';

export const metadata: Metadata = {
  title: 'Social Media',
  description: `Connect with us on social media to explore Daoism and chat with ${CHAT_NAME}.`,
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>Social Media</H1>
      <section className="space-y-3">
        <H2>Daoism channels</H2>
        <p>
          Join community on various social platforms to delve into the teachings
          of Daoism and interact with fellow enthusiasts.
        </p>
        <p>Links to some Daoism social accounts:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <a
              href="https://www.facebook.com/LaoziPhilosopher"
              className="text-primary hover:underline"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://x.com/laozi_daoism"
              className="text-primary hover:underline"
            >
              X
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/daoism_daily/"
              className="text-primary hover:underline"
            >
              Instagram
            </a>
          </li>
        </ul>
        <hr className="border-muted" />
      </section>
      <section className="space-y-3">
        <H2>Popular content</H2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <a
              href="https://www.youtube.com/playlist?list=PLRv4wM7dLffxB2ru0M4HZmMmgKheqA5Q2"
              className="text-primary hover:underline"
            >
              Daoism playlist
            </a>{' '}
            - Learn Daoism from zero with some video series. It&apos;s
            enlightening and engaging!
          </li>
          <li>
            <a
              href="https://www.youtube.com/@George-Thompson/shorts"
              className="text-primary hover:underline"
            >
              Daoism shorts playlist
            </a>{' '}
            - Quick insights and animated stories about Daoism. Perfect for a
            dose of wisdom on the go!
          </li>
        </ul>
        <hr className="border-muted" />
      </section>
    </section>
  );
}
