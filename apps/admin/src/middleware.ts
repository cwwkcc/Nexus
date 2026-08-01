// apps/admin/src/middleware.ts

// Real redirect-to-/login logic (Task 6.3), replacing the previous
// pass-through stub. Uses the Edge-compatible `authConfig` (no Prisma
// adapter, no bcrypt) rather than the full config in `./lib/auth.ts` — see
// the comment at the top of `./lib/auth.config.ts` for why.

import NextAuth from 'next-auth';

import { authConfig } from './lib/auth.config.js';

const authMiddleware: any = NextAuth(authConfig);

export const middleware: any = authMiddleware.auth;

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
