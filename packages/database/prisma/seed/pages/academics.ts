// packages/database/prisma/seed/pages/academics.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';
import type {
  AcademicsHeroData,
  AcademicsStreamCardsData,
  AcademicsStreamComparisonData,
  AcademicsContactsData,
  AcademicsCtaData,
} from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:academics';
const STATUS = 'published';

type AcademicsPageSeed = {
  hero: AcademicsHeroData;
  streams: AcademicsStreamCardsData;
  comparison: AcademicsStreamComparisonData;
  contacts: AcademicsContactsData;
  cta: AcademicsCtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const ACADEMICS_SEED_EN: AcademicsPageSeed = {
  hero: {
    eyebrow: 'Academic Excellence',
    title: 'Academic Programs',
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

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const ACADEMICS_SEED_SI: AcademicsPageSeed = {
  hero: {
    eyebrow: 'ශාස්ත්‍රීය විශිෂ්ටත්වය',
    title: 'ශාස්ත්‍රීය වැඩසටහන්',
    subtitle:
      'විවිධ අංශ සහ නවීන විෂය මාලා සමඟ ලොව ප්‍රමුඛ අධ්‍යාපනයක් ලබා දීම.',
  },
  streams: {
    eyebrow: 'අපගේ වැඩසටහන්',
    heading: 'ශාස්ත්‍රීය අංශ',
    streams: [
      {
        id: 'bio-science',
        stream: 'science',
        name: 'ජීව විද්‍යා විද්‍යාව',
        description:
          'අපගේ උසස් ජීව විද්‍යා විෂය මාලාව සමඟ වෛද්‍ය විද්‍යාව, ජීව විද්‍යාව හෝ කෘෂිකර්මාන්තයේ වෘත්තියක් සඳහා සූදානම් වන්න.',
        careerPaths: [
          'වෛද්‍ය විද්‍යාව',
          'ජෛව වෛද්‍ය ඉංජිනේරු විද්‍යාව',
          'කෘෂිකර්මය',
          'පශු වෛද්‍ය විද්‍යාව',
        ],
        subjectCount: 3,
      },
      {
        id: 'physical-science',
        stream: 'science',
        name: 'භෞතික විද්‍යාව',
        description:
          'ඉංජිනේරුවන්, භෞතික විද්‍යාඥයින් හෝ පරිගණක විද්‍යාඥයින් වීමට උත්සාහ කරන සිසුන් සඳහා.',
        careerPaths: [
          'ඉංජිනේරු විද්‍යාව',
          'පරිගණක විද්‍යාව',
          'භෞතික විද්‍යාව',
          'ගණිතය',
        ],
        subjectCount: 3,
      },
      {
        id: 'commerce',
        stream: 'commerce',
        name: 'වාණිජ්‍යය',
        description:
          'ව්‍යාපාර, ගණකාධිකරණය සහ ආර්ථික විද්‍යාව පිළිබඳ ශක්තිමත් පදනමක් ගොඩනඟන්න.',
        careerPaths: [
          'ගණකාධිකරණය',
          'ව්‍යාපාර කළමනාකරණය',
          'ආර්ථික විද්‍යාව',
          'බැංකුකරණය',
        ],
        subjectCount: 3,
      },
      {
        id: 'arts',
        stream: 'arts',
        name: 'කලා',
        description:
          'මානව ශාස්ත්‍ර, භාෂා සහ සමාජ විද්‍යාවන් ගවේෂණය කර සමබර චින්තකයෙකු වන්න.',
        careerPaths: ['නීතිය', 'මාධ්‍යවේදය', 'අධ්‍යාපනය', 'පොදු පරිපාලනය'],
        subjectCount: 3,
      },
      {
        id: 'technology',
        stream: 'technology',
        name: 'තාක්ෂණය',
        description: 'හෙට දිනයේ තාක්ෂණඥයින් සඳහා ප්‍රායෝගික, අතින් කරන ඉගෙනීම.',
        careerPaths: [
          'තොරතුරු තාක්ෂණය',
          'ජෛව පද්ධති තාක්ෂණය',
          'ඉංජිනේරු තාක්ෂණය',
        ],
        subjectCount: 3,
      },
    ],
  },
  comparison: {
    eyebrow: 'දළ විශ්ලේෂණය',
    heading: 'අංශ සංසන්දනය',
    comparisons: [
      {
        id: 'comp-bio',
        name: 'ජීව විද්‍යා විද්‍යාව',
        subjects: [
          'ජීව විද්‍යාව',
          'රසායන විද්‍යාව',
          'භෞතික විද්‍යාව / කෘෂිකර්මය',
        ],
        careerPaths: ['වෛද්‍ය විද්‍යාව', 'ජෛව තාක්ෂණය'],
        entryRequirements: 'විද්‍යාව ඇතුළු අවම A ගුණත්ව 3ක්',
        passRate: 98,
      },
      {
        id: 'comp-physical',
        name: 'භෞතික විද්‍යාව',
        subjects: [
          'සංකලන ගණිතය',
          'රසායන විද්‍යාව / පරිගණක විද්‍යාව',
          'භෞතික විද්‍යාව',
        ],
        careerPaths: ['ඉංජිනේරු විද්‍යාව', 'මෘදුකාංග'],
        entryRequirements: 'ගණිතය ඇතුළු අවම A ගුණත්ව 3ක්',
        passRate: 96,
      },
      {
        id: 'comp-commerce',
        name: 'වාණිජ්‍යය',
        subjects: ['ගණකාධිකරණය', 'ව්‍යාපාර අධ්‍යයනය', 'ආර්ථික විද්‍යාව'],
        careerPaths: ['මූල්‍ය', 'කළමනාකරණය'],
        entryRequirements: 'අවම B ගුණත්ව 5ක්',
        passRate: 95,
      },
    ],
  },
  contacts: {
    eyebrow: 'සම්බන්ධ වන්න',
    heading: 'දෙපාර්තමේන්තු සම්බන්ධතා',
    contacts: [
      {
        id: 'dept-science',
        department: 'විද්‍යා දෙපාර්තමේන්තුව',
        headOfDepartment: 'ආචාර්ය ඒ. පෙරේරා',
        email: 'science@nexus.edu',
        phone: '+94 11 222 3333',
      },
      {
        id: 'dept-commerce',
        department: 'වාණිජ්‍ය දෙපාර්තමේන්තුව',
        headOfDepartment: 'බී. සිල්වා මහතා',
        email: 'commerce@nexus.edu',
        phone: '+94 11 222 3334',
      },
    ],
  },
  cta: {
    title: 'අයදුම් කිරීමට සූදානම්ද?',
    subtitle: 'නෙක්සස් හි දීප්තිමත් අනාගතයක් කරා පළමු පියවර ගන්න.',
    buttonLabel: 'දැන් අයදුම් කරන්න',
    buttonHref: '/admissions',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const ACADEMICS_SEED_TA: AcademicsPageSeed = {
  hero: {
    eyebrow: 'கல்வி சிறப்பு',
    title: 'கல்வி திட்டங்கள்',
    subtitle:
      'பல்வேறு பிரிவுகள் மற்றும் நவீன பாடத்திட்டங்களுடன் உலகத் தரமான கல்வியை வழங்குகிறது.',
  },
  streams: {
    eyebrow: 'எங்கள் திட்டங்கள்',
    heading: 'கல்வி பிரிவுகள்',
    streams: [
      {
        id: 'bio-science',
        stream: 'science',
        name: 'உயிரியல் அறிவியல்',
        description:
          'எங்கள் மேம்பட்ட உயிரியல் பாடத்திட்டத்துடன் மருத்துவம், உயிரியல் அல்லது விவசாயத்தில் ஒரு வாழ்க்கைக்கு தயாராகுங்கள்.',
        careerPaths: [
          'மருத்துவம்',
          'உயிரி மருத்துவ பொறியியல்',
          'விவசாயம்',
          'கால்நடை மருத்துவம்',
        ],
        subjectCount: 3,
      },
      {
        id: 'physical-science',
        stream: 'science',
        name: 'இயற்பியல் அறிவியல்',
        description:
          'பொறியாளர்கள், இயற்பியலாளர்கள் அல்லது கணினி விஞ்ஞானிகளாக ஆக விரும்பும் மாணவர்களுக்கு.',
        careerPaths: ['பொறியியல்', 'கணினி அறிவியல்', 'இயற்பியல்', 'கணிதம்'],
        subjectCount: 3,
      },
      {
        id: 'commerce',
        stream: 'commerce',
        name: 'வணிகவியல்',
        description:
          'வணிகம், கணக்கியல் மற்றும் பொருளாதாரத்தில் வலுவான அடித்தளத்தை உருவாக்குங்கள்.',
        careerPaths: [
          'கணக்கியல்',
          'வணிக மேலாண்மை',
          'பொருளாதாரம்',
          'வங்கித்தொழில்',
        ],
        subjectCount: 3,
      },
      {
        id: 'arts',
        stream: 'arts',
        name: 'கலை',
        description:
          'மனிதநேயம், மொழிகள் மற்றும் சமூக அறிவியல்களை ஆராய்ந்து ஒரு நன்கு வட்டமான சிந்தனையாளராகுங்கள்.',
        careerPaths: ['சட்டம்', 'பத்திரிகையியல்', 'கல்வி', 'பொது நிர்வாகம்'],
        subjectCount: 3,
      },
      {
        id: 'technology',
        stream: 'technology',
        name: 'தொழில்நுட்பம்',
        description:
          'நாளைய தொழில்நுட்ப வல்லுநர்களுக்கான நடைமுறை, கைகளால் செய்யும் கற்றல்.',
        careerPaths: [
          'தகவல் தொழில்நுட்பம்',
          'உயிர் அமைப்பு தொழில்நுட்பம்',
          'பொறியியல் தொழில்நுட்பம்',
        ],
        subjectCount: 3,
      },
    ],
  },
  comparison: {
    eyebrow: 'கண்ணோட்டம்',
    heading: 'பிரிவு ஒப்பீடு',
    comparisons: [
      {
        id: 'comp-bio',
        name: 'உயிரியல் அறிவியல்',
        subjects: ['உயிரியல்', 'வேதியியல்', 'இயற்பியல் / வேளாண்மை'],
        careerPaths: ['மருத்துவம்', 'உயிரித் தொழில்நுட்பம்'],
        entryRequirements: 'அறிவியல் உட்பட குறைந்தது 3 A தரங்கள்',
        passRate: 98,
      },
      {
        id: 'comp-physical',
        name: 'இயற்பியல் அறிவியல்',
        subjects: [
          'ஒருங்கிணைந்த கணிதம்',
          'வேதியியல் / கணினி அறிவியல்',
          'இயற்பியல்',
        ],
        careerPaths: ['பொறியியல்', 'மென்பொருள்'],
        entryRequirements: 'கணிதம் உட்பட குறைந்தது 3 A தரங்கள்',
        passRate: 96,
      },
      {
        id: 'comp-commerce',
        name: 'வணிகவியல்',
        subjects: ['கணக்கியல்', 'வணிக ஆய்வுகள்', 'பொருளாதாரம்'],
        careerPaths: ['நிதி', 'மேலாண்மை'],
        entryRequirements: 'குறைந்தது 5 B தரங்கள்',
        passRate: 95,
      },
    ],
  },
  contacts: {
    eyebrow: 'தொடர்பு கொள்ள',
    heading: 'துறை தொடர்புகள்',
    contacts: [
      {
        id: 'dept-science',
        department: 'அறிவியல் துறை',
        headOfDepartment: 'டாக்டர் ஏ. பெரேரா',
        email: 'science@nexus.edu',
        phone: '+94 11 222 3333',
      },
      {
        id: 'dept-commerce',
        department: 'வணிகவியல் துறை',
        headOfDepartment: 'திரு. பி. சில்வா',
        email: 'commerce@nexus.edu',
        phone: '+94 11 222 3334',
      },
    ],
  },
  cta: {
    title: 'விண்ணப்பிக்க தயாரா?',
    subtitle: 'நெக்ஸஸில் ஒரு பிரகாசமான எதிர்காலத்திற்கு முதல் படியை எடுங்கள்.',
    buttonLabel: 'இப்போது விண்ணப்பிக்கவும்',
    buttonHref: '/admissions',
  },
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const SECTION_CONFIG = {
  hero: { sectionKey: 'academics.hero', contentType: 'hero' },
  streams: { sectionKey: 'academics.streams', contentType: 'richText' },
  comparison: { sectionKey: 'academics.comparison', contentType: 'richText' },
  contacts: { sectionKey: 'academics.contacts', contentType: 'richText' },
  cta: { sectionKey: 'academics.cta', contentType: 'cta' },
};

const ACADEMICS_SEED = {
  en: ACADEMICS_SEED_EN,
  si: ACADEMICS_SEED_SI,
  ta: ACADEMICS_SEED_TA,
};

export async function seedAcademics(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = ACADEMICS_SEED[locale];
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
