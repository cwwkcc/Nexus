// apps/web/src/lib/news-i18n.ts
//
// Fixed UI-chrome strings for the News pages (labels like "Read more",
// not article content, which is already locale-specific CMS/domain data).
// Every other page in apps/web sources ALL of its visible text from
// ContentEntry rows (see server/content/*.ts) — there's no per-feature
// message-file system wired up yet (apps/web/src/i18n/request.ts's
// loadMessages literally returns {} with a "Skip loading messages since
// NAMESPACES is empty" comment; F-084 hasn't landed). Building that whole
// system is a separate, cross-cutting piece of infrastructure, well beyond
// News — so this file follows the pattern @nexus/ui's own components
// already use for fixed strings (e.g. AudioPlayer's `downloadLabel`
// prop with an English default): a small local dictionary, not a fake
// dependency on infrastructure that doesn't exist yet. Once F-084 lands,
// these move into a real news.json per locale instead.
//
// Sinhala and Tamil strings below are a reasonable best-effort translation
// of common CMS UI terms, not reviewed by a native speaker — worth a
// native-speaker pass before this ships to real users, the same caveat
// that applies to any other machine-assisted translation in this project.

import type { LocaleEnumData } from '@nexus/contracts';

export interface NewsStrings {
  pageTitle: string;
  searchPlaceholder: string;
  allCategories: string;
  noResults: string;
  readMore: string;
  publishedOn: string;
  by: string;
  relatedArticles: string;
  share: string;
  backToNews: string;
}

export const NEWS_STRINGS: Record<LocaleEnumData, NewsStrings> = {
  en: {
    pageTitle: 'News & Announcements',
    searchPlaceholder: 'Search news…',
    allCategories: 'All categories',
    noResults: 'No articles found.',
    readMore: 'Read more',
    publishedOn: 'Published on',
    by: 'By',
    relatedArticles: 'Related articles',
    share: 'Share',
    backToNews: 'Back to News',
  },
  si: {
    pageTitle: 'ප්‍රවෘත්ති සහ නිවේදන',
    searchPlaceholder: 'ප්‍රවෘත්ති සොයන්න…',
    allCategories: 'සියලුම කාණ්ඩ',
    noResults: 'ලිපි හමු නොවීය.',
    readMore: 'තව කියවන්න',
    publishedOn: 'ප්‍රකාශිත දිනය',
    by: 'ලේඛකයා',
    relatedArticles: 'සම්බන්ධිත ලිපි',
    share: 'බෙදාගන්න',
    backToNews: 'ප්‍රවෘත්ති වෙත ආපසු',
  },
  ta: {
    pageTitle: 'செய்திகள் மற்றும் அறிவிப்புகள்',
    searchPlaceholder: 'செய்திகளைத் தேடுங்கள்…',
    allCategories: 'அனைத்து வகைகளும்',
    noResults: 'கட்டுரைகள் எதுவும் இல்லை.',
    readMore: 'மேலும் படிக்க',
    publishedOn: 'வெளியிடப்பட்ட தேதி',
    by: 'எழுதியவர்',
    relatedArticles: 'தொடர்புடைய கட்டுரைகள்',
    share: 'பகிர்',
    backToNews: 'செய்திகளுக்குத் திரும்பு',
  },
};
