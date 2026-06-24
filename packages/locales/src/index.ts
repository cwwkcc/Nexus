import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.join(__dirname, 'messages');

// Keep in sync with apps/web/src/i18n/routing.ts
export const SUPPORTED_LOCALES = ['en', 'si', 'ta'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Load all message JSON files for a given locale and flatten them into a single object.
 * This is used by next-intl's `getRequestConfig`.
 */
export function loadMessages(locale: Locale): Record<string, string> {
  const localeDir = path.join(MESSAGES_DIR, locale);
  if (!fs.existsSync(localeDir)) {
    return loadMessages('en');
  }

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));
  let allMessages: Record<string, unknown> = {};

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // Merge the top-level keys (e.g., common, navigation, home, etc.)
    allMessages = { ...allMessages, ...content };
  }

  // We return a flat object – keys are e.g., "common.metadata.title"
  // But next-intl also accepts nested objects, so we can keep it nested if we want.
  // To keep it exactly as before (flat keys), we flatten:
  const flattened: Record<string, string> = {};
  for (const [namespace, obj] of Object.entries(allMessages)) {
    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(
        obj as Record<string, unknown>,
      )) {
        flattened[`${namespace}.${key}`] =
          typeof value === 'string' ? value : JSON.stringify(value);
      }
    } else {
      // If the top-level is a primitive (shouldn't happen), just assign it.
      flattened[namespace] = String(obj);
    }
  }
  return flattened;
}
