// packages/database/prisma/seed/pages/facilities.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';
import type {
  FacilitiesHeroData,
  FacilitiesStatsData,
  FacilitiesGridData,
  FacilitiesCtaData,
} from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:facilities';
const STATUS = 'published';

type FacilitiesPageSeed = {
  hero: FacilitiesHeroData;
  stats: FacilitiesStatsData;
  grid: FacilitiesGridData;
  cta: FacilitiesCtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const FACILITIES_SEED_EN: FacilitiesPageSeed = {
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
        features: ['15,000+ books', 'Digital resources', 'Study areas'],
      },
      {
        id: 'auditorium',
        name: 'School Auditorium',
        description:
          'A 500-seat auditorium for assemblies, cultural events, and academic presentations.',
        capacity: '500 seats',
        features: ['Sound system', 'Stage lighting', 'Multi-purpose use'],
      },
      {
        id: 'sports-complex',
        name: 'Sports Complex',
        description:
          'Comprehensive sports facilities including a cricket ground, football field, basketball courts, and more.',
        capacity: 'Multiple teams',
        features: ['Cricket ground', 'Football field', 'Basketball courts'],
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

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const FACILITIES_SEED_SI: FacilitiesPageSeed = {
  hero: {
    eyebrow: 'උපකරණ සහ පහසුකම්',
    title: 'අපගේ',
    titleEm: 'පහසුකම්',
    subtitle:
      'විශිෂ්ටත්වය උත්තේජනය කිරීමට සහ සිසුන්ගේ පූර්ණ සංවර්ධනයට සහාය වීමට නිර්මාණය කර ඇති නවීන ඉගෙනුම් පරිසරයන්.',
  },
  stats: {
    stats: [
      {
        id: 'classrooms',
        target: 50,
        suffix: '+',
        label: 'පන්ති කාමර',
        description: 'නවීන ඉගෙනුම් අවකාශයන්',
      },
      {
        id: 'labs',
        target: 10,
        suffix: '+',
        label: 'විද්‍යාගාර',
        description: 'විද්‍යා හා පරිගණක විද්‍යාගාර',
      },
      {
        id: 'library',
        target: 1,
        label: 'ප්‍රධාන පුස්තකාලය',
        description: 'පොත් 15,000+ හා සම්පත්',
      },
      {
        id: 'sports',
        target: 5,
        label: 'ක්‍රීඩා පහසුකම්',
        description: 'පිටි හා ක්‍රීඩාංගණ',
      },
    ],
  },
  grid: {
    eyebrow: 'ඉගෙනුම් අවකාශයන්',
    heading: 'ලෝක මට්ටමේ යටිතල පහසුකම්',
    facilities: [
      {
        id: 'science-labs',
        name: 'විද්‍යා විද්‍යාගාර',
        description:
          'නවීන උපකරණ සහ ආරක්ෂක විශේෂාංග සහිත භෞතික විද්‍යා, රසායන විද්‍යා සහ ජීව විද්‍යා විද්‍යාගාර.',
        capacity: 'විද්‍යාගාරයකට සිසුන් 40ක්',
        features: ['නවීන උපකරණ', 'ආරක්ෂක ප්‍රමිති', 'ප්‍රායෝගික ඉගෙනුම'],
      },
      {
        id: 'computer-labs',
        name: 'පරිගණක විද්‍යාගාර',
        description:
          'අධිවේගී අන්තර්ජාලය සහ තොරතුරු තාක්ෂණ අධ්‍යාපනය සඳහා නවතම මෘදුකාංග සහිත පරිගණක විද්‍යාගාර.',
        capacity: 'විද්‍යාගාරයකට සිසුන් 30ක්',
        features: [
          'අධිවේගී අන්තර්ජාලය',
          'නවතම මෘදුකාංග',
          'KITS වැඩසටහන් මධ්‍යස්ථානය',
        ],
      },
      {
        id: 'library',
        name: 'ප්‍රධාන පුස්තකාලය',
        description:
          'පොත් 15,000කට වැඩි, ඩිජිටල් සම්පත් සහ නිශ්ශබ්ද අධ්‍යයන ප්‍රදේශ සහිත පුස්තකාලයකි.',
        capacity: 'සිසුන් 100ක්',
        features: ['පොත් 15,000+', 'ඩිජිටල් සම්පත්', 'අධ්‍යයන ප්‍රදේශ'],
      },
      {
        id: 'auditorium',
        name: 'විද්‍යාල ශ්‍රවණාගාරය',
        description:
          'රැස්වීම්, සංස්කෘතික උත්සව සහ අධ්‍යාපනික ඉදිරිපත් කිරීම් සඳහා ආසන 500ක ශ්‍රවණාගාරයකි.',
        capacity: 'ආසන 500',
        features: ['ශබ්ද පද්ධතිය', 'වේදිකා ආලෝකකරණය', 'බහුකාර්ය භාවිතය'],
      },
      {
        id: 'sports-complex',
        name: 'ක්‍රීඩා සංකීර්ණය',
        description:
          'ක්‍රිකට් පිටිය, පාපන්දු පිටිය, පැසිපන්දු පිටි ඇතුළු පුළුල් ක්‍රීඩා පහසුකම්.',
        capacity: 'කණ්ඩායම් බොහොමයක්',
        features: ['ක්‍රිකට් පිටිය', 'පාපන්දු පිටිය', 'පැසිපන්දු පිටි'],
      },
      {
        id: 'canteen',
        name: 'ශිෂ්‍ය ආපන ශාලාව',
        description:
          'සිසුන්ට සහ කාර්ය මණ්ඩලයට පෝෂ්‍යදායී ආහාර සපයන සනීපාරක්ෂක හා මිල අඩු ආහාර සේවාවකි.',
        capacity: 'සිසුන් 200ක්',
        features: ['සනීපාරක්ෂක සැකසුම', 'මිල අඩු', 'පෝෂ්‍යදායී ආහාර'],
      },
    ],
  },
  cta: {
    eyebrow: 'අප බලන්න එන්න',
    title: 'අපගේ විද්‍යාලය අත්දකින්න',
    subtitle:
      'අනාගත සිසුන්ට සහ දෙමාපියන්ට අපගේ විද්‍යාලය නැරඹීමට සහ අපගේ පහසුකම් ස්වයංක්‍රීයව දැක බැලීමට අපි ආරාධනා කරමු.',
    buttonLabel: 'සංචාරයක් සැලසුම් කරන්න',
    buttonHref: '/contact',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const FACILITIES_SEED_TA: FacilitiesPageSeed = {
  hero: {
    eyebrow: 'வளாக உள்கட்டமைப்பு',
    title: 'எங்கள்',
    titleEm: 'வசதிகள்',
    subtitle:
      'சிறப்பை ஊக்குவிக்கவும் மாணவர்களின் முழுமையான வளர்ச்சிக்கும் வடிவமைக்கப்பட்ட நவீன கற்றல் சூழல்கள்.',
  },
  stats: {
    stats: [
      {
        id: 'classrooms',
        target: 50,
        suffix: '+',
        label: 'வகுப்பறைகள்',
        description: 'நவீன கற்றல் இடங்கள்',
      },
      {
        id: 'labs',
        target: 10,
        suffix: '+',
        label: 'ஆய்வகங்கள்',
        description: 'அறிவியல் & கணினி ஆய்வகங்கள்',
      },
      {
        id: 'library',
        target: 1,
        label: 'முதன்மை நூலகம்',
        description: '15,000+ புத்தகங்கள் & வளங்கள்',
      },
      {
        id: 'sports',
        target: 5,
        label: 'விளையாட்டு வசதிகள்',
        description: 'மைதானங்கள் & ஆடுகளங்கள்',
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
        features: ['நவீன உபகரணங்கள்', 'பாதுகாப்பு இணக்கம்', 'நடைமுறை கற்றல்'],
      },
      {
        id: 'computer-labs',
        name: 'கணினி ஆய்வகங்கள்',
        description:
          'அதிவேக இணையம் மற்றும் ஐசிடி கல்விக்கான புதிய மென்பொருள்களுடன் நவீன கணினி ஆய்வகங்கள்.',
        capacity: 'ஒரு ஆய்வகத்திற்கு 30 மாணவர்கள்',
        features: [
          'அதிவேக இணையம்',
          'புதிய மென்பொருள்கள்',
          'KITS நிரலாக்க மையம்',
        ],
      },
      {
        id: 'library',
        name: 'முதன்மை நூலகம்',
        description:
          '15,000 க்கும் மேற்பட்ட புத்தகங்கள், டிஜிட்டல் வளங்கள் மற்றும் அமைதியான படிப்பு பகுதிகளுடன் ஒரு விரிவான நூலகம்.',
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
        features: ['ஒலி அமைப்பு', 'மேடை ஒளி', 'பல நோக்க பயன்பாடு'],
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
          'மாணவர்கள் மற்றும் ஊழியர்களுக்கு சத்தான உணவுகளை வழங்கும் சுகாதாரமான மற்றும் மலிவான உணவு சேவை.',
        capacity: '200 மாணவர்கள்',
        features: ['சுகாதாரமான தயாரிப்பு', 'மலிவான விலை', 'சத்தான உணவு'],
      },
    ],
  },
  cta: {
    eyebrow: 'எங்களை சந்திக்கவும்',
    title: 'எங்கள் வளாகத்தை அனுபவிக்கவும்',
    subtitle:
      'எதிர்கால மாணவர்கள் மற்றும் பெற்றோர்கள் எங்கள் வளாகத்தை பார்வையிடவும், எங்கள் வசதிகளை நேரில் காணவும் நாங்கள் வரவேற்கிறோம்.',
    buttonLabel: 'ஒரு விஜயத்தை ஏற்பாடு செய்யவும்',
    buttonHref: '/contact',
  },
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const SECTION_CONFIG = {
  hero: { sectionKey: 'facilities.hero', contentType: 'hero' },
  stats: { sectionKey: 'facilities.stats', contentType: 'stats' },
  grid: { sectionKey: 'facilities.grid', contentType: 'facilitiesGrid' },
  cta: { sectionKey: 'facilities.cta', contentType: 'cta' },
};

const FACILITIES_SEED = {
  en: FACILITIES_SEED_EN,
  si: FACILITIES_SEED_SI,
  ta: FACILITIES_SEED_TA,
};

export async function seedFacilities(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = FACILITIES_SEED[locale];
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
