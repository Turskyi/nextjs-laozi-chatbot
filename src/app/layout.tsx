import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { APP_NAME, CHAT_NAME } from '../../constants';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatBoxProvider } from '@/components/ChatBoxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${CHAT_NAME}`,
    default: `${APP_NAME}`,
  },
  description:
    'Converse with a wise AI embodiment of Laozi and explore the depths of Daoist philosophy. Ask questions, receive guidance, and gain insights for a more balanced and fulfilling life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class">
          <ChatBoxProvider>
            <Navbar />
            <main className="flex-grow max-w-3xl mx-auto">{children}</main>
          </ChatBoxProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
