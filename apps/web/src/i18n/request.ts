// apps/web/src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES, type Locale } from '@nexus/validation';

import { routing } from './routing';

// Namespaces actually consumed via useTranslations(). Extend as more
// blocks adopt next-intl message keys.
const NAMESPACES = ['about'] as const;

async function loadMessages(locale: Locale) {
  const modules = await Promise.all(
    NAMESPACES.map((ns) => import(`./messages/${locale}/${ns}.json`)),
  );
  return NAMESPACES.reduce<Record<string, unknown>>((acc, ns, i) => {
    acc[ns] = modules[i].default;
    return acc;
  }, {});
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }
  const messages = await loadMessages(locale as Locale);
  return { locale, messages };
});
