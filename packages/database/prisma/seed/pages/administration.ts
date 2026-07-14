// packages/database/prisma/seed/pages/administration.ts

import { SUPPORTED_LOCALES, HERO_BLOCK, CTA_BLOCK } from '@nexus/contracts';
import type { HeroData, CtaData, AdministrationStatementData, AdministrationPrincipalData, AdministrationStaffGridData, AdministrationSdsData } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:administration';
const STATUS = 'published';

// The administration registry (registry/page-registry/administration.ts) was
// rebuilt from scratch to match the real page spec: Principal, Deputy
// Principals, Assistant Principals, Head Prefects, and the School
// Development Society — all StaffSchema entries, no bespoke "Advisory
// Board" content type. This seed follows that structure.

type AdministrationPageSeed = {
  hero: HeroData;
  institutional: AdministrationStatementData;
  principal: AdministrationPrincipalData;
  deputyPrincipals: AdministrationStaffGridData;
  assistantPrincipals: AdministrationStaffGridData;
  headPrefects: AdministrationStaffGridData;
  sds: AdministrationSdsData;
  contact: CtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const ADMINISTRATION_SEED_EN: AdministrationPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'Leadership',
    title: 'School Administration',
    subtitle: 'Meet the dedicated team driving excellence at Nexus College.',
  },
  institutional: {
    body: 'Administration at Nexus exists to serve the classroom — every policy, budget, and appointment is judged by whether it helps a teacher teach and a student learn.',
  },
  principal: {
    eyebrow: 'Our Principal',
    principal: {
      id: 'staff-principal',
      name: 'Dr. Jane Smith',
      role: 'principal',
      designation: 'Principal',
      tenure: '2018 - Present',
      quote: 'Education is not just about academics; it is about building character and fostering a lifelong love for learning.',
      portrait: {
        src: '/images/staff/principal.jpg',
        alt: 'Portrait of Dr. Jane Smith',
      },
      contactEmail: 'principal@nexus.edu',
    },
    messageLinkHref: '/staff/jane-smith',
  },
  deputyPrincipals: {
    eyebrow: 'Deputy Principals',
    heading: 'Academic & Administrative Leadership',
    staff: [
      {
        id: 'staff-deputy-academics',
        name: 'Mr. John Doe',
        role: 'deputy-principal',
        designation: 'Deputy Principal (Academics)',
        portfolio: 'Curriculum & Examinations',
        tenure: '2015 - Present',
        portrait: {
          src: '/images/staff/vp-academics.jpg',
          alt: 'Portrait of Mr. John Doe',
        },
      },
      {
        id: 'staff-deputy-admin',
        name: 'Mrs. Mary Johnson',
        role: 'deputy-principal',
        designation: 'Deputy Principal (Administration)',
        portfolio: 'Operations & Discipline',
        tenure: '2020 - Present',
        portrait: {
          src: '/images/staff/vp-admin.jpg',
          alt: 'Portrait of Mrs. Mary Johnson',
        },
      },
    ],
  },
  assistantPrincipals: {
    eyebrow: 'Assistant Principals',
    heading: 'Subject Area Leadership',
    staff: [
      {
        id: 'staff-ap-mathematics',
        name: 'Mr. Alan Turing',
        role: 'assistant-principal',
        designation: 'Assistant Principal (Mathematics)',
        department: 'mathematics',
        portfolio: 'Advanced Mathematics',
        portrait: {
          src: '/images/staff/hod-math.jpg',
          alt: 'Portrait of Mr. Alan Turing',
        },
      },
      {
        id: 'staff-ap-science',
        name: 'Dr. Marie Curie',
        role: 'assistant-principal',
        designation: 'Assistant Principal (Science)',
        department: 'science',
        portfolio: 'Physics & Chemistry',
        portrait: {
          src: '/images/staff/hod-science.jpg',
          alt: 'Portrait of Dr. Marie Curie',
        },
      },
      {
        id: 'staff-ap-languages',
        name: 'Ms. Virginia Woolf',
        role: 'assistant-principal',
        designation: 'Assistant Principal (Languages)',
        department: 'languages',
        portfolio: 'English Literature',
        portrait: {
          src: '/images/staff/hod-languages.jpg',
          alt: 'Portrait of Ms. Virginia Woolf',
        },
      },
    ],
  },
  headPrefects: {
    eyebrow: 'Head Prefects',
    heading: 'Student Leadership (2025/2026)',
    staff: [
      {
        id: 'staff-head-prefect',
        name: 'Ravindu Jayasinghe',
        role: 'head-prefect',
        designation: 'Head Prefect',
      },
      {
        id: 'staff-deputy-head-prefect',
        name: 'Senuri Wickramasinghe',
        role: 'head-prefect',
        designation: 'Deputy Head Prefect',
      },
    ],
  },
  sds: {
    description: 'The School Development Society brings together parents, alumni, and staff to support infrastructure projects and extracurricular development beyond the annual government budget.',
    contact: 'sds@nexus.edu',
    linkHref: '/administration/sds',
  },
  contact: {
    blockType: CTA_BLOCK,
    title: 'Contact Administration',
    subtitle: 'Get in touch with the school office for any administrative queries.',
    buttonLabel: 'Contact Us',
    buttonHref: '/contact',
  },
};

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const ADMINISTRATION_SEED_SI: AdministrationPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'නායකත්වය',
    title: 'පාසල් පරිපාලනය',
    subtitle: 'Nexus විද්‍යාලයේ විශිෂ්ටත්වය මෙහෙයවන කැපවූ කණ්ඩායම.',
  },
  institutional: {
    body: 'Nexus හි පරිපාලනය පවතින්නේ පන්ති කාමරයට සේවය කිරීම සඳහාය — සෑම ප්‍රතිපත්තියක්ම, අයවැයක්ම, පත්වීමක්ම විනිශ්චය කරනු ලබන්නේ එය ගුරුවරයෙකුට උගැන්වීමට සහ සිසුවෙකුට ඉගෙනීමට උපකාරී වේද යන්න මතය.',
  },
  principal: {
    eyebrow: 'අපගේ විදුහල්පතිතුමිය',
    principal: {
      id: 'staff-principal',
      name: 'ආචාර්ය ජේන් ස්මිත්',
      role: 'principal',
      designation: 'විදුහල්පතිතුමිය',
      tenure: '2018 - වර්තමානය',
      quote: 'අධ්‍යාපනය යනු හුදෙක් ශාස්ත්‍රීය දැනුම පමණක් නොවේ; එය චරිතය ගොඩනැගීම සහ ඉගෙනීමට ජීවිත කාලය පුරාම ආදරය කිරීමයි.',
      portrait: {
        src: '/images/staff/principal.jpg',
        alt: 'ආචාර්ය ජේන් ස්මිත් මහත්මියගේ ඡායාරූපය',
      },
      contactEmail: 'principal@nexus.edu',
    },
    messageLinkHref: '/staff/jane-smith',
  },
  deputyPrincipals: {
    eyebrow: 'නියෝජ්‍ය විදුහල්පතිවරුන්',
    heading: 'ශාස්ත්‍රීය හා පරිපාලන නායකත්වය',
    staff: [
      {
        id: 'staff-deputy-academics',
        name: 'ජෝන් ඩෝ මහතා',
        role: 'deputy-principal',
        designation: 'නියෝජ්‍ය විදුහල්පති (ශාස්ත්‍රීය)',
        portfolio: 'විෂය මාලාව සහ විභාග',
        tenure: '2015 - වර්තමානය',
        portrait: {
          src: '/images/staff/vp-academics.jpg',
          alt: 'ජෝන් ඩෝ මහතාගේ ඡායාරූපය',
        },
      },
      {
        id: 'staff-deputy-admin',
        name: 'මේරි ජොන්සන් මහත්මිය',
        role: 'deputy-principal',
        designation: 'නියෝජ්‍ය විදුහල්පති (පරිපාලන)',
        portfolio: 'මෙහෙයුම් සහ විනය',
        tenure: '2020 - වර්තමානය',
        portrait: {
          src: '/images/staff/vp-admin.jpg',
          alt: 'මේරි ජොන්සන් මහත්මියගේ ඡායාරූපය',
        },
      },
    ],
  },
  assistantPrincipals: {
    eyebrow: 'සහකාර විදුහල්පතිවරුන්',
    heading: 'විෂය ක්ෂේත්‍ර නායකත්වය',
    staff: [
      {
        id: 'staff-ap-mathematics',
        name: 'ඇලන් ටියුරින් මහතා',
        role: 'assistant-principal',
        designation: 'සහකාර විදුහල්පති (ගණිතය)',
        department: 'mathematics',
        portfolio: 'උසස් ගණිතය',
        portrait: {
          src: '/images/staff/hod-math.jpg',
          alt: 'ඇලන් ටියුරින් මහතාගේ ඡායාරූපය',
        },
      },
      {
        id: 'staff-ap-science',
        name: 'ආචාර්ය මාරි කියුරි',
        role: 'assistant-principal',
        designation: 'සහකාර විදුහල්පති (විද්‍යාව)',
        department: 'science',
        portfolio: 'භෞතික හා රසායන විද්‍යාව',
        portrait: {
          src: '/images/staff/hod-science.jpg',
          alt: 'ආචාර්ය මාරි කියුරිගේ ඡායාරූපය',
        },
      },
      {
        id: 'staff-ap-languages',
        name: 'වර්ජීනියා වුල්ෆ් මහත්මිය',
        role: 'assistant-principal',
        designation: 'සහකාර විදුහල්පති (භාෂා)',
        department: 'languages',
        portfolio: 'ඉංග්‍රීසි සාහිත්‍යය',
        portrait: {
          src: '/images/staff/hod-languages.jpg',
          alt: 'වර්ජීනියා වුල්ෆ් මහත්මියගේ ඡායාරූපය',
        },
      },
    ],
  },
  headPrefects: {
    eyebrow: 'ප්‍රධාන ශිෂ්‍ය නායකයින්',
    heading: 'ශිෂ්‍ය නායකත්වය (2025/2026)',
    staff: [
      {
        id: 'staff-head-prefect',
        name: 'Ravindu Jayasinghe',
        role: 'head-prefect',
        designation: 'ප්‍රධාන ශිෂ්‍ය නායකයා',
      },
      {
        id: 'staff-deputy-head-prefect',
        name: 'Senuri Wickramasinghe',
        role: 'head-prefect',
        designation: 'නියෝජ්‍ය ප්‍රධාන ශිෂ්‍ය නායිකාව',
      },
    ],
  },
  sds: {
    description: 'පාසල් සංවර්ධන සංගමය මගින් වාර්ෂික රජයේ අයවැයෙන් ඔබ්බට යටිතල පහසුකම් ව්‍යාපෘති සහ විෂය බාහිර සංවර්ධනයට සහාය වීම සඳහා දෙමාපියන්, ආදි ශිෂ්‍යයින් සහ කාර්ය මණ්ඩලය එක්සත් කරයි.',
    contact: 'sds@nexus.edu',
    linkHref: '/administration/sds',
  },
  contact: {
    blockType: CTA_BLOCK,
    title: 'පරිපාලනය සම්බන්ධ කරගන්න',
    subtitle: 'ඕනෑම පරිපාලන විමසීමක් සඳහා පාසල් කාර්යාලය හා සම්බන්ධ වන්න.',
    buttonLabel: 'අප අමතන්න',
    buttonHref: '/contact',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const ADMINISTRATION_SEED_TA: AdministrationPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'தலைமைத்துவம்',
    title: 'பள்ளி நிர்வாகம்',
    subtitle: 'நெக்ஸஸ் கல்லூரியில் சிறப்பை வழிநடத்தும் அர்ப்பணிப்புள்ள குழு.',
  },
  institutional: {
    body: 'நெக்ஸஸில் நிர்வாகம் வகுப்பறைக்கு சேவை செய்வதற்காகவே உள்ளது — ஒவ்வொரு கொள்கையும், பட்ஜெட்டும், நியமனமும் அது ஒரு ஆசிரியருக்கு கற்பிக்கவும் மாணவருக்கு கற்கவும் உதவுகிறதா என்பதன் அடிப்படையில் மதிப்பிடப்படுகிறது.',
  },
  principal: {
    eyebrow: 'எங்கள் அதிபர்',
    principal: {
      id: 'staff-principal',
      name: 'டாக்டர் ஜேன் ஸ்மித்',
      role: 'principal',
      designation: 'அதிபர்',
      tenure: '2018 - தற்போது',
      quote: 'கல்வி என்பது வெறும் கல்வியியல் மட்டுமல்ல; அது குணத்தை உருவாக்குவது மற்றும் வாழ்நாள் முழுவதும் கற்பதில் ஆர்வத்தை வளர்ப்பது.',
      portrait: {
        src: '/images/staff/principal.jpg',
        alt: 'டாக்டர் ஜேன் ஸ்மித்தின் புகைப்படம்',
      },
      contactEmail: 'principal@nexus.edu',
    },
    messageLinkHref: '/staff/jane-smith',
  },
  deputyPrincipals: {
    eyebrow: 'துணை அதிபர்கள்',
    heading: 'கல்வி மற்றும் நிர்வாகத் தலைமை',
    staff: [
      {
        id: 'staff-deputy-academics',
        name: 'திரு. ஜான் டோ',
        role: 'deputy-principal',
        designation: 'துணை அதிபர் (கல்வி)',
        portfolio: 'பாடத்திட்டம் மற்றும் தேர்வுகள்',
        tenure: '2015 - தற்போது',
        portrait: {
          src: '/images/staff/vp-academics.jpg',
          alt: 'திரு. ஜான் டோவின் புகைப்படம்',
        },
      },
      {
        id: 'staff-deputy-admin',
        name: 'திருமதி மேரி ஜான்சன்',
        role: 'deputy-principal',
        designation: 'துணை அதிபர் (நிர்வாகம்)',
        portfolio: 'செயல்பாடுகள் மற்றும் ஒழுக்கம்',
        tenure: '2020 - தற்போது',
        portrait: {
          src: '/images/staff/vp-admin.jpg',
          alt: 'திருமதி மேரி ஜான்சனின் புகைப்படம்',
        },
      },
    ],
  },
  assistantPrincipals: {
    eyebrow: 'உதவி அதிபர்கள்',
    heading: 'பாடப் பிரிவுத் தலைமை',
    staff: [
      {
        id: 'staff-ap-mathematics',
        name: 'திரு. ஆலன் டூரிங்',
        role: 'assistant-principal',
        designation: 'உதவி அதிபர் (கணிதம்)',
        department: 'mathematics',
        portfolio: 'மேம்பட்ட கணிதம்',
        portrait: {
          src: '/images/staff/hod-math.jpg',
          alt: 'திரு. ஆலன் டூரிங்கின் புகைப்படம்',
        },
      },
      {
        id: 'staff-ap-science',
        name: 'டாக்டர் மேரி கியூரி',
        role: 'assistant-principal',
        designation: 'உதவி அதிபர் (அறிவியல்)',
        department: 'science',
        portfolio: 'இயற்பியல் மற்றும் வேதியியல்',
        portrait: {
          src: '/images/staff/hod-science.jpg',
          alt: 'டாக்டர் மேரி கியூரியின் புகைப்படம்',
        },
      },
      {
        id: 'staff-ap-languages',
        name: 'திருமதி வர்ஜீனியா வூல்ஃப்',
        role: 'assistant-principal',
        designation: 'உதவி அதிபர் (மொழிகள்)',
        department: 'languages',
        portfolio: 'ஆங்கில இலக்கியம்',
        portrait: {
          src: '/images/staff/hod-languages.jpg',
          alt: 'திருமதி வர்ஜீனியா வூல்ஃபின் புகைப்படம்',
        },
      },
    ],
  },
  headPrefects: {
    eyebrow: 'தலைமை மாணவத் தலைவர்கள்',
    heading: 'மாணவர் தலைமைத்துவம் (2025/2026)',
    staff: [
      {
        id: 'staff-head-prefect',
        name: 'Ravindu Jayasinghe',
        role: 'head-prefect',
        designation: 'தலைமை மாணவத் தலைவர்',
      },
      {
        id: 'staff-deputy-head-prefect',
        name: 'Senuri Wickramasinghe',
        role: 'head-prefect',
        designation: 'துணைத் தலைமை மாணவித் தலைவி',
      },
    ],
  },
  sds: {
    description: 'பள்ளி வளர்ச்சி சங்கம், ஆண்டு அரசாங்க பட்ஜெட்டிற்கு அப்பால் உள்கட்டமைப்பு திட்டங்கள் மற்றும் பாடநெறிக்கு அப்பாற்பட்ட வளர்ச்சிக்கு ஆதரவளிக்க பெற்றோர், முன்னாள் மாணவர்கள் மற்றும் ஊழியர்களை ஒன்றிணைக்கிறது.',
    contact: 'sds@nexus.edu',
    linkHref: '/administration/sds',
  },
  contact: {
    blockType: CTA_BLOCK,
    title: 'நிர்வாகத்தை தொடர்பு கொள்ள',
    subtitle: 'எந்தவொரு நிர்வாக வினவல்களுக்கும் பள்ளி அலுவலகத்தை தொடர்பு கொள்ளவும்.',
    buttonLabel: 'தொடர்பு கொள்ள',
    buttonHref: '/contact',
  },
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const SECTION_CONFIG = {
  hero: { sectionKey: 'administration.hero', contentType: 'hero' },
  institutional: {
    sectionKey: 'administration.institutional',
    contentType: 'richText',
  },
  principal: {
    sectionKey: 'administration.principal',
    contentType: 'richText',
  },
  deputyPrincipals: {
    sectionKey: 'administration.deputyPrincipals',
    contentType: 'staffGrid',
  },
  assistantPrincipals: {
    sectionKey: 'administration.assistantPrincipals',
    contentType: 'staffGrid',
  },
  headPrefects: {
    sectionKey: 'administration.headPrefects',
    contentType: 'staffGrid',
  },
  sds: { sectionKey: 'administration.sds', contentType: 'richText' },
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
