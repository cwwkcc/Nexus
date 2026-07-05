import type { NavigationContentData } from '@nexus/contracts';

export const NAVIGATION_SEED_EN: NavigationContentData = {
  links: [
    { id: 'about', label: 'About', href: '/about' },
    { id: 'academics', label: 'Academics', href: '/academics' },
    { id: 'admissions', label: 'Admissions', href: '/admissions' },
    { id: 'news', label: 'News', href: '/news' },
    { id: 'events', label: 'Events', href: '/events' },
    { id: 'societies', label: 'Societies', href: '/societies' },
    { id: 'facilities', label: 'Facilities', href: '/facilities' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ],
};

export const NAVIGATION_SEED_SI: NavigationContentData = {
  links: [
    { id: 'about', label: 'පිළිබඳව', href: '/about' },
    { id: 'academics', label: 'අධ්‍යාපනික', href: '/academics' },
    { id: 'admissions', label: 'ප්‍රවේශන', href: '/admissions' },
    { id: 'news', label: 'ප්‍රවෘත්ති', href: '/news' },
    { id: 'events', label: 'සිදුවීම්', href: '/events' },
    { id: 'societies', label: 'සංගම්', href: '/societies' },
    { id: 'facilities', label: 'පහසුකම්', href: '/facilities' },
    { id: 'contact', label: 'සම්බන්ධතා', href: '/contact' },
  ],
};

export const NAVIGATION_SEED_TA: NavigationContentData = {
  links: [
    { id: 'about', label: 'பற்றி', href: '/about' },
    { id: 'academics', label: 'கல்வித்துறை', href: '/academics' },
    { id: 'admissions', label: 'சேர்க்கை', href: '/admissions' },
    { id: 'news', label: 'செய்திகள்', href: '/news' },
    { id: 'events', label: 'நிகழ்வுகள்', href: '/events' },
    { id: 'societies', label: 'சங்கங்கள்', href: '/societies' },
    { id: 'facilities', label: 'வசதிகள்', href: '/facilities' },
    { id: 'contact', label: 'தொடர்பு', href: '/contact' },
  ],
};

export const NAVIGATION_SEED = {
  en: NAVIGATION_SEED_EN,
  si: NAVIGATION_SEED_SI,
  ta: NAVIGATION_SEED_TA,
};
