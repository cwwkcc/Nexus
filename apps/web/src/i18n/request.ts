// apps/web/src/i18n/request.ts
import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

async function loadMessages(locale: LocaleEnumData) {
  const messages: Record<string, unknown> = {};
  // Skip loading messages since NAMESPACES is empty
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
