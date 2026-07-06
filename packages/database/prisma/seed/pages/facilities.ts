// packages/database/prisma/seed/pages/facilities.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// Helpers

const SCOPE = 'page:facilities';
const STATUS = 'published';

// ─── English Facilities ───────────────────────────────────────────────────────

const FACILITIES_SEED_EN = {
  hero: {
    eyebrow: 'Campus Infrastructure',
    title: 'Our',
    titleEm: 'Facilities',
    subtitle:
      'Modern learning environments designed to inspire excellence and support holistic student development.',
  },
  stats: {
    stats: [
      {
        id: 'classrooms',
        target: 50,
        suffix: '+',
        label: 'Classrooms',
        description: 'Modern learning spaces',
      },
      {
        id: 'labs',
        target: 10,
        suffix: '+',
        label: 'Laboratories',
        description: 'Science & computer labs',
      },
      {
        id: 'library',
        target: 1,
        label: 'Main Library',
        description: '15,000+ books & resources',
      },
      {
        id: 'sports',
        target: 5,
        label: 'Sports Facilities',
        description: 'Grounds & courts',
      },
    ],
  },
  grid: {
    eyebrow: 'Learning Spaces',
    heading: 'World-Class Infrastructure',
    facilities: [
      {
        id: 'science-labs',
        name: 'Science Laboratories',
        description:
          'Fully equipped physics, chemistry, and biology laboratories with modern equipment and safety features.',
        capacity: '40 students per lab',
        features: [
          'Modern equipment',
          'Safety compliance',
          'Practical learning',
        ],
      },
      {
        id: 'computer-labs',
        name: 'Computer Laboratories',
        description:
          'State-of-the-art computer labs with high-speed internet and the latest software for ICT education.',
        capacity: '30 students per lab',
        features: [
          'High-speed internet',
          'Latest software',
          'KITS programming hub',
        ],
      },
      {
        id: 'library',
        name: 'Main Library',
        description:
          'A comprehensive library with over 15,000 books, digital resources, and quiet study areas.',
        capacity: '100 students',
        features: [
          '15,000+ books',
          'Digital resources',
          'Study areas',
        ],
      },
      {
        id: 'auditorium',
        name: 'School Auditorium',
        description:
          'A 500-seat auditorium for assemblies, cultural events, and academic presentations.',
        capacity: '500 seats',
        features: [
          'Sound system',
          'Stage lighting',
          'Multi-purpose use',
        ],
      },
      {
        id: 'sports-complex',
        name: 'Sports Complex',
        description:
          'Comprehensive sports facilities including a cricket ground, football field, basketball courts, and more.',
        capacity: 'Multiple teams',
        features: [
          'Cricket ground',
          'Football field',
          'Basketball courts',
        ],
      },
      {
        id: 'canteen',
        name: 'Student Canteen',
        description:
          'Hygienic and affordable food service providing nutritious meals for students and staff.',
        capacity: '200 students',
        features: [
          'Hygienic preparation',
          'Affordable prices',
          'Nutritious meals',
        ],
      },
    ],
  },
  cta: {
    eyebrow: 'Visit Us',
    title: 'Experience Our Campus',
    subtitle:
      'We welcome prospective students and parents to visit our campus and see our facilities firsthand.',
    buttonLabel: 'Schedule a Visit',
    buttonHref: '/contact',
  },
};

// ─── Sinhala Facilities ───────────────────────────────────────────────────────

