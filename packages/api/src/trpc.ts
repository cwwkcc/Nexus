// packages/api/src/trpc.ts

// This tRPC setup provides the API layer for the backend and admin panel.
// Real Auth.js session auth is wired as of Task 6.3 — `Context.session` is
// resolved by whichever app hosts this router (apps/admin's `auth()`) and
// passed into `createContext`/`createServerCaller`; see init.ts.

// t/Context live in init.ts; the procedure tiers live in procedures/ and
// middleware/. This file is just the stable public barrel so nothing outside
// packages/api/src has to know about that internal split.

import { t } from './init.js';

export type { Context, SessionContext } from './init.js';
export { adminMutation, adminOnlyMutation, adminOnlyProcedure, adminProcedure } from './procedures/admin.js';
export { publicProcedure } from './procedures/public.js';
export { requireRole } from './middleware/auth.js';

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
