import { webFontVariables } from '@nexus/config/fonts';
import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { cn, AnnouncementBanner, BackToTopButton } from '@nexus/ui';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Footer } from '../../components/layout/Footer';
import { routing } from '../../i18n/routing';
import { getActiveAnnouncement } from '../../server/announcements';

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
  // F-031/Task 6.10: "the public site renders an AnnouncementBanner at
  // the top of every page when an active announcement exists" — wired
  // here in the shared locale layout rather than per-page, so it's
  // genuinely site-wide, not just on the home page (F-141's own home-page
  // section list also mentions it, but that's this same banner, not a
  // second, page-specific one).
  const announcement = await getActiveAnnouncement(safeLocale);

  return (
    <html lang={locale}>
      <body className={cn('min-w-size-64', webFontVariables.join(' '))}>
        {announcement && (
          <AnnouncementBanner variant={announcement.variant} dismissible>
            {announcement.message}
            {announcement.linkLabel && announcement.linkHref && (
              <>
                {' '}
                <a href={announcement.linkHref} className="underline underline-offset-2">
                  {announcement.linkLabel}
                </a>
              </>
            )}
          </AnnouncementBanner>
        )}
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <BackToTopButton />
        <Footer locale={safeLocale} />
      </body>
    </html>
  );
}
