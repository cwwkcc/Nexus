// apps/web/src/lib/events-month.ts
//
// Pure "YYYY-MM" month-navigation helpers for the public Events pages.
// Same reasoning as apps/admin/src/lib/events.ts's own shiftMonth/
// monthLabel — kept as a separate copy rather than a shared package since
// apps/admin and apps/web are genuinely separate Next.js apps with no
// existing shared-utils package between them (see this codebase's
// established per-app convention, e.g. news.ts's slugify existing
// independently in both apps' own lib/ directories). monthLabel differs
// from the admin version in one deliberate way: it's locale-aware, since
// the public site actually renders in Sinhala/Tamil, unlike the
// English-only admin UI.

import type { LocaleEnumData } from '@nexus/contracts';

const INTL_LOCALES: Record<LocaleEnumData, string> = { en: 'en-GB', si: 'si-LK', ta: 'ta-LK' };

/** Current "YYYY-MM", UTC-anchored. */
export function currentMonthParam(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

/** Adds `delta` whole months to a "YYYY-MM" string. */
export function shiftMonth(month: string, delta: number): string {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1 + delta;
  const shifted = new Date(Date.UTC(year, monthIndex, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function monthLabel(month: string, locale: LocaleEnumData): string {
  const [yearStr, monthStr] = month.split('-');
  const date = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, 1));
  return date.toLocaleDateString(INTL_LOCALES[locale] ?? INTL_LOCALES.en, { year: 'numeric', month: 'long', timeZone: 'UTC' });
}
