import { SUPPORTED_LOCALES } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

const SCOPE = 'page:academics';
const STATUS = 'published';

const ACADEMICS_SEED_EN = {
  hero: {
    eyebrow: 'Academics at Nexus',
    title: 'Academic Excellence',
    subtitle:
      'Providing world-class education with diverse streams and modern curricula.',
  },
  streams: {
    eyebrow: 'Our Programs',
    heading: 'Academic Streams',
    streams: [
      {
        id: 'bio-science',
        stream: 'science',
        name: 'Biological Science',
        description:
          'Prepare for a career in medicine, biology, or agriculture with our advanced bio-science curriculum.',
        careerPaths: [
          'Medicine',
          'Biomedical Engineering',
          'Agriculture',
          'Veterinary Science',
        ],
        subjectCount: 3,
      },
      {
        id: 'physical-science',
        stream: 'science',
        name: 'Physical Science',
        description:
          'For students aspiring to be engineers, physicists, or computer scientists.',
        careerPaths: [
          'Engineering',
          'Computer Science',
          'Physics',
          'Mathematics',
        ],
        subjectCount: 3,
      },
      {
        id: 'commerce',
        stream: 'commerce',
        name: 'Commerce',
        description:
          'Build a strong foundation in business, accounting, and economics.',
        careerPaths: [
          'Accounting',
          'Business Management',
          'Economics',
          'Banking',
        ],
        subjectCount: 3,
      },
      {
        id: 'arts',
        stream: 'arts',
        name: 'Arts',
        description:
          'Explore humanities, languages, and social sciences to become a well-rounded thinker.',
        careerPaths: [
          'Law',
          'Journalism',
          'Education',
          'Public Administration',
        ],
        subjectCount: 3,
      },
      {
        id: 'technology',
        stream: 'technology',
        name: 'Technology',
        description:
          'Practical, hands-on learning for the technologists of tomorrow.',
        careerPaths: [
          'Information Technology',
          'Bio Systems Technology',
          'Engineering Technology',
        ],
        subjectCount: 3,
      },
    ],
  },
  comparison: {
    eyebrow: 'Overview',
    heading: 'Stream Comparison',
    comparisons: [
      {
        id: 'comp-bio',
        name: 'Biological Science',
        subjects: ['Biology', 'Chemistry', 'Physics / Agriculture'],
        careerPaths: ['Medicine', 'Biotech'],
        entryRequirements: 'Minimum 3 A passes including Science',
        passRate: 98,
      },
      {
        id: 'comp-physical',
        name: 'Physical Science',
        subjects: ['Combined Mathematics', 'Chemistry / CS', 'Physics'],
        careerPaths: ['Engineering', 'Software'],
        entryRequirements: 'Minimum 3 A passes including Math',
        passRate: 96,
      },
      {
        id: 'comp-commerce',
        name: 'Commerce',
        subjects: ['Accounting', 'Business Studies', 'Economics'],
        careerPaths: ['Finance', 'Management'],
        entryRequirements: 'Minimum 5 B passes',
        passRate: 95,
      },
    ],
  },
  contacts: {
    eyebrow: 'Get in Touch',
    heading: 'Department Contacts',
    contacts: [
      {
        id: 'dept-science',
        department: 'Science Department',
        headOfDepartment: 'Dr. A. Perera',
        email: 'science@nexus.edu',
        phone: '+94 11 222 3333',
      },
      {
        id: 'dept-commerce',
        department: 'Commerce Department',
        headOfDepartment: 'Mr. B. Silva',
        email: 'commerce@nexus.edu',
        phone: '+94 11 222 3334',
      },
    ],
  },
  cta: {
    title: 'Ready to apply?',
    subtitle: 'Take the first step towards a bright future at Nexus.',
    buttonLabel: 'Apply Now',
    buttonHref: '/admissions',
  },
};

const ACADEMICS_SEED_SI = ACADEMICS_SEED_EN; // Using English as fallback for now
const ACADEMICS_SEED_TA = {
  ...ACADEMICS_SEED_EN,
  cta: {
    title: 'விண்ணப்பிக்க தயாரா?',
    subtitle:
      'நெக்ஸஸில் ஒரு பிரகாசமான எதிர்காலத்தை நோக்கி முதல் படியை எடுங்கள்.',
    buttonLabel: 'இப்போது விண்ணப்பிக்கவும்',
    buttonHref: '/ta/admissions',
  },
};
const ACADEMICS_SEED = {
  en: ACADEMICS_SEED_EN,
  si: ACADEMICS_SEED_SI,
  ta: ACADEMICS_SEED_TA,
};

const SECTION_CONFIG = {
  hero: { sectionKey: 'academics.hero', contentType: 'hero' },
  streams: { sectionKey: 'academics.streams', contentType: 'richText' },
  comparison: { sectionKey: 'academics.comparison', contentType: 'richText' },
  contacts: { sectionKey: 'academics.contacts', contentType: 'richText' },
  cta: { sectionKey: 'academics.cta', contentType: 'cta' },
};

export async function seedAcademics(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = ACADEMICS_SEED[locale as keyof typeof ACADEMICS_SEED];
    if (!localeData) continue;

    for (const [sectionName, sectionData] of Object.entries(localeData)) {
      const config = SECTION_CONFIG[sectionName as keyof typeof SECTION_CONFIG];
      if (!config) continue;

      const payload = {
        scope: SCOPE,
        sectionKey: config.sectionKey,
        locale,
        status: STATUS,
        data: sectionData as object,
        contentType: config.contentType,
        version: 1,
      };

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
}
