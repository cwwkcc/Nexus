// apps/web/src/lib/extracurriculars-i18n.ts
//
// Fixed UI-chrome strings for the Extracurriculars page — same reasoning
// and same caveats as societies-i18n.ts's own header comment (no F-084
// message-file system yet; Sinhala/Tamil strings are a reasonable
// best-effort translation, not reviewed by a native speaker). The empty
// state copy matches "Design System/Page Specifications.md" section 09
// verbatim ("Extracurricular details are being updated. Please contact
// the sports or cultural unit.").

import type { LocaleEnumData } from '@nexus/contracts';

export interface ExtracurricularsStrings {
  pageTitle: string;
  sportsHeading: string;
  performingArtsHeading: string;
  leadershipHeading: string;
  emptyState: string;
}

export const EXTRACURRICULARS_STRINGS: Record<LocaleEnumData, ExtracurricularsStrings> = {
  en: {
    pageTitle: 'Extracurriculars',
    sportsHeading: 'Sports',
    performingArtsHeading: 'Performing Arts',
    leadershipHeading: 'Scouts & National Cadet Corps',
    emptyState: 'Extracurricular details are being updated. Please contact the sports or cultural unit.',
  },
  si: {
    pageTitle: 'විෂය බාහිර ක්‍රියාකාරකම්',
    sportsHeading: 'ක්‍රීඩා',
    performingArtsHeading: 'රංග කලා',
    leadershipHeading: 'බාලදක්ෂ හා ජාතික නිකේතන බළකාය',
    emptyState: 'විෂය බාහිර විස්තර යාවත්කාලීන වෙමින් පවතී. කරුණාකර ක්‍රීඩා හෝ සංස්කෘතික ඒකකය අමතන්න.',
  },
  ta: {
    pageTitle: 'இணைப் பாட செயற்பாடுகள்',
    sportsHeading: 'விளையாட்டு',
    performingArtsHeading: 'நிகழ்த்து கலைகள்',
    leadershipHeading: 'சாரணர் மற்றும் தேசிய கடற்படைப் படைப்பிரிவு',
    emptyState: 'இணைப் பாட செயற்பாட்டு விவரங்கள் புதுப்பிக்கப்பட்டு வருகின்றன. விளையாட்டு அல்லது கலாச்சார பிரிவை தொடர்பு கொள்ளவும்.',
  },
};
