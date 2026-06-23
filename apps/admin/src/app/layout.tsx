import './global.css';
import Link from 'next/link';
import { cn } from '@nexus/ui';
import { BackToTopButton } from '@nexus/ui';
import {
  Cormorant_Garamond,
  Cormorant_Upright,
  Inter,
  IBM_Plex_Mono,
  Maname,
  Noto_Serif_Sinhala,
  Noto_Serif_Tamil,
} from 'next/font/google';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
});
const cormorantUpright = Cormorant_Upright({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-quote',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
});
const maname = Maname({
  subsets: ['sinhala'],
  weight: ['400'],
  variable: '--font-sinhala-display',
});
const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '500', '600'],
  variable: '--font-sinhala-body',
});
const notoSerifTamilDisplay = Noto_Serif_Tamil({
  subsets: ['tamil'],
  weight: ['500', '600'],
  variable: '--font-tamil-display',
});
const notoSerifTamilBody = Noto_Serif_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500'],
  variable: '--font-tamil-body',
});

export const metadata = {
  title: 'Nexus Admin',
  description: 'Admin panel for Nexus',
};

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/page-content', label: 'Page Content' },
  { href: '/page-config', label: 'Page Config' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-w-size-64 bg-slate-950 text-slate-100',
          cormorantGaramond.variable,
          cormorantUpright.variable,
          inter.variable,
          ibmPlexMono.variable,
          maname.variable,
          notoSerifSinhala.variable,
          notoSerifTamilDisplay.variable,
          notoSerifTamilBody.variable,
        )}
      >
        <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
          <aside className="border-slate-800 border-b border-r bg-slate-900 px-6 py-8 lg:border-b-0">
            <div className="mb-10">
              <Link href="/" className="font-semibold text-xl text-white">
                Nexus Admin
              </Link>
              <p className="mt-2 text-sm text-slate-400">
                Content management and analytics.
              </p>
            </div>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="px-6 py-8">{children}</main>
        </div>
        <BackToTopButton />
      </body>
    </html>
  );
}
