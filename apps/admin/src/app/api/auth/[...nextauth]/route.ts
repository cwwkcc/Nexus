// apps/admin/src/app/api/auth/[...nextauth]/route.ts
//
// Auth.js's catch-all route — handles /api/auth/signin, /api/auth/callback,
// /api/auth/session, /api/auth/signout, etc. `handlers` already returns the
// correct GET/POST implementations; nothing app-specific belongs in this
// file, which is why it's just a re-export.

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
