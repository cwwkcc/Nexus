// apps/admin/src/lib/auth.ts
//
// Auth.js (NextAuth v5) configuration — Task 6.3/6.5. Two decisions worth
// calling out up front:
//
// 1. Only the Credentials provider (the break-glass account, F-078) is
//    wired today. Google Workspace OAuth (F-073) is M1b — adding it later
//    means adding an entry to `providers`, not rewriting this file.
//
// 2. Session strategy is JWT, not "database", even though `adapter` below
//    is a PrismaAdapter. This isn't an oversight: Auth.js's Credentials
//    provider does not support database sessions — there's no OAuth
//    callback for the adapter to hook a persisted `Session` row into (see
//    the open discussions on nextauthjs/next-auth; this is a known,
//    unresolved limitation of the library, not something specific to this
//    setup). The adapter still does real work under JWT — it's what will
//    create `User`/`Account` rows once Google is added — it just isn't the
//    session store. `Session`/`VerificationToken` sit unused in the schema
//    for now. Revisit once M1b lands: Auth.js has one session strategy for
//    the whole app, not one per provider, so the honest choice then is
//    "keep JWT for both providers" vs. "hand-roll database sessions for
//    Credentials too" — not a call to make speculatively now.

import { PrismaAdapter } from '@auth/prisma-adapter';
import type { RoleEnumData } from '@nexus/contracts';
import { db, verifyBackupCode, verifyPassword, verifyTotpToken } from '@nexus/db';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config.js';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: RoleEnumData;
      isActive: boolean;
    };
  }

  interface User {
    role?: RoleEnumData;
  }
}

type AuthToken = {
  userId?: string;
  role?: RoleEnumData;
  isActive?: boolean;
} & Record<string, unknown>;

const authInstance: any = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      id: 'break-glass',
      name: 'Email and password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        totpCode: { label: 'Authenticator code', type: 'text' },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === 'string' ? credentials.email.trim().toLowerCase() : null;
        const password = typeof credentials?.password === 'string' ? credentials.password : null;
        const totpCode = typeof credentials?.totpCode === 'string' ? credentials.totpCode.trim() : '';

        if (!email || !password) return null;

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.isActive || !user.passwordHash) return null;

        if (!(await verifyPassword(password, user.passwordHash))) return null;

        if (user.totpEnabledAt) {
          if (!totpCode) return null;

          const totpOk = user.totpSecret ? await verifyTotpToken(totpCode, user.totpSecret) : false;

          if (!totpOk) {
            // Fall through to the account's single-use backup codes (F-080)
            // before rejecting outright.
            const unusedCodes = await db.backupCode.findMany({
              where: { userId: user.id, usedAt: null },
            });

            let matchedId: string | null = null;
            for (const candidate of unusedCodes) {
              // eslint-disable-next-line no-await-in-loop -- sequential by design: stop at the first match instead of hashing every remaining code.
              if (await verifyBackupCode(totpCode, candidate.codeHash)) {
                matchedId = candidate.id;
                break;
              }
            }

            if (!matchedId) return null;

            await db.backupCode.update({ where: { id: matchedId }, data: { usedAt: new Date() } });
          }
        }

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }: { token: AuthToken; user?: { id?: string; role?: RoleEnumData } }) {
      if (user) {
        token.userId = user.id;
        token.sub = user.id;
        token.role = user.role;
        token.isActive = true;
        return token;
      }

      if (!token.userId) return token;

      const current = await db.user.findUnique({
        where: { id: token.userId },
        select: { isActive: true, role: true },
      });

      token.isActive = current?.isActive ?? false;
      token.role = current?.role ?? token.role;
      return token;
    },
    async session({ session, token }: { session: any; token: AuthToken }) {
      const typedSession = session as any;
      if (typedSession?.user && token.userId && token.role) {
        typedSession.user.id = token.userId;
        typedSession.user.role = token.role;
        typedSession.user.isActive = token.isActive ?? false;
      }
      return typedSession;
    },
  },
});

export const handlers: any = authInstance.handlers;
export const auth: any = authInstance.auth;
export const signIn: any = authInstance.signIn;
export const signOut: any = authInstance.signOut;

/**
 * Maps an Auth.js session down to the plain shape packages/api's context
 * expects (`SessionContext` in packages/api/src/init.ts). Lives here, not
 * in packages/api, so that package never has to depend on next-auth.
 *
 * Returns null — the same as "no session" — for a deactivated user. This
 * is the actual enforcement point for F-081, not the jwt() callback above.
 */
export function toSessionContext(session: { user?: { id?: string | null; email?: string | null; role?: RoleEnumData | null; isActive?: boolean | null } } | null) {
  if (!session?.user?.id || !session.user.email || !session.user.role || typeof session.user.isActive !== 'boolean' || !session.user.isActive) {
    return null;
  }

  return {
    userId: session.user.id,
    email: session.user.email,
    role: session.user.role,
  };
}
