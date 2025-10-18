import yinyang from '@/assets/yinyang.png';
import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { Metadata } from 'next';
import Image from 'next/image';
import { DOMAIN } from '../../../constants';

export const metadata: Metadata = {
  title: 'About Daoism and Laozi Chatbot',
  description: 'Learn more about Daoism and the wisdom of Laozi.',
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>About Daoism and Laozi Chatbot</H1>
      <section className="space-y-3">
        <H2>Welcome to Daoizm.online!</H2>
        <p>
          {DOMAIN} is a website dedicated to exploring the wisdom of Daoism and
          the teachings of Laozi. Through this platform, you can interact with
          an AI representation of Laozi, ask questions about Daoist philosophy,
          and gain insights into the profound teachings of the Tao Te Ching.
        </p>
        <p>
          Laozi, the legendary founder of Daoism, authored the Tao Te Ching, a
          foundational text that emphasizes living in harmony with the Dao (the
          Way). This chatbot allows you to access the wisdom of the Tao Te Ching
          in a unique way – simply ask Laozi to send it to you chapter by
          chapter, and delve deeper into its timeless teachings.
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>The Philosophy of Daoism</H2>
        <p>
          Daoism is an ancient Chinese philosophy that advocates living in
          harmony with the Dao (the Way), which is the source and guiding
          principle of everything in the universe. It teaches the virtues of
          compassion, frugality, and humility, encouraging followers to embrace
          wu wei (non-action or effortless action), naturalness, and simplicity.
        </p>
        <p>
          Laozi said: &quot;Everyone desires something, but it seems I need
          nothing. My mind is like that of a fool. Oh! How empty! Everyone
          shines with abilities, but I am like a fool. I float in the sea of
          life and do not know where I will stop.&quot;
        </p>
        <p>
          The more skill and cunning people have, the more abnormal phenomena
          arise. The more decrees and orders are issued, the more thieves and
          robbers appear.
        </p>
        <p>
          Laozi is considered one of the founders of Daoism. His teachings have
          had a significant impact on Chinese philosophy and culture. In the Dao
          De Jing, Laozi advocates the path of the Dao, harmony with nature and
          the universe, and the necessity of returning to naturalness and
          simplicity.
        </p>
        <p>
          The core principles of Daoism include:
          <li>
            The principle of Wu-wei (non-action) - non-violent intervention in
            the natural order of things.
          </li>
          <li>
            Following natural rhythms and harmony with the surrounding world.
          </li>
          <li>Self-improvement and striving for spiritual wisdom.</li>
        </p>
        <p>
          Daoism encompasses many practices aimed at maintaining health,
          balance, and spiritual growth. These practices include meditation,
          breathing exercises, and various martial arts such as Tai Chi and
          Qigong.
        </p>
        <div className="flex justify-center animate-fadeIn">
          <Image
            src={yinyang}
            alt="An artistic representation of the Daoist concept of Yin and Yang, 
          symbolizing balance and harmony."
            className="aspect-square rounded-full object-cover shadow-inherit transition-transform duration-300 hover:scale-105 dark:border-foreground"
          />
        </div>
      </section>
    </section>
  );
}
