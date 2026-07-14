// packages/database/prisma/seed/globals/footer.ts

import { type FooterContentData, LocaleEnumData } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── English Footer ──────────────────────────────────────────────────────────

const FOOTER_SEED_EN: FooterContentData = {
  schoolName: 'C.W.W. Kannangara Central College',
  tagline: '"Wisdom is All Wealth"',
  contact: {
    title: 'Contact Us',
    lines: [{ label: 'Mathugama' }, { label: 'Kalutara District' }, { label: 'Western Province' }, { label: 'Sri Lanka' }, { label: 'info@cwwkcc.lk', href: 'mailto:info@cwwkcc.lk' }, { label: '+94 123 456 789', href: 'tel:+94123456789' }],
  },
  columns: [
    {
      id: 'the-school',
      heading: 'The School',
      links: [
        { id: 'about', label: 'About KCC', href: '/about' },
        {
          id: 'administration',
          label: 'Administration',
          href: '/administration',
        },
        { id: 'facilities', label: 'Facilities', href: '/facilities' },
      ],
    },
    {
      id: 'academics',
      heading: 'Academics',
      links: [
        { id: 'streams', label: 'Streams', href: '/academics' },
        { id: 'results', label: 'Results', href: '/results' },
        { id: 'achievements', label: 'Achievements', href: '/achievements' },
      ],
    },
    {
      id: 'community',
      heading: 'Community',
      links: [
        { id: 'societies', label: 'Societies', href: '/societies' },
        { id: 'sports', label: 'Sports', href: '/extracurriculars' },
        { id: 'scouts', label: 'Scouts', href: '/scouts' },
        { id: 'kits', label: 'KITS', href: '/societies/kits' },
      ],
    },
    {
      id: 'admissions',
      heading: 'Admissions',
      links: [
        { id: 'apply', label: 'How to Apply', href: '/admissions' },
        { id: 'dates', label: 'Key Dates', href: '/admissions#dates' },
        { id: 'contact', label: 'Contact', href: '/contact' },
      ],
    },
  ],
  socialLinks: [
    {
      id: 'fb',
      label: 'Facebook',
      href: 'https://facebook.com/cwwkcc',
      icon: 'facebook',
    },
    {
      id: 'ig',
      label: 'Instagram',
      href: 'https://instagram.com/cwwkcc',
      icon: 'instagram',
    },
    {
      id: 'yt',
      label: 'YouTube',
      href: 'https://youtube.com/@cwwkcc',
      icon: 'youtube',
    },
    {
      id: 'gh',
      label: 'GitHub',
      href: 'https://github.com/cwwkcc',
      icon: 'github',
    },
    {
      id: 'li',
      label: 'LinkedIn',
      href: 'https://linkedin.com/school/cwwkcc',
      icon: 'linkedin',
    },
  ],
  copyright: 'C.W.W. Kannangara Central College. All rights reserved.',
  legalLinks: [
    { id: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
    { id: 'terms', label: 'Terms', href: '/terms' },
    { id: 'kits-credit', label: 'KITS', href: '/societies/kits' },
  ],
};

// ─── Sinhala Footer ──────────────────────────────────────────────────────────

const FOOTER_SEED_SI: FooterContentData = {
  schoolName: 'කන්නන්ගර මධ්‍ය මහා විද්‍යාලය',
  tagline: '"සුඛෝ පඤ්ඤාය පඨිලාභෝ"',
  contact: {
    title: 'අප අමතන්න',
    lines: [{ label: 'මතුගම' }, { label: 'කළුතර දිස්ත්‍රික්කය' }, { label: 'බස්නාහිර පළාත' }, { label: 'ශ්‍රී ලංකාව' }, { label: '+94 123 456 789', href: 'tel:+94123456789' }, { label: 'info@cwwkcc.lk', href: 'mailto:info@cwwkcc.lk' }],
  },
  columns: [
    {
      id: 'the-school',
      heading: 'පාසල',
      links: [
        { id: 'about', label: 'කන්නන්ගර ගැන', href: '/about' },
        { id: 'administration', label: 'පරිපාලනය', href: '/administration' },
        { id: 'facilities', label: 'පහසුකම්', href: '/facilities' },
      ],
    },
    {
      id: 'academics',
      heading: 'අධ්‍යාපනය',
      links: [
        { id: 'streams', label: 'අංශ', href: '/academics' },
        { id: 'results', label: 'ප්‍රතිඵල', href: '/results' },
        { id: 'achievements', label: 'ජයග්‍රහණ', href: '/achievements' },
      ],
    },
    {
      id: 'community',
      heading: 'ප්‍රජාව',
      links: [
        { id: 'societies', label: 'සමාජ', href: '/societies' },
        { id: 'sports', label: 'ක්‍රීඩා', href: '/extracurriculars' },
        { id: 'scouts', label: 'බාලදක්ෂ', href: '/scouts' },
        { id: 'kits', label: 'KITS', href: '/societies/kits' },
      ],
    },
    {
      id: 'admissions',
      heading: 'ඇතුළත් කිරීම්',
      links: [
        { id: 'apply', label: 'අයදුම් කරන ආකාරය', href: '/admissions' },
        { id: 'dates', label: 'ප්‍රධාන දිනයන්', href: '/admissions#dates' },
        { id: 'contact', label: 'සම්බන්ධ වන්න', href: '/contact' },
      ],
    },
  ],
  socialLinks: [
    {
      id: 'fb',
      label: 'Facebook',
      href: 'https://facebook.com/cwwkcc',
      icon: 'facebook',
    },
    {
      id: 'ig',
      label: 'Instagram',
      href: 'https://instagram.com/cwwkcc',
      icon: 'instagram',
    },
    {
      id: 'yt',
      label: 'YouTube',
      href: 'https://youtube.com/@cwwkcc',
      icon: 'youtube',
    },
    {
      id: 'gh',
      label: 'GitHub',
      href: 'https://github.com/cwwkcc',
      icon: 'github',
    },
    {
      id: 'li',
      label: 'LinkedIn',
      href: 'https://linkedin.com/school/cwwkcc',
      icon: 'linkedin',
    },
  ],
  copyright: 'කන්නන්ගර මධ්‍ය මහා විද්‍යාලය. සියලුම හිමිකම් ඇවිරිණි.',
  legalLinks: [
    {
      id: 'privacy',
      label: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
      href: '/privacy-policy',
    },
    { id: 'terms', label: 'නියමයන්', href: '/terms' },
    { id: 'kits-credit', label: 'KITS', href: '/societies/kits' },
  ],
};

// ─── Tamil Footer ──────────────────────────────────────────────────────────

const FOOTER_SEED_TA: FooterContentData = {
  schoolName: 'C.W.W. Kannangara Central College',
  tagline: '"Wisdom is All Wealth"',
  contact: {
    title: 'Contact Us',
    lines: [{ label: 'Mathugama' }, { label: 'Kalutara District' }, { label: 'Western Province' }, { label: 'Sri Lanka' }, { label: '+94 123 456 789', href: 'tel:+94123456789' }, { label: 'info@cwwkcc.lk', href: 'mailto:info@cwwkcc.lk' }],
  },
  columns: [
    {
      id: 'the-school',
      heading: 'The School',
      links: [
        { id: 'about', label: 'About KCC', href: '/about' },
        {
          id: 'administration',
          label: 'Administration',
          href: '/administration',
        },
        { id: 'facilities', label: 'Facilities', href: '/facilities' },
      ],
    },
    {
      id: 'academics',
      heading: 'Academics',
      links: [
        { id: 'streams', label: 'Streams', href: '/academics' },
        { id: 'results', label: 'Results', href: '/results' },
        { id: 'achievements', label: 'Achievements', href: '/achievements' },
      ],
    },
    {
      id: 'community',
      heading: 'Community',
      links: [
        { id: 'societies', label: 'Societies', href: '/societies' },
        { id: 'sports', label: 'Sports', href: '/extracurriculars' },
        { id: 'scouts', label: 'Scouts', href: '/scouts' },
        { id: 'kits', label: 'KITS', href: '/societies/kits' },
      ],
    },
    {
      id: 'admissions',
      heading: 'Admissions',
      links: [
        { id: 'apply', label: 'How to Apply', href: '/admissions' },
        { id: 'dates', label: 'Key Dates', href: '/admissions#dates' },
        { id: 'contact', label: 'Contact', href: '/contact' },
      ],
    },
  ],
  socialLinks: [
    {
      id: 'fb',
      label: 'Facebook',
      href: 'https://facebook.com/cwwkcc',
      icon: 'facebook',
    },
    {
      id: 'ig',
      label: 'Instagram',
      href: 'https://instagram.com/cwwkcc',
      icon: 'instagram',
    },
    {
      id: 'yt',
      label: 'YouTube',
      href: 'https://youtube.com/@cwwkcc',
      icon: 'youtube',
    },
    {
      id: 'gh',
      label: 'GitHub',
      href: 'https://github.com/cwwkcc',
      icon: 'github',
    },
    {
      id: 'li',
      label: 'LinkedIn',
      href: 'https://linkedin.com/school/cwwkcc',
      icon: 'linkedin',
    },
  ],
  copyright: 'C.W.W. Kannangara Central College. All rights reserved.',
  legalLinks: [
    { id: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
    { id: 'terms', label: 'Terms', href: '/terms' },
    { id: 'kits-credit', label: 'KITS', href: '/societies/kits' },
  ],
};

// Helpers

const FOOTER_SEED = {
  en: FOOTER_SEED_EN,
  si: FOOTER_SEED_SI,
  ta: FOOTER_SEED_TA,
};
const SCOPE = 'global:footer';
const STATUS = 'published';
const CONTENT_TYPE = 'footer';
const SECTION_KEY = 'footer.main';

export async function seedFooter(db: PrismaClient, locales: readonly LocaleEnumData[]): Promise<void> {
  for (const locale of locales) {
    const localeData = FOOTER_SEED[locale];
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
