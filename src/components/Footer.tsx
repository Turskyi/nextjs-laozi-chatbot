import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '../../constants';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 p-3 md:flex-row md:justify-evenly">
      <nav className="flex gap-3">
        <Link href="/privacy">Privacy</Link>
      </nav>
      <nav className="flex gap-3">
        <Link href="/support">Support</Link>
      </nav>
      <div className="flex flex-col items-center md:flex-row md:items-center">
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
            letterSpacing: '0.02em',
            color: 'inherit',
          }}
        >
          Download the {APP_NAME}® App
        </span>
        <a
          href="https://play.google.com/store/apps/details?id=com.turskyi.laozi_ai"
          target="_blank"
          style={{ marginLeft: 10 }}
        >
          <Image
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Get it on Google Play"
            width={240}
            height={80}
          />
        </a>
        <a
          href="https://apps.apple.com/app/id6743682937"
          target="_blank"
          style={{ marginLeft: 10 }}
        >
          <Image
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
            alt="Download on the App Store"
            width={200}
            height={48}
          />
        </a>
      </div>
    </footer>
  );
}
