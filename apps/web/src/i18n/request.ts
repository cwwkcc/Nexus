// apps/web/src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { loadMessages, SUPPORTED_LOCALES } from '@nexus/locales';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !SUPPORTED_LOCALES.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  const messages = loadMessages(locale as any);
  return { locale, messages };
});
