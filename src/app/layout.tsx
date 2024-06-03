import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { APP_NAME, CHAT_NAME } from '../../constants';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

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
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Navbar />
          <main className="max-w-3xl mx-auto py-10 px-3">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
