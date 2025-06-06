'use client';
import { createContext, useContext, useState } from 'react';

const ChatBoxContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

export function ChatBoxProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ChatBoxContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatBoxContext.Provider>
  );
}

export function useChatBox() {
  return useContext(ChatBoxContext);
}
