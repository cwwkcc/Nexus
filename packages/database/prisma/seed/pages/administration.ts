// packages/database/prisma/seed/pages/administration.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';
import type {
  AdministrationHeroData,
  AdministrationPrincipalData,
  AdministrationStaffGridData,
  AdministrationAdvisoryBoardData,
  AdministrationContactData,
} from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:administration';
const STATUS = 'published';

type AdministrationPageSeed = {
  hero: AdministrationHeroData;
  principal: AdministrationPrincipalData;
  vicePrincipals: AdministrationStaffGridData;
  headsOfDepartment: AdministrationStaffGridData;
  advisoryBoard: AdministrationAdvisoryBoardData;
  contact: AdministrationContactData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const ADMINISTRATION_SEED_EN: AdministrationPageSeed = {
  hero: {
    title: 'School Administration',
    subtitle: 'Meet the dedicated team driving excellence at Nexus College.',
    eyebrow: 'Leadership',
  },
  principal: {
    eyebrow: 'Our Principal',
    principal: {
      variant: 'principal',
      name: 'Dr. Jane Smith',
      title: 'Principal',
      tenure: '2018 - Present',
      quote:
        'Education is not just about academics; it is about building character and fostering a lifelong love for learning.',
      imageSrc: '/images/staff/principal.jpg',
      imageAlt: 'Portrait of Dr. Jane Smith',
      href: '/staff/jane-smith',
    },
  },
  vicePrincipals: {
    eyebrow: 'Vice Principals',
    heading: 'Academic & Administrative Leadership',
    staff: [
      {
        variant: 'grid',
        name: 'Mr. John Doe',
        title: 'Vice Principal (Academics)',
        portfolio: 'Curriculum & Examinations',
        tenure: '2015 - Present',
        imageSrc: '/images/staff/vp-academics.jpg',
      },
      {
        variant: 'grid',
        name: 'Mrs. Mary Johnson',
        title: 'Vice Principal (Administration)',
        portfolio: 'Operations & Discipline',
        tenure: '2020 - Present',
        imageSrc: '/images/staff/vp-admin.jpg',
      },
    ],
  },
  headsOfDepartment: {
    eyebrow: 'Heads of Department',
    heading: 'Subject Area Leadership',
    staff: [
      {
        variant: 'grid',
        name: 'Mr. Alan Turing',
        title: 'Head of Mathematics',
        portfolio: 'Advanced Mathematics',
        imageSrc: '/images/staff/hod-math.jpg',
      },
      {
        variant: 'grid',
        name: 'Dr. Marie Curie',
        title: 'Head of Science',
        portfolio: 'Physics & Chemistry',
        imageSrc: '/images/staff/hod-science.jpg',
      },
      {
        variant: 'grid',
        name: 'Ms. Virginia Woolf',
        title: 'Head of Languages',
        portfolio: 'English Literature',
        imageSrc: '/images/staff/hod-languages.jpg',
      },
    ],
  },
  advisoryBoard: {
    eyebrow: 'Advisory Board',
    heading: 'Strategic Guidance',
    description:
      'The Advisory Board comprises distinguished alumni and professionals who provide strategic direction.',
    members: [
      {
        variant: 'compact',
        name: 'Sir Arthur C. Clarke',
        title: 'Chairman, Advisory Board',
      },
      {
        variant: 'compact',
        name: 'Prof. Albert Einstein',
        title: 'Academic Advisor',
      },
      {
        variant: 'compact',
        name: 'Ms. Ada Lovelace',
        title: 'Technology & Innovation Advisor',
      },
    ],
  },
  contact: {
    title: 'Contact Administration',
    subtitle:
      'Get in touch with the school office for any administrative queries.',
    buttonLabel: 'Contact Us',
    buttonHref: '/contact',
  },
};

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const ADMINISTRATION_SEED_SI: AdministrationPageSeed = {
  hero: {
    title: 'පාසල් පරිපාලනය',
    subtitle: 'Nexus විද්‍යාලයේ විශිෂ්ටත්වය මෙහෙයවන කැපවූ කණ්ඩායම.',
    eyebrow: 'නායකත්වය',
  },
  principal: {
    eyebrow: 'අපගේ විදුහල්පතිතුමිය',
    principal: {
      variant: 'principal',
      name: 'ආචාර්ය ජේන් ස්මිත්',
      title: 'විදුහල්පතිතුමිය',
      tenure: '2018 - වර්තමානය',
      quote:
        'අධ්‍යාපනය යනු හුදෙක් ශාස්ත්‍රීය දැනුම පමණක් නොවේ; එය චරිතය ගොඩනැගීම සහ ඉගෙනීමට ජීවිත කාලය පුරාම ආදරය කිරීමයි.',
      href: '/staff/jane-smith',
    },
  },
  vicePrincipals: {
    eyebrow: 'නියෝජ්‍ය විදුහල්පතිවරුන්',
    heading: 'ශාස්ත්‍රීය හා පරිපාලන නායකත්වය',
    staff: [
      {
        variant: 'grid',
        name: 'ජෝන් ඩෝ මහතා',
        title: 'නියෝජ්‍ය විදුහල්පති (ශාස්ත්‍රීය)',
        portfolio: 'විෂය මාලාව සහ විභාග',
        tenure: '2015 - වර්තමානය',
        imageSrc: '/images/staff/vp-academics.jpg',
      },
      {
        variant: 'grid',
        name: 'මේරි ජොන්සන් මහත්මිය',
        title: 'නියෝජ්‍ය විදුහල්පති (පරිපාලන)',
        portfolio: 'මෙහෙයුම් සහ විනය',
        tenure: '2020 - වර්තමානය',
        imageSrc: '/images/staff/vp-admin.jpg',
      },
    ],
  },
  headsOfDepartment: {
    eyebrow: 'අංශ ප්‍රධානීන්',
    heading: 'විෂය ක්ෂේත්‍ර නායකත්වය',
    staff: [
      {
        variant: 'grid',
        name: 'ඇලන් ටියුරින් මහතා',
        title: 'ගණිත අංශ ප්‍රධානී',
        portfolio: 'උසස් ගණිතය',
        imageSrc: '/images/staff/hod-math.jpg',
      },
      {
        variant: 'grid',
        name: 'ආචාර්ය මාරි කියුරි',
        title: 'විද්‍යා අංශ ප්‍රධානී',
        portfolio: 'භෞතික හා රසායන විද්‍යාව',
        imageSrc: '/images/staff/hod-science.jpg',
      },
      {
        variant: 'grid',
        name: 'වර්ජීනියා වුල්ෆ් මහත්මිය',
        title: 'භාෂා අංශ ප්‍රධානී',
        portfolio: 'ඉංග්‍රීසි සාහිත්‍යය',
        imageSrc: '/images/staff/hod-languages.jpg',
      },
    ],
  },
  advisoryBoard: {
    eyebrow: 'උපදේශක මණ්ඩලය',
    heading: 'උපායමාර්ගික මගපෙන්වීම',
    description:
      'උපදේශක මණ්ඩලය සමන්විත වන්නේ උපායමාර්ගික දිශාව සපයන කීර්තිමත් ආදි ශිෂ්‍යයින් සහ වෘත්තිකයන්ගෙන්.',
    members: [
      {
        variant: 'compact',
        name: 'ආතර් සී. ක්ලාක් මහතා',
        title: 'සභාපති',
      },
      {
        variant: 'compact',
        name: 'මහාචාර්ය ඇල්බට් අයින්ස්ටයින්',
        title: 'ශාස්ත්‍රීය උපදේශක',
      },
      {
        variant: 'compact',
        name: 'ඇඩා ලව්ලේස් මහත්මිය',
        title: 'තාක්ෂණ හා නවෝත්පාදන උපදේශක',
      },
    ],
  },
  contact: {
    title: 'පරිපාලනය සම්බන්ධ කරගන්න',
    subtitle: 'ඕනෑම පරිපාලන විමසීමක් සඳහා පාසල් කාර්යාලය හා සම්බන්ධ වන්න.',
    buttonLabel: 'අප අමතන්න',
    buttonHref: '/contact',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const ADMINISTRATION_SEED_TA: AdministrationPageSeed = {
  hero: {
    title: 'பள்ளி நிர்வாகம்',
    subtitle: 'நெக்ஸஸ் கல்லூரியில் சிறப்பை வழிநடத்தும் அர்ப்பணிப்புள்ள குழு.',
    eyebrow: 'தலைமைத்துவம்',
  },
  principal: {
    eyebrow: 'எங்கள் அதிபர்',
    principal: {
      variant: 'principal',
      name: 'டாக்டர் ஜேன் ஸ்மித்',
      title: 'அதிபர்',
      tenure: '2018 - தற்போது',
      quote:
        'கல்வி என்பது வெறும் கல்வியியல் மட்டுமல்ல; அது குணத்தை உருவாக்குவது மற்றும் வாழ்நாள் முழுவதும் கற்பதில் ஆர்வத்தை வளர்ப்பது.',
      href: '/staff/jane-smith',
    },
  },
  vicePrincipals: {
    eyebrow: 'துணை அதிபர்கள்',
    heading: 'கல்வி மற்றும் நிர்வாகத் தலைமை',
    staff: [
      {
        variant: 'grid',
        name: 'திரு. ஜான் டோ',
        title: 'துணை அதிபர் (கல்வி)',
        portfolio: 'பாடத்திட்டம் மற்றும் தேர்வுகள்',
        tenure: '2015 - தற்போது',
        imageSrc: '/images/staff/vp-academics.jpg',
      },
      {
        variant: 'grid',
        name: 'திருமதி மேரி ஜான்சன்',
        title: 'துணை அதிபர் (நிர்வாகம்)',
        portfolio: 'செயல்பாடுகள் மற்றும் ஒழுக்கம்',
        tenure: '2020 - தற்போது',
        imageSrc: '/images/staff/vp-admin.jpg',
      },
    ],
  },
  headsOfDepartment: {
    eyebrow: 'துறைத் தலைவர்கள்',
    heading: 'பாடப் பிரிவுத் தலைமை',
    staff: [
      {
        variant: 'grid',
        name: 'திரு. ஆலன் டூரிங்',
        title: 'கணிதத் துறைத் தலைவர்',
        portfolio: 'மேம்பட்ட கணிதம்',
        imageSrc: '/images/staff/hod-math.jpg',
      },
      {
        variant: 'grid',
        name: 'டாக்டர் மேரி கியூரி',
        title: 'அறிவியல் துறைத் தலைவர்',
        portfolio: 'இயற்பியல் மற்றும் வேதியியல்',
        imageSrc: '/images/staff/hod-science.jpg',
      },
      {
        variant: 'grid',
        name: 'திருமதி வர்ஜீனியா வூல்ஃப்',
        title: 'மொழித்துறைத் தலைவர்',
        portfolio: 'ஆங்கில இலக்கியம்',
        imageSrc: '/images/staff/hod-languages.jpg',
      },
    ],
  },
  advisoryBoard: {
    eyebrow: 'ஆலோசனைக் குழு',
    heading: 'மூலோபாய வழிகாட்டுதல்',
    description:
      'மூலோபாய வழிகாட்டுதலை வழங்கும் புகழ்பெற்ற முன்னாள் மாணவர்கள் மற்றும் நிபுணர்களை ஆலோசனைக் குழு கொண்டுள்ளது.',
    members: [
      {
        variant: 'compact',
        name: 'சர் ஆர்தர் சி. கிளார்க்',
        title: 'தலைவர்',
      },
      {
        variant: 'compact',
        name: 'பேராசிரியர் ஆல்பர்ட் ஐன்ஸ்டீன்',
        title: 'கல்வி ஆலோசகர்',
      },
      {
        variant: 'compact',
        name: 'திருமதி அடா லவ்லேஸ்',
        title: 'தொழில்நுட்ப மற்றும் புதுமை ஆலோசகர்',
      },
    ],
  },
  contact: {
    title: 'நிர்வாகத்தை தொடர்பு கொள்ள',
    subtitle:
      'எந்தவொரு நிர்வாக வினவல்களுக்கும் பள்ளி அலுவலகத்தை தொடர்பு கொள்ளவும்.',
    buttonLabel: 'தொடர்பு கொள்ள',
    buttonHref: '/contact',
  },
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const SECTION_CONFIG = {
  hero: { sectionKey: 'administration.hero', contentType: 'hero' },
  principal: {
    sectionKey: 'administration.principal',
    contentType: 'richText',
  },
  vicePrincipals: {
    sectionKey: 'administration.vicePrincipals',
    contentType: 'richText',
  },
  headsOfDepartment: {
    sectionKey: 'administration.headsOfDepartment',
    contentType: 'richText',
  },
  advisoryBoard: {
    sectionKey: 'administration.advisoryBoard',
    contentType: 'richText',
  },
  contact: { sectionKey: 'administration.contact', contentType: 'cta' },
};

const ADMINISTRATION_SEED = {
  en: ADMINISTRATION_SEED_EN,
  si: ADMINISTRATION_SEED_SI,
  ta: ADMINISTRATION_SEED_TA,
};

export async function seedAdministration(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = ADMINISTRATION_SEED[locale];
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
