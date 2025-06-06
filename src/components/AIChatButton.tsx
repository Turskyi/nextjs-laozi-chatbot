'use client';

import { Bot } from 'lucide-react';
import AIChatBox from './AIChatBox';
import { useChatBox } from './ChatBoxProvider';

export default function AIChatButton() {
  const { open, setOpen } = useChatBox();

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Bot className="inline pb-1 animate-wave" size={24} />
      </button>
      <AIChatBox open={open} onClose={() => setOpen(false)} />
    </>
  );
}
