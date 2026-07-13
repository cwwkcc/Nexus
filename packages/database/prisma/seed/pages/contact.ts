// packages/database/prisma/seed/pages/contact.ts

import { SUPPORTED_LOCALES, HERO_BLOCK, CTA_BLOCK } from '@nexus/contracts';
import type {
  HeroData,
  CtaData,
  ContactDepartmentsTableData,
  ContactMapData,
  ContactHoursData,
  ContactTransportData,
} from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:contact';
const STATUS = 'published';

// The contact registry (registry/page-registry/contact.ts) was rebuilt —
// `contact.info` / ContactInfoData no longer exist there. Sections are now
// hero / departments / map / generalEnquiry / feedback / officeHours /
// transport / cta.
//
// `contact.generalEnquiry` and `contact.feedback` are wired to
// ContactFormSchema and FeedbackFormSchema, which model a visitor's
// *submission* (name, email, message, category...), not editable page
// content. Seeding sample submission data as if it were page content would
// be actively wrong, so — same treatment as academics.intro/stats — those
// two sections are intentionally left unseeded here. Worth flagging back to
// whoever owns contact.ts in the registry; those sections likely need a
// dedicated "form configuration" schema instead.

type ContactPageSeed = {
  hero: HeroData;
  departments: ContactDepartmentsTableData;
  map: ContactMapData;
  officeHours: ContactHoursData;
  transport: ContactTransportData;
  cta: CtaData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const CONTACT_SEED_EN: ContactPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'Contact',
    title: 'Get in Touch',
    subtitle:
      'Reach out to our admissions, support, or general enquiries team for a prompt response.',
  },
  departments: {
    eyebrow: 'Departments',
    heading: 'Department Contacts',
    departments: [
      {
        department: 'mathematics',
        phone: '+94 11 222 3340',
        email: 'mathematics@nexus.edu',
        extension: '101',
      },
      {
        department: 'science',
        phone: '+94 11 222 3341',
        email: 'science@nexus.edu',
        extension: '102',
      },
      {
        department: 'commerce',
        phone: '+94 11 222 3342',
        email: 'commerce@nexus.edu',
        extension: '103',
      },
      {
        department: 'languages',
        phone: '+94 11 222 3343',
        email: 'languages@nexus.edu',
        extension: '104',
      },
    ],
  },
  map: {
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kandy%20Sri%20Lanka&output=embed',
    note: 'Located on Kandy Road, five minutes from the town centre.',
  },
  officeHours: {
    officeHours: 'Monday – Friday, 8:30 AM – 4:30 PM',
    emergencyContacts: [
      { label: 'School Office', phone: '+94 11 222 3333' },
      { label: 'Security / After Hours', phone: '+94 11 222 9999' },
    ],
    afterHoursProtocol:
      'For emergencies outside office hours, contact campus security directly.',
  },
  transport: {
    busRoutes: 'Routes 400, 402, and 415 stop directly outside the main gate.',
    trainStation:
      'Kandy Railway Station — approximately 10 minutes by tuk-tuk.',
    parking: 'Visitor parking is available at the main entrance.',
    accessibilityNotes:
      'Ramp access is available at the main building entrance.',
  },
  cta: {
    blockType: CTA_BLOCK,
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
    blockType: HERO_BLOCK,
    eyebrow: 'සම්බන්ධ වන්න',
    title: 'අප අමතන්න',
    subtitle:
      'අපගේ ඇතුළුකිරීම්, සහාය හෝ සාමාන්‍ය විමසීම් කණ්ඩායම සම්බන්ධ කරගන්න.',
  },
  departments: {
    eyebrow: 'දෙපාර්තමේන්තු',
    heading: 'දෙපාර්තමේන්තු සම්බන්ධතා',
    departments: [
      {
        department: 'mathematics',
        phone: '+94 11 222 3340',
        email: 'mathematics@nexus.edu',
        extension: '101',
      },
      {
        department: 'science',
        phone: '+94 11 222 3341',
        email: 'science@nexus.edu',
        extension: '102',
      },
      {
        department: 'commerce',
        phone: '+94 11 222 3342',
        email: 'commerce@nexus.edu',
        extension: '103',
      },
      {
        department: 'languages',
        phone: '+94 11 222 3343',
        email: 'languages@nexus.edu',
        extension: '104',
      },
    ],
  },
  map: {
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kandy%20Sri%20Lanka&output=embed',
    note: 'නගර මධ්‍යයේ සිට විනාඩි පහක් දුරින්, කැන්ඩි පාරේ පිහිටා ඇත.',
  },
  officeHours: {
    officeHours: 'සඳුදා – සිකුරාදා, 8:30 පෙ.ව – 4:30 ප.ව',
    emergencyContacts: [
      { label: 'පාසල් කාර්යාලය', phone: '+94 11 222 3333' },
      { label: 'ආරක්ෂාව / කාර්යාල වේලාවෙන් පසු', phone: '+94 11 222 9999' },
    ],
    afterHoursProtocol:
      'කාර්යාල වේලාවෙන් පසු හදිසි අවස්ථා සඳහා, කෘපයාකර කැම්පස් ආරක්ෂක අංශය සෘජුවම අමතන්න.',
  },
  transport: {
    busRoutes: '400, 402 සහ 415 මාර්ග ප්‍රධාන ගේට්ටුව ඉදිරිපිටම නවතී.',
    trainStation: 'කැන්ඩි දුම්රිය ස්ථානය — ත්‍රී රෝද රථයකින් විනාඩි 10ක් පමණ.',
    parking: 'ප්‍රධාන ප්‍රවේශ ද්වාරයේ අමුත්තන් සඳහා වාහන නැවතුම් පහසුකම් ඇත.',
    accessibilityNotes:
      'ප්‍රධාන ගොඩනැගිල්ලේ ප්‍රවේශ ද්වාරයේ රැම්ප් පහසුකම ලබා ගත හැක.',
  },
  cta: {
    blockType: CTA_BLOCK,
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
    blockType: HERO_BLOCK,
    eyebrow: 'தொடர்பு கொள்ளுங்கள்',
    title: 'எங்களை தொடர்பு கொள்ளுங்கள்',
    subtitle:
      'உங்கள் சேர்க்கை, ஆதரவு அல்லது பொது விசாரணைகளுக்காக எங்களை அணுகவும்.',
  },
  departments: {
    eyebrow: 'துறைகள்',
    heading: 'துறை தொடர்புகள்',
    departments: [
      {
        department: 'mathematics',
        phone: '+94 11 222 3340',
        email: 'mathematics@nexus.edu',
        extension: '101',
      },
      {
        department: 'science',
        phone: '+94 11 222 3341',
        email: 'science@nexus.edu',
        extension: '102',
      },
      {
        department: 'commerce',
        phone: '+94 11 222 3342',
        email: 'commerce@nexus.edu',
        extension: '103',
      },
      {
        department: 'languages',
        phone: '+94 11 222 3343',
        email: 'languages@nexus.edu',
        extension: '104',
      },
    ],
  },
  map: {
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kandy%20Sri%20Lanka&output=embed',
    note: 'நகர மையத்திலிருந்து ஐந்து நிமிடங்களில், கண்டி வீதியில் அமைந்துள்ளது.',
  },
  officeHours: {
    officeHours: 'திங்கள் – வெள்ளி, 8:30 AM – 4:30 PM',
    emergencyContacts: [
      { label: 'பள்ளி அலுவலகம்', phone: '+94 11 222 3333' },
      {
        label: 'பாதுகாப்பு / அலுவலக நேரத்திற்குப் பிறகு',
        phone: '+94 11 222 9999',
      },
    ],
    afterHoursProtocol:
      'அலுவலக நேரத்திற்குப் பிறகு அவசரநிலைகளுக்கு, நேரடியாக வளாகப் பாதுகாப்பைத் தொடர்பு கொள்ளவும்.',
  },
  transport: {
    busRoutes:
      '400, 402 மற்றும் 415 வழித்தடங்கள் முதன்மை வாசலுக்கு நேரே நிற்கும்.',
    trainStation:
      'கண்டி ரயில் நிலையம் — முச்சக்கர வண்டியில் தோராயமாக 10 நிமிடங்கள்.',
    parking: 'முதன்மை நுழைவாயிலில் பார்வையாளர் வாகன நிறுத்துமிடம் உள்ளது.',
    accessibilityNotes: 'முதன்மை கட்டிட நுழைவாயிலில் சாய்வுப்பாதை வசதி உள்ளது.',
  },
  cta: {
    blockType: CTA_BLOCK,
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
  departments: { sectionKey: 'contact.departments', contentType: 'richText' },
  map: { sectionKey: 'contact.map', contentType: 'map' },
  officeHours: { sectionKey: 'contact.officeHours', contentType: 'richText' },
  transport: { sectionKey: 'contact.transport', contentType: 'richText' },
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
