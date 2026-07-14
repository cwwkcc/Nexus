// packages/config/src/paths.ts

import type { PageKeyEnumData } from '@nexus/contracts';

// 'results' intentionally excluded: the page key exists in the registry
// (F-052) but apps/web has no results/page.tsx yet. Add it here once shipped.
const PAGE_ROUTE_SEGMENTS: Partial<Record<PageKeyEnumData, string>> = {
  home: '',
  about: 'about',
  academics: 'academics',
  administration: 'administration',
  admissions: 'admissions',
  contact: 'contact',
  events: 'events',
  extracurriculars: 'extracurriculars',
  facilities: 'facilities',
  gallery: 'gallery',
  news: 'news',
  societies: 'societies',
};

export const PUBLIC_PAGE_KEYS = Object.keys(PAGE_ROUTE_SEGMENTS) as PageKeyEnumData[];

/** e.g. localizedPath('en', 'news') -> '/en/news' */
export function localizedPath(locale: string, page: PageKeyEnumData): string {
  const segment = PAGE_ROUTE_SEGMENTS[page];
  if (segment === undefined) throw new Error(`No route configured for page key "${page}"`);
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}
