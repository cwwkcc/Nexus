// apps/web/src/lib/events-i18n.ts
//
// Fixed UI-chrome strings for the Events pages — same reasoning and same
// caveats as news-i18n.ts's own header comment (no F-084 message-file
// system yet; Sinhala/Tamil strings are a reasonable best-effort
// translation, not reviewed by a native speaker).

import type { LocaleEnumData } from '@nexus/contracts';

export interface EventsStrings {
  pageTitle: string;
  monthView: string;
  listView: string;
  allCategories: string;
  noResults: string;
  backToEvents: string;
  register: string;
  location: string;
  allDay: string;
  share: string;
  prevMonth: string;
  nextMonth: string;
  upcomingEvents: string;
}

export const EVENTS_STRINGS: Record<LocaleEnumData, EventsStrings> = {
  en: {
    pageTitle: 'Events & School Calendar',
    monthView: 'Calendar',
    listView: 'List',
    allCategories: 'All categories',
    noResults: 'No events found for this month.',
    backToEvents: 'Back to Events',
    register: 'Register',
    location: 'Location',
    allDay: 'All day',
    share: 'Share',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    upcomingEvents: 'Upcoming Events',
  },
  si: {
    pageTitle: 'උත්සව සහ පාසල් දින දර්ශනය',
    monthView: 'දින දර්ශනය',
    listView: 'ලැයිස්තුව',
    allCategories: 'සියලුම කාණ්ඩ',
    noResults: 'මෙම මාසය සඳහා උත්සව හමු නොවීය.',
    backToEvents: 'උත්සව වෙත ආපසු',
    register: 'ලියාපදිංචි වන්න',
    location: 'ස්ථානය',
    allDay: 'දිනය පුරා',
    share: 'බෙදාගන්න',
    prevMonth: 'පෙර මාසය',
    nextMonth: 'ඊළඟ මාසය',
    upcomingEvents: 'ඉදිරි උත්සව',
  },
  ta: {
    pageTitle: 'நிகழ்வுகள் மற்றும் பள்ளி நாட்காட்டி',
    monthView: 'நாட்காட்டி',
    listView: 'பட்டியல்',
    allCategories: 'அனைத்து வகைகளும்',
    noResults: 'இந்த மாதத்திற்கு நிகழ்வுகள் இல்லை.',
    backToEvents: 'நிகழ்வுகளுக்குத் திரும்பு',
    register: 'பதிவு செய்யவும்',
    location: 'இடம்',
    allDay: 'நாள் முழுவதும்',
    share: 'பகிர்',
    prevMonth: 'முந்தைய மாதம்',
    nextMonth: 'அடுத்த மாதம்',
    upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்',
  },
};
