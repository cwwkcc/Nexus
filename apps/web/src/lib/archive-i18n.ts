// apps/web/src/lib/archive-i18n.ts
//
// Fixed UI-chrome strings for the Archive pages — same reasoning and
// same caveats as achievements-i18n.ts's own header comments (no
// F-084 message-file system yet; Sinhala/Tamil strings are a reasonable
// best-effort translation, not reviewed by a native speaker).

import type { LocaleEnumData } from '@nexus/contracts';

export interface ArchiveStrings {
  pageTitle: string;
  searchPlaceholder: string;
  filterByCategory: string;
  filterByYear: string;
  allCategories: string;
  allYears: string;
  noResults: string;
  categoryLabel: string;
  yearLabel: string;
  descriptionLabel: string;
}

export const ARCHIVE_STRINGS: Record<LocaleEnumData, ArchiveStrings> = {
  en: {
    pageTitle: 'Digital Archive',
    searchPlaceholder: 'Search by title…',
    filterByCategory: 'Filter by category',
    filterByYear: 'Filter by year',
    allCategories: 'All categories',
    allYears: 'All years',
    noResults: 'No archive entries match these filters.',
    categoryLabel: 'Category',
    yearLabel: 'Year',
    descriptionLabel: 'Description',
  },
  si: {
    pageTitle: 'ඩිජිත ලේඛනාගාරය',
    searchPlaceholder: 'සිරස් මගින් සොයන්න…',
    filterByCategory: 'ප්‍රවර්ගය අනුව පෙරන්න',
    filterByYear: 'අවුරුදු අනුව පෙරන්න',
    allCategories: 'සියලුම ප්‍රවර්ග',
    allYears: 'සියලුම අවුරුදු',
    noResults: 'මෙම පෙරන්න සඳහා ලේඛනාගාර ප්‍රවේශ හමු නොවීය.',
    categoryLabel: 'ප්‍රවර්ගය',
    yearLabel: 'අවුරුදු',
    descriptionLabel: 'විස්තරය',
  },
  ta: {
    pageTitle: 'டிஜிட்டல் காப்பகம்',
    searchPlaceholder: 'தலைப்பு மூலம் தேடவும்…',
    filterByCategory: 'வகை மூலம் வடிகட்டவும்',
    filterByYear: 'ஆண்டு மூலம் வடிகட்டவும்',
    allCategories: 'அனைத்து வகைகளும்',
    allYears: 'அனைத்து ஆண்டுகளும்',
    noResults: 'இந்த வடிப்படுகளுக்கு காப்பக உள்ளடக்கங்கள் இல்லை.',
    categoryLabel: 'வகை',
    yearLabel: 'ஆண்டு',
    descriptionLabel: 'விளக்கம்',
  },
};
