// packages/database/prisma/seed/pages/academics.ts

import { SUPPORTED_LOCALES, HERO_BLOCK, CTA_BLOCK } from '@nexus/contracts';
import type { HeroData, CtaData, AcademicsStreamCardsData, AcademicsStreamComparisonData, AcademicsContactsData } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:academics';
const STATUS = 'published';

// NOTE: The registry (registry/page-registry/academics.ts) also defines
// `academics.intro` and `academics.stats` sections, but neither is consumed
// by apps/web/src/server/content/academics.ts yet, so — same as before —
// they're intentionally left unseeded here. Add them once a consumer exists.

type AcademicsPageSeed = {
  hero: HeroData;
  streams: AcademicsStreamCardsData;
  comparison: AcademicsStreamComparisonData;
  contacts: AcademicsContactsData;
  cta: CtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const ACADEMICS_SEED_EN: AcademicsPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'Academic Excellence',
    title: 'Academic Programs',
    subtitle: 'Providing world-class education with diverse streams and modern curricula.',
  },
  streams: {
    eyebrow: 'Our Programs',
    heading: 'Academic Streams',
    streams: [
      {
        key: 'bio-science',
        name: 'Biological Science',
        description: 'Prepare for a career in medicine, biology, or agriculture with our advanced bio-science curriculum.',
        subjects: ['Biology', 'Chemistry', 'Physics'],
        careerPaths: ['Medicine', 'Biomedical Engineering', 'Agriculture', 'Veterinary Science'],
      },
      {
        key: 'physical-science',
        name: 'Physical Science',
        description: 'For students aspiring to be engineers, physicists, or computer scientists.',
        subjects: ['Combined Mathematics', 'Physics', 'Chemistry'],
        careerPaths: ['Engineering', 'Computer Science', 'Physics', 'Mathematics'],
      },
      {
        key: 'commerce',
        name: 'Commerce',
        description: 'Build a strong foundation in business, accounting, and economics.',
        subjects: ['Accounting', 'Business Studies', 'Economics'],
        careerPaths: ['Accounting', 'Business Management', 'Economics', 'Banking'],
      },
      {
        key: 'arts',
        name: 'Arts',
        description: 'Explore humanities, languages, and social sciences to become a well-rounded thinker.',
        subjects: ['Political Science', 'Logic & Scientific Method', 'Geography'],
        careerPaths: ['Law', 'Journalism', 'Education', 'Public Administration'],
      },
      {
        key: 'technology',
        name: 'Technology',
        description: 'Practical, hands-on learning for the technologists of tomorrow.',
        subjects: ['Science for Technology', 'Engineering Technology', 'Information & Communication Technology'],
        careerPaths: ['Information Technology', 'Bio Systems Technology', 'Engineering Technology'],
      },
    ],
  },
  comparison: {
    eyebrow: 'Overview',
    heading: 'Stream Comparison',
    comparisons: [
      {
        stream1: 'Physical Science',
        stream2: 'Biological Science',
        subjectOverlap: ['Chemistry', 'Physics'],
        subjectDifferences: [
          {
            subject: 'Combined Mathematics',
            inStream1: true,
            inStream2: false,
          },
          { subject: 'Biology', inStream1: false, inStream2: true },
        ],
        recommendedFor: 'Students deciding between engineering and medicine-oriented pathways',
      },
      {
        stream1: 'Commerce',
        stream2: 'Arts',
        subjectOverlap: ['Economics'],
        subjectDifferences: [
          { subject: 'Accounting', inStream1: true, inStream2: false },
          { subject: 'Political Science', inStream1: false, inStream2: true },
        ],
        recommendedFor: 'Students weighing business-focused careers against humanities and public-service pathways',
      },
    ],
  },
  contacts: {
    eyebrow: 'Get in Touch',
    heading: 'Department Contacts',
    contacts: [
      {
        department: 'science',
        headOfDepartment: 'Dr. A. Perera',
        email: 'science@nexus.edu',
        phone: '+94 11 222 3333',
      },
      {
        department: 'commerce',
        headOfDepartment: 'Mr. B. Silva',
        email: 'commerce@nexus.edu',
        phone: '+94 11 222 3334',
      },
    ],
  },
  cta: {
    blockType: CTA_BLOCK,
    title: 'Ready to apply?',
    subtitle: 'Take the first step towards a bright future at Nexus.',
    buttonLabel: 'Apply Now',
    buttonHref: '/admissions',
  },
};

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const ACADEMICS_SEED_SI: AcademicsPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'ශාස්ත්‍රීය විශිෂ්ටත්වය',
    title: 'ශාස්ත්‍රීය වැඩසටහන්',
    subtitle: 'විවිධ අංශ සහ නවීන විෂය මාලා සමඟ ලොව ප්‍රමුඛ අධ්‍යාපනයක් ලබා දීම.',
  },
  streams: {
    eyebrow: 'අපගේ වැඩසටහන්',
    heading: 'ශාස්ත්‍රීය අංශ',
    streams: [
      {
        key: 'bio-science',
        name: 'ජීව විද්‍යා විද්‍යාව',
        description: 'අපගේ උසස් ජීව විද්‍යා විෂය මාලාව සමඟ වෛද්‍ය විද්‍යාව, ජීව විද්‍යාව හෝ කෘෂිකර්මාන්තයේ වෘත්තියක් සඳහා සූදානම් වන්න.',
        subjects: ['ජීව විද්‍යාව', 'රසායන විද්‍යාව', 'භෞතික විද්‍යාව'],
        careerPaths: ['වෛද්‍ය විද්‍යාව', 'ජෛව වෛද්‍ය ඉංජිනේරු විද්‍යාව', 'කෘෂිකර්මය', 'පශු වෛද්‍ය විද්‍යාව'],
      },
      {
        key: 'physical-science',
        name: 'භෞතික විද්‍යාව',
        description: 'ඉංජිනේරුවන්, භෞතික විද්‍යාඥයින් හෝ පරිගණක විද්‍යාඥයින් වීමට උත්සාහ කරන සිසුන් සඳහා.',
        subjects: ['සංකලන ගණිතය', 'භෞතික විද්‍යාව', 'රසායන විද්‍යාව'],
        careerPaths: ['ඉංජිනේරු විද්‍යාව', 'පරිගණක විද්‍යාව', 'භෞතික විද්‍යාව', 'ගණිතය'],
      },
      {
        key: 'commerce',
        name: 'වාණිජ්‍යය',
        description: 'ව්‍යාපාර, ගණකාධිකරණය සහ ආර්ථික විද්‍යාව පිළිබඳ ශක්තිමත් පදනමක් ගොඩනඟන්න.',
        subjects: ['ගණකාධිකරණය', 'ව්‍යාපාර අධ්‍යයනය', 'ආර්ථික විද්‍යාව'],
        careerPaths: ['ගණකාධිකරණය', 'ව්‍යාපාර කළමනාකරණය', 'ආර්ථික විද්‍යාව', 'බැංකුකරණය'],
      },
      {
        key: 'arts',
        name: 'කලා',
        description: 'මානව ශාස්ත්‍ර, භාෂා සහ සමාජ විද්‍යාවන් ගවේෂණය කර සමබර චින්තකයෙකු වන්න.',
        subjects: ['රාජ්‍ය විද්‍යාව', 'තර්ක ශාස්ත්‍රය හා විද්‍යාත්මක ක්‍රමය', 'භූගෝල විද්‍යාව'],
        careerPaths: ['නීතිය', 'මාධ්‍යවේදය', 'අධ්‍යාපනය', 'පොදු පරිපාලනය'],
      },
      {
        key: 'technology',
        name: 'තාක්ෂණය',
        description: 'හෙට දිනයේ තාක්ෂණඥයින් සඳහා ප්‍රායෝගික, අතින් කරන ඉගෙනීම.',
        subjects: ['තාක්ෂණය සඳහා විද්‍යාව', 'ඉංජිනේරු තාක්ෂණය', 'තොරතුරු හා සන්නිවේදන තාක්ෂණය'],
        careerPaths: ['තොරතුරු තාක්ෂණය', 'ජෛව පද්ධති තාක්ෂණය', 'ඉංජිනේරු තාක්ෂණය'],
      },
    ],
  },
  comparison: {
    eyebrow: 'දළ විශ්ලේෂණය',
    heading: 'අංශ සංසන්දනය',
    comparisons: [
      {
        stream1: 'භෞතික විද්‍යාව',
        stream2: 'ජීව විද්‍යා විද්‍යාව',
        subjectOverlap: ['රසායන විද්‍යාව', 'භෞතික විද්‍යාව'],
        subjectDifferences: [
          { subject: 'සංකලන ගණිතය', inStream1: true, inStream2: false },
          { subject: 'ජීව විද්‍යාව', inStream1: false, inStream2: true },
        ],
        recommendedFor: 'ඉංජිනේරු විද්‍යාව සහ වෛද්‍ය විද්‍යාව අතර තීරණය කරන සිසුන් සඳහා',
      },
      {
        stream1: 'වාණිජ්‍යය',
        stream2: 'කලා',
        subjectOverlap: ['ආර්ථික විද්‍යාව'],
        subjectDifferences: [
          { subject: 'ගණකාධිකරණය', inStream1: true, inStream2: false },
          { subject: 'රාජ්‍ය විද්‍යාව', inStream1: false, inStream2: true },
        ],
        recommendedFor: 'ව්‍යාපාරික වෘත්තීන් සහ මානවශාස්ත්‍ර / රාජ්‍ය සේවා මාර්ග අතර සලකා බලන සිසුන් සඳහා',
      },
    ],
  },
  contacts: {
    eyebrow: 'සම්බන්ධ වන්න',
    heading: 'දෙපාර්තමේන්තු සම්බන්ධතා',
    contacts: [
      {
        department: 'science',
        headOfDepartment: 'ආචාර්ය ඒ. පෙරේරා',
        email: 'science@nexus.edu',
        phone: '+94 11 222 3333',
      },
      {
        department: 'commerce',
        headOfDepartment: 'බී. සිල්වා මහතා',
        email: 'commerce@nexus.edu',
        phone: '+94 11 222 3334',
      },
    ],
  },
  cta: {
    blockType: CTA_BLOCK,
    title: 'අයදුම් කිරීමට සූදානම්ද?',
    subtitle: 'නෙක්සස් හි දීප්තිමත් අනාගතයක් කරා පළමු පියවර ගන්න.',
    buttonLabel: 'දැන් අයදුම් කරන්න',
    buttonHref: '/admissions',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const ACADEMICS_SEED_TA: AcademicsPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'கல்வி சிறப்பு',
    title: 'கல்வி திட்டங்கள்',
    subtitle: 'பல்வேறு பிரிவுகள் மற்றும் நவீன பாடத்திட்டங்களுடன் உலகத் தரமான கல்வியை வழங்குகிறது.',
  },
  streams: {
    eyebrow: 'எங்கள் திட்டங்கள்',
    heading: 'கல்வி பிரிவுகள்',
    streams: [
      {
        key: 'bio-science',
        name: 'உயிரியல் அறிவியல்',
        description: 'எங்கள் மேம்பட்ட உயிரியல் பாடத்திட்டத்துடன் மருத்துவம், உயிரியல் அல்லது விவசாயத்தில் ஒரு வாழ்க்கைக்கு தயாராகுங்கள்.',
        subjects: ['உயிரியல்', 'வேதியியல்', 'இயற்பியல்'],
        careerPaths: ['மருத்துவம்', 'உயிரி மருத்துவ பொறியியல்', 'விவசாயம்', 'கால்நடை மருத்துவம்'],
      },
      {
        key: 'physical-science',
        name: 'இயற்பியல் அறிவியல்',
        description: 'பொறியாளர்கள், இயற்பியலாளர்கள் அல்லது கணினி விஞ்ஞானிகளாக ஆக விரும்பும் மாணவர்களுக்கு.',
        subjects: ['ஒருங்கிணைந்த கணிதம்', 'இயற்பியல்', 'வேதியியல்'],
        careerPaths: ['பொறியியல்', 'கணினி அறிவியல்', 'இயற்பியல்', 'கணிதம்'],
      },
      {
        key: 'commerce',
        name: 'வணிகவியல்',
        description: 'வணிகம், கணக்கியல் மற்றும் பொருளாதாரத்தில் வலுவான அடித்தளத்தை உருவாக்குங்கள்.',
        subjects: ['கணக்கியல்', 'வணிக ஆய்வுகள்', 'பொருளாதாரம்'],
        careerPaths: ['கணக்கியல்', 'வணிக மேலாண்மை', 'பொருளாதாரம்', 'வங்கித்தொழில்'],
      },
      {
        key: 'arts',
        name: 'கலை',
        description: 'மனிதநேயம், மொழிகள் மற்றும் சமூக அறிவியல்களை ஆராய்ந்து ஒரு நன்கு வட்டமான சிந்தனையாளராகுங்கள்.',
        subjects: ['அரசியல் அறிவியல்', 'தர்க்கவியல் மற்றும் அறிவியல் முறை', 'புவியியல்'],
        careerPaths: ['சட்டம்', 'பத்திரிகையியல்', 'கல்வி', 'பொது நிர்வாகம்'],
      },
      {
        key: 'technology',
        name: 'தொழில்நுட்பம்',
        description: 'நாளைய தொழில்நுட்ப வல்லுநர்களுக்கான நடைமுறை, கைகளால் செய்யும் கற்றல்.',
        subjects: ['தொழில்நுட்பத்திற்கான அறிவியல்', 'பொறியியல் தொழில்நுட்பம்', 'தகவல் மற்றும் தொடர்பாடல் தொழில்நுட்பம்'],
        careerPaths: ['தகவல் தொழில்நுட்பம்', 'உயிர் அமைப்பு தொழில்நுட்பம்', 'பொறியியல் தொழில்நுட்பம்'],
      },
    ],
  },
  comparison: {
    eyebrow: 'கண்ணோட்டம்',
    heading: 'பிரிவு ஒப்பீடு',
    comparisons: [
      {
        stream1: 'இயற்பியல் அறிவியல்',
        stream2: 'உயிரியல் அறிவியல்',
        subjectOverlap: ['வேதியியல்', 'இயற்பியல்'],
        subjectDifferences: [
          { subject: 'ஒருங்கிணைந்த கணிதம்', inStream1: true, inStream2: false },
          { subject: 'உயிரியல்', inStream1: false, inStream2: true },
        ],
        recommendedFor: 'பொறியியல் மற்றும் மருத்துவம் சார்ந்த பாதைகளுக்கு இடையே முடிவெடுக்கும் மாணவர்களுக்கு',
      },
      {
        stream1: 'வணிகவியல்',
        stream2: 'கலை',
        subjectOverlap: ['பொருளாதாரம்'],
        subjectDifferences: [
          { subject: 'கணக்கியல்', inStream1: true, inStream2: false },
          { subject: 'அரசியல் அறிவியல்', inStream1: false, inStream2: true },
        ],
        recommendedFor: 'வணிக சார்ந்த தொழில்களையும் மனிதவியல் / அரசுப் பணிப் பாதைகளையும் ஒப்பிடும் மாணவர்களுக்கு',
      },
    ],
  },
  contacts: {
    eyebrow: 'தொடர்பு கொள்ள',
    heading: 'துறை தொடர்புகள்',
    contacts: [
      {
        department: 'science',
        headOfDepartment: 'டாக்டர் ஏ. பெரேரா',
        email: 'science@nexus.edu',
        phone: '+94 11 222 3333',
      },
      {
        department: 'commerce',
        headOfDepartment: 'திரு. பி. சில்வா',
        email: 'commerce@nexus.edu',
        phone: '+94 11 222 3334',
      },
    ],
  },
  cta: {
    blockType: CTA_BLOCK,
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
