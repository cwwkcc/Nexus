import { z } from 'zod';
// packages/contracts/src/core/common/locale.ts

// Should contain:
//   SUPPORTED_LOCALES  — ['en', 'si', 'ta'] as const
//   Locale             — 'en' | 'si' | 'ta'
//   LocaleSchema       — z.enum(['en', 'si', 'ta'])
//   DEFAULT_LOCALE     — 'en'
//   LOCALE_LABELS      — Record<Locale, string> for admin UI display

export const SUPPORTED_LOCALES = ['en', 'si', 'ta'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const LocaleSchema = z.enum(SUPPORTED_LOCALES);
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
};
