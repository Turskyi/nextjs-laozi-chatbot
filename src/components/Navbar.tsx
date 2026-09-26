import Link from 'next/link';
import AIChatButton from './AIChatButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-background z-40 border-b border-border/40">
      <div className="mx-auto flex max-w-5xl w-full flex-wrap justify-between gap-3 px-4 py-4">
        <nav className="space-x-4 font-medium">
          <Link href="/">home</Link>
          <Link href="/about">about</Link>
          <Link href="/manuscript">manuscript</Link>
          <Link href="/social">social media</Link>
          <Link href="/faq">faq</Link>
        </nav>
        <div className="flex items-center gap-4">
          <AIChatButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
