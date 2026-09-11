// apps/web/src/lib/societies-i18n.ts
//
// Fixed UI-chrome strings for the Societies pages — same reasoning and
// same caveats as news-i18n.ts's/events-i18n.ts's own header comments (no
// F-084 message-file system yet; Sinhala/Tamil strings are a reasonable
// best-effort translation, not reviewed by a native speaker).

import type { LocaleEnumData } from '@nexus/contracts';

export interface SocietiesStrings {
  pageTitle: string;
  allCategories: string;
  noResults: string;
  backToSocieties: string;
  membersLabel: string;
  foundedLabel: string;
  learnMoreLabel: string;
  featuredLabel: string;
  advisorHeading: string;
  meetingScheduleHeading: string;
  howToJoinHeading: string;
}

export const SOCIETIES_STRINGS: Record<LocaleEnumData, SocietiesStrings> = {
  en: {
    pageTitle: 'Clubs & Societies',
    allCategories: 'All categories',
    noResults: 'No societies found in this category.',
    backToSocieties: 'Back to Societies',
    membersLabel: 'members',
    foundedLabel: 'Est.',
    learnMoreLabel: 'Learn more →',
    featuredLabel: 'Featured',
    advisorHeading: 'Advisor',
    meetingScheduleHeading: 'Meeting Schedule',
    howToJoinHeading: 'How to Join',
  },
  si: {
    pageTitle: 'සමාජ සහ සමිති',
    allCategories: 'සියලුම කාණ්ඩ',
    noResults: 'මෙම කාණ්ඩය තුළ සමිති හමු නොවීය.',
    backToSocieties: 'සමිති වෙත ආපසු',
    membersLabel: 'සාමාජිකයන්',
    foundedLabel: 'ආරම්භය',
    learnMoreLabel: 'තව දැනගන්න →',
    featuredLabel: 'විශේෂාංගගත',
    advisorHeading: 'උපදේශක',
    meetingScheduleHeading: 'රැස්වීම් කාලසටහන',
    howToJoinHeading: 'සම්බන්ධ වන ආකාරය',
  },
  ta: {
    pageTitle: 'சங்கங்கள்',
    allCategories: 'அனைத்து வகைகளும்',
    noResults: 'இந்த வகையில் சங்கங்கள் இல்லை.',
    backToSocieties: 'சங்கங்களுக்குத் திரும்பு',
    membersLabel: 'உறுப்பினர்கள்',
    foundedLabel: 'தொடக்கம்',
    learnMoreLabel: 'மேலும் அறிய →',
    featuredLabel: 'சிறப்பு',
    advisorHeading: 'ஆலோசகர்',
    meetingScheduleHeading: 'கூட்ட அட்டவணை',
    howToJoinHeading: 'சேரும் முறை',
  },
};
