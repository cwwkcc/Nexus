import { webFontVariables } from '@nexus/config/fonts';
import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { cn, BackToTopButton } from '@nexus/ui';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Footer } from '../../components/layout/Footer';
import { routing } from '../../i18n/routing';

import '../global.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale: LocaleEnumData = SUPPORTED_LOCALES.includes(locale as LocaleEnumData) ? (locale as LocaleEnumData) : 'en';
  if (!routing.locales.includes(locale as 'en' | 'si' | 'ta')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn('min-w-size-64', webFontVariables.join(' '))}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <BackToTopButton />
        <Footer locale={safeLocale} />
      </body>
    </html>
  );
}
