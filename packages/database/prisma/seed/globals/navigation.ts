// packages/database/prisma/seed/globals/navigation.ts

import type { NavigationContentData, LocaleEnumData } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

const NAVIGATION_SEED_EN: NavigationContentData = {
  links: [
    { id: 'about', label: 'About', href: '/about' },
    { id: 'academics', label: 'Academics', href: '/academics' },
    { id: 'admissions', label: 'Admissions', href: '/admissions' },
    { id: 'news', label: 'News', href: '/news' },
    { id: 'events', label: 'Events', href: '/events' },
    { id: 'societies', label: 'Societies', href: '/societies' },
    { id: 'facilities', label: 'Facilities', href: '/facilities' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ],
};

const NAVIGATION_SEED_SI: NavigationContentData = {
  links: [
    { id: 'about', label: 'පිළිබඳව', href: '/about' },
    { id: 'academics', label: 'අධ්‍යාපනික', href: '/academics' },
    { id: 'admissions', label: 'ප්‍රවේශන', href: '/admissions' },
    { id: 'news', label: 'ප්‍රවෘත්ති', href: '/news' },
    { id: 'events', label: 'සිදුවීම්', href: '/events' },
    { id: 'societies', label: 'සංගම්', href: '/societies' },
    { id: 'facilities', label: 'පහසුකම්', href: '/facilities' },
    { id: 'contact', label: 'සම්බන්ධතා', href: '/contact' },
  ],
};

const NAVIGATION_SEED_TA: NavigationContentData = {
  links: [
    { id: 'about', label: 'பற்றி', href: '/about' },
    { id: 'academics', label: 'கல்வித்துறை', href: '/academics' },
    { id: 'admissions', label: 'சேர்க்கை', href: '/admissions' },
    { id: 'news', label: 'செய்திகள்', href: '/news' },
    { id: 'events', label: 'நிகழ்வுகள்', href: '/events' },
    { id: 'societies', label: 'சங்கங்கள்', href: '/societies' },
    { id: 'facilities', label: 'வசதிகள்', href: '/facilities' },
    { id: 'contact', label: 'தொடர்பு', href: '/contact' },
  ],
};

const NAVIGATION_SEED = {
  en: NAVIGATION_SEED_EN,
  si: NAVIGATION_SEED_SI,
  ta: NAVIGATION_SEED_TA,
};

// Helpers

const SCOPE = 'global:navigation';
const STATUS = 'published';
const CONTENT_TYPE = 'navigation';
const SECTION_KEY = 'navigation.main';

export async function seedNavigation(db: PrismaClient, locales: readonly LocaleEnumData[]): Promise<void> {
  for (const locale of locales) {
    const localeData = NAVIGATION_SEED[locale];
    if (!localeData) continue;

    const payload = {
      scope: SCOPE,
      sectionKey: SECTION_KEY,
      locale,
      status: STATUS,
      data: localeData as object,
      contentType: CONTENT_TYPE,
      version: 1,
    } as const;

    await db.contentEntry.upsert({
      where: {
        scope_sectionKey_locale: {
          scope: payload.scope,
          sectionKey: payload.sectionKey,
          locale: payload.locale,
        },
      },
      update: {
        data: payload.data,
        contentType: payload.contentType,
        status: payload.status,
      },
      create: payload,
    });
  }
}
