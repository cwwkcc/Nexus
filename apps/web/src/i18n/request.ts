// apps/web/src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import fs from 'fs';
import path from 'path';

async function loadMessages(locale: string) {
  const messagesDir = path.join(process.cwd(), 'messages', locale);
  const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith('.json'));
  let allMessages = {};
  for (const file of files) {
    const filePath = path.join(messagesDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allMessages = { ...allMessages, ...content };
  }
  return allMessages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'en' | 'si' | 'ta')) {
    locale = routing.defaultLocale;
  }
  const messages = await loadMessages(locale);
  return {
    locale,
    messages,
  };
});
