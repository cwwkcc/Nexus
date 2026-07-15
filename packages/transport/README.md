# @nexus/transport

Transport-agnostic contracts and utilities for talking to APIs over HTTP.

## What this is for

Calls that **don't** go through tRPC (`@nexus/api`) — third-party services
(Resend, R2, reCAPTCHA, etc.) or any plain REST endpoint. One client, one
error shape, one set of header/pagination/serialization helpers, instead of
every call site re-inventing `fetch`, retry loops, and `AbortController`.

## What this is not for

- It is **not** `@nexus/api`. Nexus's internal web ↔ backend traffic goes
  through tRPC (`@nexus/api`), which already gives full type inference
  end-to-end — don't route internal calls through this package instead.
- No Next.js, React, hooks, SWR, or React Query.
- No Prisma, no database access.
- No app-specific functions like `getNews()` or `uploadGalleryImage()`.
  Those belong in a service layer that _uses_ this package, not in it.

## Usage

```ts
import { api, ApiError, createAuthHeaders } from '@nexus/transport';

try {
  const message = await api.post<{ id: string }>(
    'https://api.resend.com/emails',
    { to, subject, html },
    {
      headers: createAuthHeaders(process.env.RESEND_API_KEY!),
      timeoutMs: 5000,
      retry: { retries: 2 },
    },
  );
} catch (error) {
  if (error instanceof ApiError) {
    // error.status, error.code, error.details are always populated
  }
}
```

## Exports

- **Client** — `api.get/post/put/patch/delete`, `retry`, `timeout`, `buildUrl`,
  `buildInit`, `parseResponse`, `isSuccess`/`isRedirect`/`isClientError`/`isServerError`,
  `isJsonResponse`/`isTextResponse`/`isBlobResponse`
- **Errors** — `ApiError`, `normalizeError`, `codeFromStatus`
- **Headers** — `createJsonHeaders`, `createAuthHeaders`, `createCacheHeaders`, `createNoCacheHeaders`
- **Utils** — `buildQuery`, `joinUrl`, `mergeDeep`
- **Serialization** — `toJson`/`fromJson`, `toSearchParams`, `toFormData`
- **Pagination** — `parseCursorParams`/`createCursorPage`, `parseOffsetParams`/`createOffsetPage`

No logging inside the package — pass `onRequest`/`onResponse`/`onError` hooks
on any call if you want to log; the app decides what logging system to use.
