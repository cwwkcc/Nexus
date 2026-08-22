'use server';

// apps/web/src/app/[locale]/alumni/actions.ts
//
// Server action backing the public Alumni Directory's submission form
// (F-180, Task 7.18). `SubmitProfileBlock.tsx` is a client component (it
// needs form state), so it can't call tRPC directly — this is the one
// 'use server' entry point standing between it and `alumniRouter.submit`,
// mirroring how every mutation in apps/admin goes through its own
// route-local actions.ts even though this is apps/web's first one.
//
// No session resolution here (unlike apps/admin/src/lib/server-caller.ts's
// `getServerCaller`) — apps/web has no auth of its own, and
// `createServerCaller()` already defaults to a null session, which is
// exactly what `alumni.submit`'s `publicProcedure` expects.

import { createServerCaller } from '@nexus/api';
import type { ALStreamEnumData } from '@nexus/contracts';
import { TRPCError } from '@trpc/server';

export interface AlumniSubmitPayload {
  name: string;
  graduationYear: string;
  stream?: ALStreamEnumData;
  currentRole?: string;
  currentOrg?: string;
  quote?: string;
}

export type AlumniSubmitResult = { ok: true } | { ok: false; error: string };

export async function submitAlumniProfile(payload: AlumniSubmitPayload): Promise<AlumniSubmitResult> {
  try {
    const result = await createServerCaller().alumni.submit(payload);

    if (!result.success) {
      return { ok: false, error: 'Something went wrong submitting your profile. Please try again.' };
    }

    return { ok: true };
  } catch (err) {
    // BAD_REQUEST here means Zod's own input validation rejected the
    // payload (e.g. a name under 2 characters) — that message is safe and
    // useful to show the visitor directly. Anything else (a genuine
    // server-side failure) gets the same generic message
    // `submitProfile`'s own catch-and-log already uses internally, so we
    // never leak internals through this boundary either.
    if (err instanceof TRPCError && err.code === 'BAD_REQUEST') {
      return { ok: false, error: err.message };
    }
    return { ok: false, error: 'Something went wrong submitting your profile. Please try again.' };
  }
}
