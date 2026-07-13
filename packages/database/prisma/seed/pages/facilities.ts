// packages/database/prisma/seed/pages/facilities.ts

import {
  SUPPORTED_LOCALES,
  HERO_BLOCK,
  STATS_BLOCK,
  CTA_BLOCK,
} from '@nexus/contracts';
import type {
  HeroData,
  StatsData,
  CtaData,
  FacilitiesGridData,
} from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:facilities';
const STATUS = 'published';

type FacilitiesPageSeed = {
  hero: HeroData;
  stats: StatsData;
  grid: FacilitiesGridData;
  cta: CtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const FACILITIES_SEED_EN: FacilitiesPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'Campus Infrastructure',
    title: 'Our',
    titleEm: 'Facilities',
    subtitle:
      'Modern learning environments designed to inspire excellence and support holistic student development.',
  },
  stats: {
    blockType: STATS_BLOCK,
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
        slug: 'science-labs',
        name: 'Science Laboratories',
        type: 'laboratory',
        description:
          'Fully equipped physics, chemistry, and biology laboratories with modern equipment and safety features.',
        images: [
          {
            src: '/images/facilities/science-labs.jpg',
            alt: 'Students conducting an experiment in a science laboratory',
          },
        ],
        capacity: 40,
        features: [
          'Modern equipment',
          'Safety compliance',
          'Practical learning',
        ],
      },
      {
        id: 'computer-labs',
        slug: 'computer-labs',
        name: 'Computer Laboratories',
        type: 'laboratory',
        description:
          'State-of-the-art computer labs with high-speed internet and the latest software for ICT education.',
        images: [
          {
            src: '/images/facilities/computer-labs.jpg',
            alt: 'Students working on computers in a computer laboratory',
          },
        ],
        capacity: 30,
        features: [
          'High-speed internet',
          'Latest software',
          'KITS programming hub',
        ],
      },
      {
        id: 'library',
        slug: 'library',
        name: 'Main Library',
        type: 'library',
        description:
          'A comprehensive library with over 15,000 books, digital resources, and quiet study areas.',
        images: [
          {
            src: '/images/facilities/library.jpg',
            alt: 'Interior view of the main library',
          },
        ],
        capacity: 100,
        features: ['15,000+ books', 'Digital resources', 'Study areas'],
      },
      {
        id: 'auditorium',
        slug: 'auditorium',
        name: 'School Auditorium',
        type: 'auditorium',
        description:
          'A 500-seat auditorium for assemblies, cultural events, and academic presentations.',
        images: [
          {
            src: '/images/facilities/auditorium.jpg',
            alt: 'View of the school auditorium',
          },
        ],
        capacity: 500,
        features: ['Sound system', 'Stage lighting', 'Multi-purpose use'],
      },
      {
        id: 'sports-complex',
        slug: 'sports-complex',
        name: 'Sports Complex',
        type: 'sports',
        description:
          'Comprehensive sports facilities including a cricket ground, football field, basketball courts, and more.',
        images: [
          {
            src: '/images/facilities/sports-complex.jpg',
            alt: 'Aerial view of the sports complex',
          },
        ],
        features: ['Cricket ground', 'Football field', 'Basketball courts'],
      },
      {
        id: 'canteen',
        slug: 'canteen',
        name: 'Student Canteen',
        type: 'building',
        description:
          'Hygienic and affordable food service providing nutritious meals for students and staff.',
        images: [
          {
            src: '/images/facilities/canteen.jpg',
            alt: 'Students in the student canteen',
          },
        ],
        capacity: 200,
        features: [
          'Hygienic preparation',
          'Affordable prices',
          'Nutritious meals',
        ],
      },
    ],
  },
  cta: {
    blockType: CTA_BLOCK,
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
    blockType: HERO_BLOCK,
    eyebrow: 'උපකරණ සහ පහසුකම්',
    title: 'අපගේ',
    titleEm: 'පහසුකම්',
    subtitle:
      'විශිෂ්ටත්වය උත්තේජනය කිරීමට සහ සිසුන්ගේ පූර්ණ සංවර්ධනයට සහාය වීමට නිර්මාණය කර ඇති නවීන ඉගෙනුම් පරිසරයන්.',
  },
  stats: {
    blockType: STATS_BLOCK,
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
        slug: 'science-labs',
        name: 'විද්‍යා විද්‍යාගාර',
        type: 'laboratory',
        description:
          'නවීන උපකරණ සහ ආරක්ෂක විශේෂාංග සහිත භෞතික විද්‍යා, රසායන විද්‍යා සහ ජීව විද්‍යා විද්‍යාගාර.',
        images: [
          {
            src: '/images/facilities/science-labs.jpg',
            alt: 'විද්‍යා විද්‍යාගාරයක සිසුන් පරීක්ෂණයක් සිදු කරමින්',
          },
        ],
        capacity: 40,
        features: ['නවීන උපකරණ', 'ආරක්ෂක ප්‍රමිති', 'ප්‍රායෝගික ඉගෙනුම'],
      },
      {
        id: 'computer-labs',
        slug: 'computer-labs',
        name: 'පරිගණක විද්‍යාගාර',
        type: 'laboratory',
        description:
          'අධිවේගී අන්තර්ජාලය සහ තොරතුරු තාක්ෂණ අධ්‍යාපනය සඳහා නවතම මෘදුකාංග සහිත පරිගණක විද්‍යාගාර.',
        images: [
          {
            src: '/images/facilities/computer-labs.jpg',
            alt: 'පරිගණක විද්‍යාගාරයක සිසුන් පරිගණක භාවිතා කරමින්',
          },
        ],
        capacity: 30,
        features: [
          'අධිවේගී අන්තර්ජාලය',
          'නවතම මෘදුකාංග',
          'KITS වැඩසටහන් මධ්‍යස්ථානය',
        ],
      },
      {
        id: 'library',
        slug: 'library',
        name: 'ප්‍රධාන පුස්තකාලය',
        type: 'library',
        description:
          'පොත් 15,000කට වැඩි, ඩිජිටල් සම්පත් සහ නිශ්ශබ්ද අධ්‍යයන ප්‍රදේශ සහිත පුස්තකාලයකි.',
        images: [
          {
            src: '/images/facilities/library.jpg',
            alt: 'ප්‍රධාන පුස්තකාලයේ අභ්‍යන්තර දසුනක්',
          },
        ],
        capacity: 100,
        features: ['පොත් 15,000+', 'ඩිජිටල් සම්පත්', 'අධ්‍යයන ප්‍රදේශ'],
      },
      {
        id: 'auditorium',
        slug: 'auditorium',
        name: 'විද්‍යාල ශ්‍රවණාගාරය',
        type: 'auditorium',
        description:
          'රැස්වීම්, සංස්කෘතික උත්සව සහ අධ්‍යාපනික ඉදිරිපත් කිරීම් සඳහා ආසන 500ක ශ්‍රවණාගාරයකි.',
        images: [
          {
            src: '/images/facilities/auditorium.jpg',
            alt: 'විද්‍යාල ශ්‍රවණාගාරයේ දසුනක්',
          },
        ],
        capacity: 500,
        features: ['ශබ්ද පද්ධතිය', 'වේදිකා ආලෝකකරණය', 'බහුකාර්ය භාවිතය'],
      },
      {
        id: 'sports-complex',
        slug: 'sports-complex',
        name: 'ක්‍රීඩා සංකීර්ණය',
        type: 'sports',
        description:
          'ක්‍රිකට් පිටිය, පාපන්දු පිටිය, පැසිපන්දු පිටි ඇතුළු පුළුල් ක්‍රීඩා පහසුකම්.',
        images: [
          {
            src: '/images/facilities/sports-complex.jpg',
            alt: 'ක්‍රීඩා සංකීර්ණයේ අහස් දසුනක්',
          },
        ],
        features: ['ක්‍රිකට් පිටිය', 'පාපන්දු පිටිය', 'පැසිපන්දු පිටි'],
      },
      {
        id: 'canteen',
        slug: 'canteen',
        name: 'ශිෂ්‍ය ආපන ශාලාව',
        type: 'building',
        description:
          'සිසුන්ට සහ කාර්ය මණ්ඩලයට පෝෂ්‍යදායී ආහාර සපයන සනීපාරක්ෂක හා මිල අඩු ආහාර සේවාවකි.',
        images: [
          {
            src: '/images/facilities/canteen.jpg',
            alt: 'ශිෂ්‍ය ආපන ශාලාවේ සිසුන්',
          },
        ],
        capacity: 200,
        features: ['සනීපාරක්ෂක සැකසුම', 'මිල අඩු', 'පෝෂ්‍යදායී ආහාර'],
      },
    ],
  },
  cta: {
    blockType: CTA_BLOCK,
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
    blockType: HERO_BLOCK,
    eyebrow: 'வளாக உள்கட்டமைப்பு',
    title: 'எங்கள்',
    titleEm: 'வசதிகள்',
    subtitle:
      'சிறப்பை ஊக்குவிக்கவும் மாணவர்களின் முழுமையான வளர்ச்சிக்கும் வடிவமைக்கப்பட்ட நவீன கற்றல் சூழல்கள்.',
  },
  stats: {
    blockType: STATS_BLOCK,
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
        slug: 'science-labs',
        name: 'அறிவியல் ஆய்வகங்கள்',
        type: 'laboratory',
        description:
          'நவீன உபகரணங்கள் மற்றும் பாதுகாப்பு அம்சங்களுடன் இயற்பியல், வேதியியல் மற்றும் உயிரியல் ஆய்வகங்கள்.',
        images: [
          {
            src: '/images/facilities/science-labs.jpg',
            alt: 'அறிவியல் ஆய்வகத்தில் ஒரு பரிசோதனையை மேற்கொள்ளும் மாணவர்கள்',
          },
        ],
        capacity: 40,
        features: ['நவீன உபகரணங்கள்', 'பாதுகாப்பு இணக்கம்', 'நடைமுறை கற்றல்'],
      },
      {
        id: 'computer-labs',
        slug: 'computer-labs',
        name: 'கணினி ஆய்வகங்கள்',
        type: 'laboratory',
        description:
          'அதிவேக இணையம் மற்றும் ஐசிடி கல்விக்கான புதிய மென்பொருள்களுடன் நவீன கணினி ஆய்வகங்கள்.',
        images: [
          {
            src: '/images/facilities/computer-labs.jpg',
            alt: 'கணினி ஆய்வகத்தில் கணினிகளில் பணிபுரியும் மாணவர்கள்',
          },
        ],
        capacity: 30,
        features: [
          'அதிவேக இணையம்',
          'புதிய மென்பொருள்கள்',
          'KITS நிரலாக்க மையம்',
        ],
      },
      {
        id: 'library',
        slug: 'library',
        name: 'முதன்மை நூலகம்',
        type: 'library',
        description:
          '15,000 க்கும் மேற்பட்ட புத்தகங்கள், டிஜிட்டல் வளங்கள் மற்றும் அமைதியான படிப்பு பகுதிகளுடன் ஒரு விரிவான நூலகம்.',
        images: [
          {
            src: '/images/facilities/library.jpg',
            alt: 'முதன்மை நூலகத்தின் உள்புற காட்சி',
          },
        ],
        capacity: 100,
        features: [
          '15,000+ புத்தகங்கள்',
          'டிஜிட்டல் வளங்கள்',
          'படிப்பு பகுதிகள்',
        ],
      },
      {
        id: 'auditorium',
        slug: 'auditorium',
        name: 'பள்ளி அரங்கம்',
        type: 'auditorium',
        description:
          'கூட்டங்கள், கலாச்சார நிகழ்வுகள் மற்றும் கல்வி விளக்கக்காட்சிகளுக்கான 500 இருக்கைகள் கொண்ட அரங்கம்.',
        images: [
          {
            src: '/images/facilities/auditorium.jpg',
            alt: 'பள்ளி அரங்கத்தின் காட்சி',
          },
        ],
        capacity: 500,
        features: ['ஒலி அமைப்பு', 'மேடை ஒளி', 'பல நோக்க பயன்பாடு'],
      },
      {
        id: 'sports-complex',
        slug: 'sports-complex',
        name: 'விளையாட்டு வளாகம்',
        type: 'sports',
        description:
          'துடுப்பாட்ட மைதானம், கால்பந்து மைதானம், கூடைப்பந்து களங்கள் மற்றும் பலவற்றை உள்ளடக்கிய விளையாட்டு வசதிகள்.',
        images: [
          {
            src: '/images/facilities/sports-complex.jpg',
            alt: 'விளையாட்டு வளாகத்தின் வான்வழிக் காட்சி',
          },
        ],
        features: [
          'துடுப்பாட்ட மைதானம்',
          'கால்பந்து மைதானம்',
          'கூடைப்பந்து களங்கள்',
        ],
      },
      {
        id: 'canteen',
        slug: 'canteen',
        name: 'மாணவர் உணவகம்',
        type: 'building',
        description:
          'மாணவர்கள் மற்றும் ஊழியர்களுக்கு சத்தான உணவுகளை வழங்கும் சுகாதாரமான மற்றும் மலிவான உணவு சேவை.',
        images: [
          {
            src: '/images/facilities/canteen.jpg',
            alt: 'மாணவர் உணவகத்தில் மாணவர்கள்',
          },
        ],
        capacity: 200,
        features: ['சுகாதாரமான தயாரிப்பு', 'மலிவான விலை', 'சத்தான உணவு'],
      },
    ],
  },
  cta: {
    blockType: CTA_BLOCK,
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
