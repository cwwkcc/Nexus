import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import '../global.css';
import {
  Cormorant_Garamond,
  Cormorant_Upright,
  Inter,
  IBM_Plex_Mono,
  Maname,
  Noto_Serif_Sinhala,
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
        className={`min-w-size-96 ${cormorantGaramond.variable} ${cormorantUpright.variable} ${inter.variable} ${ibmPlexMono.variable} ${maname.variable} ${notoSerifSinhala.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
