// apps/web/src/lib/alumni-i18n.ts
//
// Fixed UI-chrome strings for the Alumni pages — same reasoning and
// same caveats as societies-i18n.ts's own header comments (no
// F-084 message-file system yet; Sinhala/Tamil strings are a reasonable
// best-effort translation, not reviewed by a native speaker).

import type { LocaleEnumData } from '@nexus/contracts';

export interface AlumniStrings {
  pageTitle: string;
  searchPlaceholder: string;
  filterByYear: string;
  filterByProfession: string;
  allYears: string;
  noResults: string;
  submitProfile: string;
  graduationYear: string;
  currentRole: string;
  organization: string;
  stream: string;
  quote: string;
}

export const ALUMNI_STRINGS: Record<LocaleEnumData, AlumniStrings> = {
  en: {
    pageTitle: 'Alumni Directory',
    searchPlaceholder: 'Search by name, role, or organization…',
    filterByYear: 'Filter by graduation year',
    filterByProfession: 'Filter by profession',
    allYears: 'All years',
    noResults: 'No alumni match these filters.',
    submitProfile: 'Submit your profile',
    graduationYear: 'Graduation Year',
    currentRole: 'Current Role',
    organization: 'Organization',
    stream: 'Stream',
    quote: 'Quote',
  },
  si: {
    pageTitle: 'ආදු සිසු නාමාවලිය',
    searchPlaceholder: 'නම, ධුරය, හෝ ආයතනය අනුව සොයන්න…',
    filterByYear: 'උපාධි අවුරුදු අනුව පෙරන්න',
    filterByProfession: 'වෘත්තිය අනුව පෙරන්න',
    allYears: 'සියලුම අවුරුදු',
    noResults: 'මෙම පෙරන්න සඳහා ආදු සිසුන් හමු නොවීය.',
    submitProfile: 'ඔබේ පැතිකඩ ඉදිරිපත් කරන්න',
    graduationYear: 'උපාධි අවුරුදු',
    currentRole: 'වත්මන් ධුරය',
    organization: 'ආයතනය',
    stream: 'ධාරාව',
    quote: 'උද්ධෘතය',
  },
  ta: {
    pageTitle: 'முன்னாள் மாணவர் அடைவு',
    searchPlaceholder: 'பெயர், பதவி, அல்லது நிறுவனம் மூலம் தேடவும்…',
    filterByYear: 'பட்டதாரி ஆண்டு மூலம் வடிகட்டவும்',
    filterByProfession: 'தொழில் மூலம் வடிகட்டவும்',
    allYears: 'அனைத்து ஆண்டுகளும்',
    noResults: 'இந்த வடிப்படுகளுக்கு முன்னாள் மாணவர்கள் இல்லை.',
    submitProfile: 'உங்கள் சுயவிவரத்தை சமர்ப்பிக்கவும்',
    graduationYear: 'பட்டதாரி ஆண்டு',
    currentRole: 'தற்போதைய பதவி',
    organization: 'நிறுவனம்',
    stream: 'பாதை',
    quote: 'மேற்கோள்',
  },
};
