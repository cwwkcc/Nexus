import type { Locale } from '@nexus/contracts';
import { cn, Footer, Navigation, BackToTopButton } from '@nexus/ui';
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

import { routing } from '../../i18n/routing';
import {
  getFooterContent,
  getNavigationContent,
} from '../../server/global-content';

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
  preload: false,
});
const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '500', '600'],
  variable: '--font-sinhala-body',
  preload: false,
});
const notoSerifTamilDisplay = Noto_Serif_Tamil({
  subsets: ['tamil'],
  weight: ['500', '600'],
  variable: '--font-tamil-display',
  preload: false,
});
const notoSerifTamilBody = Noto_Serif_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500'],
  variable: '--font-tamil-body',
  preload: false,
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

  // Global chrome content (nav + footer) now comes from ContentEntry
  // (scope 'global:navigation' / 'global:footer') instead of living only
  // as hardcoded defaults in @nexus/ui. If the DB has no published row yet
  // (e.g. seed hasn't run), these resolve to `null` and the components
  // below fall back to their own built-in defaults.
  const [navigation, footer] = await Promise.all([
    getNavigationContent(locale as Locale),
    getFooterContent(locale as Locale),
  ]);

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
          <Navigation
            variant="transparent-overlay"
            locale={locale}
            links={navigation?.links ?? undefined}
          />
          {children}
        </NextIntlClientProvider>
        <BackToTopButton />
        <Footer
          schoolName={footer?.schoolName}
          tagline={footer?.tagline}
          contactLines={footer?.contactLines}
          columns={footer?.columns}
          socialLinks={footer?.socialLinks}
          copyright={footer?.copyright}
          legalLinks={footer?.legalLinks}
        />
      </body>
    </html>
  );
}
