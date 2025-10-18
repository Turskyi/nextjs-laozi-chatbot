'use client';
import laozi from '@/assets/laozi.png';
import AIChatBox from '@/components/AIChatBox';
import { useChatBox } from '@/components/ChatBoxProvider';
import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { Bot } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';

const CHAT_NAME = 'Laozi Chatbot';

export default function Home() {
  const { open, setOpen } = useChatBox();
  return (
    <>
      <section className="space-y-16 bg-cover bg-center bg-no-repeat px-4 py-12 sm:py-12 lg:py-32 dark:bg-[url('/dark.png')] bg-[url('/background.png')]">
        <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="space-y-3 animate-fadeInUp">
            <H1 className="text-center sm:text-start">
              Greetings, I am Laozi&nbsp;{' '}
              <span role="img" aria-label="Laozi">
                老子
              </span>
            </H1>
            <p className="text-center text-lg sm:text-start">
              As an AI embodiment of the ancient philosopher, I carry the
              essence of the Tao Te Ching. Let&apos;s explore the path of Daoism
              together.
            </p>
          </div>
          <div className="flex justify-center animate-fadeIn">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="p-0 m-0 bg-transparent border-none cursor-pointer"
              aria-label="Open chat"
            >
              <Image
                src={laozi}
                alt="An image of Laozi"
                height={300}
                width={300}
                className="aspect-square rounded-full object-cover shadow-none transition-transform duration-300 hover:scale-105 dark:border-foreground"
              />
            </button>
          </div>
        </section>
        <section className="space-y-3 text-center animate-fadeInUp">
          <H2>Ask {CHAT_NAME} anything about Daoism</H2>
          <p className="text-lg">
            To begin our dialogue click the little{' '}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline p-0 m-0 bg-transparent border-none align-baseline"
              aria-label="Open chat"
            >
              <Bot className="inline pb-1 cursor-pointer" />
            </button>{' '}
            icon in the top bar. Inquire about any aspect of Daoism, and I shall
            provide the insights you seek.
          </p>
        </section>
      </section>
      <AIChatBox open={open} onClose={() => setOpen(false)} />
    </>
  );
}
