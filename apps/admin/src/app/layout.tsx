// apps/admin/src/app/layout.tsx
//
// Root layout for the admin panel.
// Nav links updated to reflect the new /content routing structure.

import './global.css';
import { cn, BackToTopButton } from '@nexus/ui';
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

// const navLinks = [
//   { href: '/', label: 'Dashboard' },
//   { href: '/content', label: 'Content' },
//   // Future nav items:
//   // { href: '/settings', label: 'Site Settings' },
//   // { href: '/global', label: 'Global Content' },
// ];

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
        {children}

        <BackToTopButton />
      </body>
    </html>
  );
}
