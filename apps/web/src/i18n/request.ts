// apps/web/src/i18n/request.ts
import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

const NAMESPACES = [] as const;

async function loadMessages(locale: LocaleEnumData) {
  const messages: Record<string, unknown> = {};
  for (const ns of NAMESPACES) {
    try {
      const module = await import(`./messages/${locale}/${ns}.json`);
      messages[ns] = module.default;
    } catch {
      messages[ns] = {};
    }
  }
  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !SUPPORTED_LOCALES.includes(locale as LocaleEnumData)) {
    locale = routing.defaultLocale;
  }
  const messages = await loadMessages(locale as LocaleEnumData);
  return { locale, messages };
});
