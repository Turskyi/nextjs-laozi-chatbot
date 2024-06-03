import laozi from '@/assets/laozi.png';
import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { Bot } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { APP_NAME, CHAT_NAME } from '../../constants';

export const metadata: Metadata = {
  title: `${APP_NAME}`,
};

export default function Home() {
  return (
    <section className="space-y-16 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat px-1 py-8">
      <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <H1 className="text-center sm:text-start">Hi, I&apos;m Laozi 👋</H1>
          <p className="text-center sm:text-start">
            I&apos;m an artificial intelligence representation of a
            semi-legendary ancient Chinese philosopher, author of the Tao Te
            Ching, the foundational text of Daoism along with the Zhuangzi.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={laozi}
            alt="A photo of Laozi"
            height={300}
            width={300}
            className="aspect-square rounded-full object-cover shadow-none dark:border-foreground"
          />
        </div>
      </section>
      <section className="space-y-3 text-center">
        <H2>Ask {CHAT_NAME} anything about Daoizm</H2>
        <p>
          Click the little <Bot className="inline pb-1" /> icon in the top bar
          to activate the AI chat. You can ask the chatbot any question about
          Daoizm and it will find the relevant info.
        </p>
      </section>
    </section>
  );
}
