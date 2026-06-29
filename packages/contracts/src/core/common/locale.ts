import { z } from 'zod';
// packages/contracts/src/core/common/locale.ts
//
// Locale definitions for the trilingual Nexus platform.
//
// Should contain:
//   SUPPORTED_LOCALES  — ['en', 'si', 'ta'] as const
//   Locale             — 'en' | 'si' | 'ta'
//   LocaleSchema       — z.enum(['en', 'si', 'ta'])
//   DEFAULT_LOCALE     — 'en'
//   LOCALE_LABELS      — Record<Locale, string> for admin UI display
//
// Used by:
//   apps/web i18n routing
//   apps/admin locale switcher
//   packages/database seed scripts
//   ContentEntry.locale column validation



export const SUPPORTED_LOCALES = ['en', 'si', 'ta'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const LocaleSchema = z.enum(SUPPORTED_LOCALES);
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
};
