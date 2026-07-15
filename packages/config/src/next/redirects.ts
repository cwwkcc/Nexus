// packages/config/src/next/redirects.ts
//
// No redirects needed yet — add entries here when one comes up (e.g. a
// legacy URL from a previous school site) instead of hunting through
// next.config.js in either app.
import type { NextConfig } from 'next';

export const defaultRedirects: NonNullable<NextConfig['redirects']> = async () => [
  // { source: '/old-path', destination: '/new-path', permanent: true },
];
