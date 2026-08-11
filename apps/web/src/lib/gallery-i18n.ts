// apps/web/src/lib/gallery-i18n.ts
//
// Fixed UI-chrome strings for the Gallery pages — same reasoning and same
// caveats as news-i18n.ts's/events-i18n.ts's/societies-i18n.ts's own
// header comments (no F-084 message-file system yet; Sinhala/Tamil
// strings are a reasonable best-effort translation, not reviewed by a
// native speaker).

import type { LocaleEnumData } from '@nexus/contracts';

export interface GalleryStrings {
  pageTitle: string;
  allYears: string;
  allCategories: string;
  noResults: string;
  backToGallery: string;
  viewAlbumLabel: string;
  photosLabel: (count: number) => string;
}

export const GALLERY_STRINGS: Record<LocaleEnumData, GalleryStrings> = {
  en: {
    pageTitle: 'Photo Gallery',
    allYears: 'All years',
    allCategories: 'All categories',
    noResults: 'No albums found for these filters.',
    backToGallery: 'Back to Gallery',
    viewAlbumLabel: 'View Album',
    photosLabel: (count) => `${count} photo${count === 1 ? '' : 's'}`,
  },
  si: {
    pageTitle: 'ඡායාරූප ගැලරිය',
    allYears: 'සියලුම වර්ෂ',
    allCategories: 'සියලුම කාණ්ඩ',
    noResults: 'මෙම පෙරහන් සඳහා ඇල්බම හමු නොවීය.',
    backToGallery: 'ගැලරිය වෙත ආපසු',
    viewAlbumLabel: 'ඇල්බමය බලන්න',
    photosLabel: (count) => `ඡායාරූප ${count}`,
  },
  ta: {
    pageTitle: 'புகைப்பட தொகுப்பு',
    allYears: 'அனைத்து ஆண்டுகளும்',
    allCategories: 'அனைத்து வகைகளும்',
    noResults: 'இந்த வடிப்பான்களுக்கு ஆல்பங்கள் இல்லை.',
    backToGallery: 'தொகுப்புக்குத் திரும்பு',
    viewAlbumLabel: 'ஆல்பத்தைப் பார்க்க',
    photosLabel: (count) => `${count} புகைப்படங்கள்`,
  },
};
