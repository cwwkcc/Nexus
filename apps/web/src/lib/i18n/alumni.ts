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
  // Submission form (F-180) — SubmitProfileBlock.tsx
  name: string;
  namePlaceholder: string;
  graduationYearPlaceholder: string;
  streamUnknown: string;
  submitButton: string;
  submitSuccess: string;
  submitError: string;
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
    name: 'Full Name',
    namePlaceholder: 'e.g. Kamal Perera',
    graduationYearPlaceholder: 'e.g. 2020',
    streamUnknown: '— Unknown —',
    submitButton: 'Submit Profile',
    submitSuccess: 'Thank you! Your profile has been submitted and will appear once reviewed.',
    submitError: 'Failed to submit. Please try again later.',
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
    name: 'සම්පූර්ණ නම',
    namePlaceholder: 'උදා. කමල් පෙරේරා',
    graduationYearPlaceholder: 'උදා. 2020',
    streamUnknown: '— නොදනී —',
    submitButton: 'පැතිකඩ ඉදිරිපත් කරන්න',
    submitSuccess: 'ස්තූතියි! ඔබේ පැතිකඩ ඉදිරිපත් කර ඇති අතර සමාලෝචනයෙන් පසු දිස්වනු ඇත.',
    submitError: 'ඉදිරිපත් කිරීම අසාර්ථක විය. කරුණාකර නැවත උත්සාහ කරන්න.',
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
    name: 'முழுப்பெயர்',
    namePlaceholder: 'எ.கா. கமல் பெரேரா',
    graduationYearPlaceholder: 'எ.கா. 2020',
    streamUnknown: '— தெரியவில்லை —',
    submitButton: 'சுயவிவரத்தை சமர்ப்பிக்கவும்',
    submitSuccess: 'நன்றி! உங்கள் சுயவிவரம் சமர்ப்பிக்கப்பட்டது, மதிப்பாய்வுக்குப் பிறகு தோன்றும்.',
    submitError: 'சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
  },
};
