// packages/database/prisma/seed/pages/contact.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';
import type {
  ContactHeroData,
  ContactInfoData,
  ContactCtaData,
} from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:contact';
const STATUS = 'published';

type ContactPageSeed = {
  hero: ContactHeroData;
  info: ContactInfoData;
  cta: ContactCtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const CONTACT_SEED_EN: ContactPageSeed = {
  hero: {
    eyebrow: 'Contact',
    title: 'Get in Touch',
    subtitle:
      'Reach out to our admissions, support, or general enquiries team for a prompt response.',
  },
  info: {
    address: {
      street: 'Nexus College, 123 Kandy Road',
      city: 'Kandy',
      postalCode: '20000',
      country: 'Sri Lanka',
    },
    phone: '+94 11 222 3333',
    email: 'info@nexus.edu',
    officeHours: 'Monday – Friday, 8:30 AM – 4:30 PM',
    admissionsPhone: '+94 11 222 3334',
    admissionsEmail: 'admissions@nexus.edu',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kandy%20Sri%20Lanka&output=embed',
  },
  cta: {
    eyebrow: 'Need help now?',
    title: 'We’re here to help',
    subtitle:
      'Our team is ready to answer your questions and support your application.',
    buttonLabel: 'Email Admissions',
    buttonHref: 'mailto:admissions@nexus.edu',
    secondaryButtonLabel: 'Call Us',
    secondaryButtonHref: 'tel:+94112223334',
  },
};

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const CONTACT_SEED_SI: ContactPageSeed = {
  hero: {
    eyebrow: 'සම්බන්ධ වන්න',
    title: 'අප අමතන්න',
    subtitle:
      'අපගේ ඇතුළුකිරීම්, සහාය හෝ සාමාන්‍ය විමසීම් කණ්ඩායම සම්බන්ධ කරගන්න.',
  },
  info: {
    address: {
      street: 'Nexus College, 123 Kandy Road',
      city: 'Kandy',
      postalCode: '20000',
      country: 'Sri Lanka',
    },
    phone: '+94 11 222 3333',
    email: 'info@nexus.edu',
    officeHours: 'සඳුදා – සිකුරාදා, 8:30 පෙ.ව – 4:30 ප.ව',
    admissionsPhone: '+94 11 222 3334',
    admissionsEmail: 'admissions@nexus.edu',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kandy%20Sri%20Lanka&output=embed',
  },
  cta: {
    eyebrow: 'දැන් උදව් අවශ්‍යද?',
    title: 'අපි උදව් කිරීමට සූදානම්',
    subtitle:
      'ඔබේ ප්‍රශ්නවලට පිළිතුරු දීමට සහ ඔබගේ අයදුම්පතට සහය වීමට අපගේ කණ්ඩායම සූදානම්යි.',
    buttonLabel: 'ඇතුළුකිරීම ඉ-තැපැල',
    buttonHref: 'mailto:admissions@nexus.edu',
    secondaryButtonLabel: 'අප අමතන්න',
    secondaryButtonHref: 'tel:+94112223334',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const CONTACT_SEED_TA: ContactPageSeed = {
  hero: {
    eyebrow: 'தொடர்பு கொள்ளுங்கள்',
    title: 'எங்களை தொடர்பு கொள்ளுங்கள்',
    subtitle:
      'உங்கள் சேர்க்கை, ஆதரவு அல்லது பொது விசாரணைகளுக்காக எங்களை அணுகவும்.',
  },
  info: {
    address: {
      street: 'Nexus College, 123 Kandy Road',
      city: 'Kandy',
      postalCode: '20000',
      country: 'Sri Lanka',
    },
    phone: '+94 11 222 3333',
    email: 'info@nexus.edu',
    officeHours: 'திங்கள் – வெள்ளி, 8:30 AM – 4:30 PM',
    admissionsPhone: '+94 11 222 3334',
    admissionsEmail: 'admissions@nexus.edu',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kandy%20Sri%20Lanka&output=embed',
  },
  cta: {
    eyebrow: 'இப்போது உதவி தேவையா?',
    title: 'நாங்கள் உதவ தயாராக உள்ளோம்',
    subtitle:
      'உங்கள் கேள்விகளுக்கு பதிலளிக்கவும் உங்கள் விண்ணப்பத்தை ஆதரிக்கவும் எங்கள் குழு தயாராக உள்ளது.',
    buttonLabel: 'சேர்க்கை மின்னஞ்சல்',
    buttonHref: 'mailto:admissions@nexus.edu',
    secondaryButtonLabel: 'எங்களை அழைக்கவும்',
    secondaryButtonHref: 'tel:+94112223334',
  },
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const SECTION_CONFIG = {
  hero: { sectionKey: 'contact.hero', contentType: 'hero' },
  info: { sectionKey: 'contact.info', contentType: 'contact-info' },
  cta: { sectionKey: 'contact.cta', contentType: 'cta' },
};

const CONTACT_SEED = {
  en: CONTACT_SEED_EN,
  si: CONTACT_SEED_SI,
  ta: CONTACT_SEED_TA,
};

export async function seedContact(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = CONTACT_SEED[locale];
    if (!localeData) continue;

    for (const [sectionName, sectionData] of Object.entries(localeData)) {
      const config = SECTION_CONFIG[sectionName as keyof typeof SECTION_CONFIG];
      if (!config) continue;

      await db.contentEntry.upsert({
        where: {
          scope_sectionKey_locale: {
            scope: SCOPE,
            sectionKey: config.sectionKey,
            locale,
          },
        },
        update: {
          data: sectionData as object,
          contentType: config.contentType,
          status: STATUS,
        },
        create: {
          scope: SCOPE,
          sectionKey: config.sectionKey,
          contentType: config.contentType,
          locale,
          status: STATUS,
          data: sectionData as object,
          version: 1,
        },
      });
    }
  }
}
