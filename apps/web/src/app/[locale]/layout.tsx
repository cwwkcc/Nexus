import { cn, Footer, BackToTopButton } from '@nexus/ui';
import {
  Cormorant_Garamond,
  Cormorant_Upright,
  Inter,
  IBM_Plex_Mono,
  Maname,
  Noto_Serif_Sinhala,
  Noto_Serif_Tamil,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';

import { routing } from '../../i18n/routing';

import '../global.css';

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'si' | 'ta')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn(
          'min-w-size-64',
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
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  );
}
