// apps/web/src/lib/achievements-i18n.ts
//
// Fixed UI-chrome strings for the Achievements pages — same reasoning and
// same caveats as alumni-i18n.ts's own header comments (no
// F-084 message-file system yet; Sinhala/Tamil strings are a reasonable
// best-effort translation, not reviewed by a native speaker).

import type { LocaleEnumData } from '@nexus/contracts';

export interface AchievementsStrings {
  pageTitle: string;
  searchPlaceholder: string;
  filterByCategory: string;
  filterByYear: string;
  allCategories: string;
  allYears: string;
  noResults: string;
  categoryLabel: string;
  levelLabel: string;
  dateLabel: string;
  awardedByLabel: string;
}

export const ACHIEVEMENTS_STRINGS: Record<LocaleEnumData, AchievementsStrings> = {
  en: {
    pageTitle: 'Achievement Database',
    searchPlaceholder: 'Search by title…',
    filterByCategory: 'Filter by category',
    filterByYear: 'Filter by year',
    allCategories: 'All categories',
    allYears: 'All years',
    noResults: 'No achievements match these filters.',
    categoryLabel: 'Category',
    levelLabel: 'Level',
    dateLabel: 'Date',
    awardedByLabel: 'Awarded By',
  },
  si: {
    pageTitle: 'ජයග්‍රහ දත්තාගාරය',
    searchPlaceholder: 'සිරස් මගින් සොයන්න…',
    filterByCategory: 'ප්‍රවර්ගය අනුව පෙරන්න',
    filterByYear: 'අවුරුදු අනුව පෙරන්න',
    allCategories: 'සියලුම ප්‍රවර්ග',
    allYears: 'සියලුම අවුරුදු',
    noResults: 'මෙම පෙරන්න සඳහා ජයග්‍රහ හමු නොවීය.',
    categoryLabel: 'ප්‍රවර්ගය',
    levelLabel: 'මට්ටම',
    dateLabel: 'දිනය',
    awardedByLabel: 'සම්මානය ලබා දුන්',
  },
  ta: {
    pageTitle: 'சாதனை தரவுத்தளம்',
    searchPlaceholder: 'தலைப்பு மூலம் தேடவும்…',
    filterByCategory: 'வகை மூலம் வடிகட்டவும்',
    filterByYear: 'ஆண்டு மூலம் வடிகட்டவும்',
    allCategories: 'அனைத்து வகைகளும்',
    allYears: 'அனைத்து ஆண்டுகளும்',
    noResults: 'இந்த வடிப்படுகளுக்கு சாதனைகள் இல்லை.',
    categoryLabel: 'வகை',
    levelLabel: 'நிலை',
    dateLabel: 'தேதி',
    awardedByLabel: 'வழங்கியவர்',
  },
};
