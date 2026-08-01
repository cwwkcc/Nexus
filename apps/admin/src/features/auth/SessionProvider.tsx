// Auth.js SessionProvider wrapper (F-059)
// Provides session context to all admin client components.
// Placed in apps/admin root layout.
'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

/**
 * Thin wrapper, not a re-export, so every client component in apps/admin
 * imports session context from one place (`@/features/auth/SessionProvider`)
 * rather than reaching into `next-auth/react` directly — if session handling
 * ever needs app-specific behaviour (e.g. reacting to a forced sign-out),
 * this is the one file that changes.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
