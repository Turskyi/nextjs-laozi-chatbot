'use client';

import { cn } from '@/lib/utils';
import { Message, useChat } from 'ai/react';
import { BookOpen, Bot, SendHorizontal, Trash, XCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  getManuscriptPage,
  getManuscriptPageContext,
} from '@/data/manuscriptData';
import { API_ENDPOINTS, LOCALES, ROLES } from '../../constants';

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
  apiEndpoint?: string;
  locale?: string;
}

export default function AIChatBox({
  open,
  onClose,
  apiEndpoint = API_ENDPOINTS.CHAT_WEB_EN,
  locale = LOCALES.ENGLISH,
}: AIChatBoxProps) {
  const pathname = usePathname();
  const manuscriptMatch = pathname?.match(/^\/manuscript\/(\d+)$/);
  const pageNumber = manuscriptMatch ? parseInt(manuscriptMatch[1], 10) : null;
  const pageData = pageNumber ? getManuscriptPage(pageNumber) : null;
  const pageContext = pageData ? getManuscriptPageContext(pageData) : null;
  const pageContent = pageData ? pageData.content : null;

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({
    api: apiEndpoint,
    body: {
      locale,
      pageContext: pageContext ?? undefined,
      pageContent: pageContent ?? undefined,
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (error) {
      console.error('AIChatBox error:', error);
    }
  }, [error]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      body: {
        locale,
        pageContext: pageContext ?? undefined,
        pageContent: pageContent ?? undefined,
      },
    });
  };

  return (
    <div
      className={cn(
        'bottom-0 right-0 z-50 w-full max-w-[500px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden',
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} className="rounded-full bg-background" />
      </button>
      <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">
        {pageContext && (
          <div className="flex items-center gap-2 border-b border-border bg-primary/10 px-3.5 py-2 text-xs font-medium text-primary rounded-t">
            <BookOpen size={14} className="flex-none" />
            <span>{pageContext}</span>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-3 pt-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: 'loading',
                role: ROLES.ASSISTANT,
                content: 'Thinking...',
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: 'error',
                role: ROLES.ASSISTANT,
                content: 'Something went wrong. Please try again!',
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <Bot size={28} />
              <p className="text-lg font-medium">
                Send a message to start the chat with Laozi AI!
              </p>
              <p>
                You can ask Laozi Chatbot any question about Daoism and he will
                find the relevant information.
              </p>
            </div>
          )}
        </div>
        <form onSubmit={onFormSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex w-10 flex-none items-center justify-center"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <Trash size={24} />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
            className="grow rounded border bg-background px-3 py-2"
            ref={inputRef}
          />
          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
            disabled={input.length === 0}
            title="Submit message"
          >
            <SendHorizontal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAiMessage = role === ROLES.ASSISTANT;

  return (
    <div
      className={cn(
        'mb-3 flex items-center',
        isAiMessage ? 'me-5 justify-start' : 'ms-5 justify-end',
      )}
    >
      {isAiMessage && <Bot className="mr-2 flex-none" />}
      <div
        className={cn(
          'rounded-md border px-3 py-2',
          isAiMessage ? 'bg-background' : 'bg-foreground text-background',
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ''}
                className="text-primary hover:underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
