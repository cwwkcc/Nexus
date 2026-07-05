import type { NavigationContentData } from '@nexus/contracts';

export const NAVIGATION_SEED: NavigationContentData = {
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