const FACILITIES_SEED_SI = {
  hero: {
    eyebrow: 'පරිපාලන පහසුකම්',
    title: 'අපගේ',
    titleEm: 'පහසුකම්',
    subtitle:
      'විද්‍යාලයේ නවීන ඉගෙනුම් පරිසරය සහ සිසුන්ගේ සමස්ත සංවර්ධනයට උපකාරී පහසුකම්.',
  },
  stats: {
    stats: [
      {
        id: 'classrooms',
        target: 50,
        suffix: '+',
        label: 'Classrooms',
        description: 'Modern learning spaces',
      },
      {
        id: 'labs',
        target: 10,
        suffix: '+',
        label: 'Laboratories',
        description: 'Science & computer labs',
      },
      {
        id: 'library',
        target: 1,
        label: 'Main Library',
        description: '15,000+ books & resources',
      },
      {
        id: 'sports',
        target: 5,
        label: 'Sports Facilities',
        description: 'Grounds & courts',
      },
    ],
  },
  grid: {
    eyebrow: 'ඉගෙනුම් පරිසරය',
    heading: 'ලෝක මට්ටමේ පහසුකම්',
    facilities: [
      {
        id: 'science-labs',
        name: 'විද්‍යා පර්යේත්‍රාගාර',
        description:
          'නවීන උපකරණ සහ ආරක්ෂක විශේෂාංග සහිත භෞතික විද්‍යා, රසායන විද්‍යා සහ ජීව විද්‍යා පර්යේත්‍රාගාර.',
        capacity: 'පර්යේත්‍රාගාරයකට සිසුන් 40',
        features: [
          'නවීන උපකරණ',
          'ආරක්ෂක පියවර',
          'ප්‍රායෝගික ඉගෙනුම',
        ],
      },
      {
        id: 'computer-labs',
        name: 'පරිගණක පර්යේත්‍රාගාර',
        description:
          'ඉහළ වේග අන්තර්ජාලය සහ නවීනතම මෘදුකාංග සහිත පරිගණක පර්යේත්‍රාගාර.',
        capacity: 'පර්යේත්‍රාගාරයකට සිසුන් 30',
        features: [
          'ඉහළ වේග අන්තර්ජාලය',
          'නවීනතම මෘදුකාංග',
          'KITS වැඩසටහන් කේන්ද්‍රය',
        ],
      },
      {
        id: 'library',
        name: 'ප්‍රධාන පුස්තකාලය',
        description:
          'පොත් 15,000කට වැඩි, ඩිජිටල් සම්පත් සහ නිශ්ශබ්ද අධ්‍යයන ක්ෂේත්‍ර සහිත පුස්තකාලය.',
        capacity: 'සිසුන් 100',
        features: [
          'පොත් 15,000+',
          'ඩිජිටල් සම්පත්',
          'අධ්‍යයන ක්ෂේත්‍ර',
        ],
      },
      {
        id: 'auditorium',
        name: 'විද්‍යාල ශාලාව',
        description:
          'රැස්වීම්, සංස්කෘතික කටයුතු සහ අධ්‍යාපනික ඉදිරිපත් කිරීම් සඳහා ආසන 500ක් සහිත ශාලාව.',
        capacity: 'ආසන 500',
        features: [
          'ශබ්ද පද්ධතිය',
          'රංග ප්‍රදීපනය',
          'බහු-උද්දේශක භාවිතය',
        ],
      },
      {
        id: 'sports-complex',
        name: 'ක්‍රීඩා සංකීර්ණය',
        description:
          'ක්‍රිකට් ක්‍රීඩාංගණය, පැසිපන්බල් පිටිය, පැසිපන්බල් පිටි සහ තවත් බොහෝ දේ සහිත ක්‍රීඩා පහසුකම්.',
        capacity: 'කණ්ඩායම් කිහිපයක්',
        features: [
          'ක්‍රිකට් ක්‍රීඩාංගණය',
          'පැසිපන්බල් පිටිය',
          'පැසිපන්බල් පිටි',
        ],
      },
      {
        id: 'canteen',
        name: 'සිසු ආහාර ශාලාව',
        description:
          'සිසුන්ට සහ කාර්ය මණ්ඩලයට පෝෂක ආහාර සැපයීම සඳහා සෞඛ්‍ය සම්පන්න සහ පහසු මිල ආහාර සේවාව.',
        capacity: 'සිසුන් 200',
        features: [
          'සෞඛ්‍ය සම්පන්න සකස් කිරීම',
          'පහසු මිල',
          'පෝෂක ආහාර',
        ],
      },
    ],
  },
  cta: {
    eyebrow: 'අප හමුවන්න',
    title: 'අපගේ විද්‍යාලය බලන්න',
    subtitle:
      'අපි අනාගත සිසුන් සහ දෙමාපියන්ට අපගේ විද්‍යාලය නැරඹීමට සහ අපගේ පහසුකම් දැක බැලීමට ආරාධනා කරමු.',
    buttonLabel: 'සංචාරයක් සැකසීම',
    buttonHref: '/contact',
  },
};

// ─── Tamil Facilities ─────────────────────────────────────────────────────────

