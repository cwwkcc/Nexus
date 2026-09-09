// apps/admin/src/lib/auth.config.ts
//
// The Edge-compatible slice of the Auth.js config — used only by
// middleware.ts. Deliberately excludes the PrismaAdapter and the
// Credentials provider's `authorize()` (bcrypt + a live Postgres query via
// `@prisma/adapter-pg`'s `pg` driver): both need the Node.js runtime, which
// Next.js middleware may run under the Edge runtime instead. Middleware
// only needs to answer "is there a valid, active-user session on this
// request", which the `authorized` callback below can do from the session
// JWT alone — no database access required.
//
// This is the standard split recommended for Auth.js + a Node-only adapter
// (see the official Credentials + Prisma + middleware guide). `auth.ts`
// spreads this config and adds the adapter/provider/session-refresh logic
// on top for everywhere else (route handlers, RSC pages).

import { serverEnv } from '@nexus/env/server';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // Set explicitly, matching auth.ts, rather than relying on Auth.js's
  // automatic AUTH_SECRET/NEXTAUTH_SECRET env-var detection — this file and
  // auth.ts are two separate NextAuth() instances (one per runtime), and
  // both must sign/verify the same session JWT with the identical secret
  // for middleware to be able to decode what auth.ts issued.
  secret: serverEnv.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth: session, request }) {
      const isLoggedIn = Boolean(session?.user?.email && session.user.isActive !== false);
      const isLoginPage = request.nextUrl.pathname.startsWith('/login');

      if (isLoginPage) {
        // Already signed in and browsing to /login anyway — send them on to
        // the dashboard instead of showing the form again.
        return isLoggedIn ? Response.redirect(new URL('/', request.nextUrl)) : true;
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
