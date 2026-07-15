// packages/config/src/cache.ts
//
// F-195 — ContentEntry Cache & Revalidation.
//
// `scope` (e.g. 'page:about', 'global:navigation') doubles as the Data
// Cache tag: apps/web's fetchers wrap reads in
// unstable_cache(..., { tags: [contentTag(scope)] }); packages/api calls
// triggerRevalidation() after a successful write.
//
// admin and web are separate processes, so admin can't call revalidateTag()
// directly — it POSTs to web's own /api/revalidate route instead, which
// runs inside web's process and calls revalidateTag() there.

export function contentTag(scope: string): string {
  return scope;
}

interface TriggerRevalidationOptions {
  /** Internal Docker service URL (e.g. http://nexus-web:3000), not the public domain. */
  webAppUrl: string;
  secret: string;
  scope: string;
}

/** Logs and swallows failures — a revalidation miss shouldn't fail the admin save. */
export async function triggerRevalidation({ webAppUrl, secret, scope }: TriggerRevalidationOptions): Promise<void> {
  try {
    const res = await fetch(`${webAppUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, tag: contentTag(scope) }),
    });
    if (!res.ok) console.error(`[revalidate] web app returned ${res.status} for scope "${scope}"`);
  } catch (err) {
    console.error(`[revalidate] failed to reach web app for scope "${scope}"`, err);
  }
}