const FACILITIES_SEED_TA = {
  hero: {
    eyebrow: 'வளாகம் உள்கட்டமைப்பு',
    title: 'எங்கள்',
    titleEm: 'வசதிகள்',
    subtitle:
      'சிறப்பை ஊக்குவிக்கவும் மாணவர்களின் ஒட்டுமொத்த வளர்ச்சிக்கும் வடிவமைக்கப்பட்ட நவீன கற்றல் சூழல்கள்.',
  },
  stats: {
    stats: [
      {
        id: 'classrooms',
        target: 50,
        suffix: '+',
        label: 'Classrooms',
        description: 'Modern learning spaces',
      },
      {
        id: 'labs',
        target: 10,
        suffix: '+',
        label: 'Laboratories',
        description: 'Science & computer labs',
      },
      {
        id: 'library',
        target: 1,
        label: 'Main Library',
        description: '15,000+ books & resources',
      },
      {
        id: 'sports',
        target: 5,
        label: 'Sports Facilities',
        description: 'Grounds & courts',
      },
    ],
  },
  grid: {
    eyebrow: 'கற்றல் இடங்கள்',
    heading: 'உலகத்தரம் வாய்ந்த உள்கட்டமைப்பு',
    facilities: [
      {
        id: 'science-labs',
        name: 'அறிவியல் ஆய்வகங்கள்',
        description:
          'நவீன உபகரணங்கள் மற்றும் பாதுகாப்பு அம்சங்களுடன் இயற்பியல், வேதியியல் மற்றும் உயிரியல் ஆய்வகங்கள்.',
        capacity: 'ஒரு ஆய்வகத்திற்கு 40 மாணவர்கள்',
        features: [
          'நவீன உபகரணங்கள்',
          'பாதுகாப்பு இணக்கம்',
          'நடைமுறை கற்றல்',
        ],
      },
      {
        id: 'computer-labs',
        name: 'கணினி ஆய்வகங்கள்',
        description:
          'அதிவேக இணையம் மற்றும் ஐசிடி வகுப்புகளுக்கான புதிய மென்பொருள்களுடன் நவீன கணினி ஆய்வகங்கள்.',
        capacity: 'ஒரு ஆய்வகத்திற்கு 30 மாணவர்கள்',
        features: [
          'அதிவேக இணையம்',
          'புதிய மென்பொருள்கள்',
          'KITS நிரலாக்க மையம்',
        ],
      },
      {
        id: 'library',
        name: 'முதன்மை புத்தகாலயம்',
        description:
          '15,000 க்கும் மேற்பட்ட புத்தகங்கள், டிஜிட்டல் வளங்கள் மற்றும் அமைதியான படிப்பு பகுதிகளுடன் ஒரு விரிவான புத்தகாலயம்.',
        capacity: '100 மாணவர்கள்',
        features: [
          '15,000+ புத்தகங்கள்',
          'டிஜிட்டல் வளங்கள்',
          'படிப்பு பகுதிகள்',
        ],
      },
      {
        id: 'auditorium',
        name: 'பள்ளி அரங்கம்',
        description:
          'கூட்டங்கள், கலாச்சார நிகழ்வுகள் மற்றும் கல்வி விளக்கக்காட்சிகளுக்கான 500 இருக்கைகள் கொண்ட அரங்கம்.',
        capacity: '500 இருக்கைகள்',
        features: [
          'ஒலி அமைப்பு',
          'மேடை ஒளி',
          'பல நோக்க பயன்பாடு',
        ],
      },
      {
        id: 'sports-complex',
        name: 'விளையாட்டு வளாகம்',
        description:
          'துடுப்பாட்ட மைதானம், கால்பந்து மைதானம், கூடைப்பந்து களங்கள் மற்றும் பலவற்றை உள்ளடக்கிய விளையாட்டு வசதிகள்.',
        capacity: 'பல அணிகள்',
        features: [
          'துடுப்பாட்ட மைதானம்',
          'கால்பந்து மைதானம்',
          'கூடைப்பந்து களங்கள்',
        ],
      },
      {
        id: 'canteen',
        name: 'மாணவர் உணவகம்',
        description:
          'மாணவர்கள் மற்றும் ஊழியர்களுக்கு ஊட்டக்குழைப்பு உணவுகளை வழங்கும் சுகாதாரமான மற்றும் மலிவான உணவு சேவை.',
        capacity: '200 மாணவர்கள்',
        features: [
          'சுகாதாரமான தயாரிப்பு',
          'மலிவான விலை',
          'ஊட்டக்குழைப்பு உணவு',
        ],
      },
    ],
  },
  cta: {
    eyebrow: 'எங்களை சந்திக்கவும்',
    title: 'எங்கள் வளாகத்தை அனுபவிக்கவும்',
    subtitle:
      'எங்கள் வளாகத்தை பார்வையிட மற்றும் எங்கள் வசதிகளை நேரடியாகக் காண வரும் எதிர்கால மாணவர்கள் மற்றும் பெற்றோர்களை நாங்கள் வரவேற்கிறோம்.',
    buttonLabel: 'ஒரு விஜயத்தை ஏற்பாடு செய்யவும்',
    buttonHref: '/contact',
  },
};

// Helpers

const FACILITIES_SEED = {
  en: FACILITIES_SEED_EN,
  si: FACILITIES_SEED_SI,
  ta: FACILITIES_SEED_TA,
};

// Seed function

const SECTION_CONFIG = {
  hero: { sectionKey: 'facilities.hero', contentType: 'hero' },
  stats: { sectionKey: 'facilities.stats', contentType: 'stats' },
  grid: { sectionKey: 'facilities.grid', contentType: 'facilitiesGrid' },
  cta: { sectionKey: 'facilities.cta', contentType: 'cta' },
};

export async function seedFacilities(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = FACILITIES_SEED[locale];
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
