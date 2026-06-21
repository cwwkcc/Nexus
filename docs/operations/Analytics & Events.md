## Overview

Nexus uses a custom, first-party event collector — built into Next.js middleware plus a dedicated API route — as the system of record for analytics (see `Engineering Roadmap.md`, ADR-007 and Task 7.11). Page views are captured automatically server-side; custom events are sent via a first-party fetch call to the platform's own API, never a third-party script. **Umami**, self-hosted on the same Hetzner server, runs as an independent secondary view — a sanity check that doesn't depend on the platform's own collection code being correct, not the primary data source. If Umami's container is down, the platform's own numbers are unaffected.

This document defines all custom events, properties, and privacy considerations for the primary collector.

**Primary dashboard:** the Analytics Module inside `apps/admin` (Task 7.11), reading from the platform's own data store. **Secondary dashboard (Umami):** `https://analytics.cwwkcc.lk` (internal only)

---

## Page Views (Automatic)

Captured server-side by Next.js middleware on every request to the public site — no client-side code, no script tag, nothing for the browser to load. Umami also tracks page views client-side as the secondary signal, so the two numbers can be compared.

---

## Custom Events

All custom events are sent via a first-party fetch call to the platform's own API route — never a third-party script, and never a direct `window.umami.track()` call from component code. Use a shared utility:

```typescript
// lib/analytics.ts
export const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName, payload }),
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the page. Fail silently.
  });
};
```

The API route writes the event to the platform's own analytics table, which feeds the Analytics Module (Task 7.11). Where Umami is also configured, the same route can optionally mirror the event to it server-side — the public site itself never loads Umami's tracking script for custom events, only (optionally) for the automatic page-view signal mentioned above.

---

### 1. `cta_admissions_click`

**Trigger:** Click on any button or link that leads to the admissions page or initiates admission process.

**Properties:**

|Property|Type|Description|
|---|---|---|
|`page`|string|Current page path|
|`cta_position`|string|`hero`, `nav`, `footer`, `sidebar`, `in‑content`|

**Example:**

```typescript
trackEvent('cta_admissions_click', { page: '/', cta_position: 'hero' });
```

---

### 2. `results_search`

**Trigger:** Submission of results lookup form (valid or invalid).

**Properties:**

|Property|Type|Description|
|---|---|---|
|`exam_type`|string|`ol`, `al`, `scholarship`|
|`year`|number|Exam year|
|`success`|boolean|Whether results were found|

**Important:** Do **not** send index number, name, or any PII.

**Example:**

```typescript
trackEvent('results_search', { exam_type: 'ol', year: 2025, success: true });
```

---

### 3. `society_join_click`

**Trigger:** Click on “Join Society” button on any society page.

**Properties:**

|Property|Type|Description|
|---|---|---|
|`society_slug`|string|Slug of the society (e.g., `kits`)|

**Example:**

```typescript
trackEvent('society_join_click', { society_slug: 'kits' });
```

---

### 4. `news_article_opened`

**Trigger:** Full load of a news article page (`/news/[slug]`).

**Properties:**

|Property|Type|Description|
|---|---|---|
|`article_title`|string|Title of the article|
|`category`|string|`academic`, `sports`, `events`, `achievements`|

**Example:**

```typescript
trackEvent('news_article_opened', { article_title: 'KITS Launches Nexus', category: 'technology' });
```

---

### 5. `contact_form_submit`

**Trigger:** Successful submission of contact form (general enquiry or feedback).

**Properties:**

|Property|Type|Description|
|---|---|---|
|`form_type`|string|`general`, `feedback`|

**Example:**

```typescript
trackEvent('contact_form_submit', { form_type: 'general' });
```

---

### 6. `gallery_album_view`

**Trigger:** Opening a gallery album (i.e., when the lightbox or album page is loaded).

**Properties:**

|Property|Type|Description|
|---|---|---|
|`album_title`|string|Title of the album|

**Example:**

```typescript
trackEvent('gallery_album_view', { album_title: 'Prize Giving 2025' });
```

---

### 7. `download_document`

**Trigger:** Click on a download link for a PDF (admission form, prospectus, results sheet, etc.).

**Properties:**

|Property|Type|Description|
|---|---|---|
|`document_name`|string|File name or identifier (e.g., `admission-form-2026`)|

**Example:**

```typescript
trackEvent('download_document', { document_name: 'admission-form-2026' });
```

---

### 8. `search_query`

**Trigger:** When a user performs a site‑wide search (Feature Registry F‑134, Roadmap Task 8.14).

**Properties:**

|Property|Type|Description|
|---|---|---|
|`query`|string|Search term (aggregated, not stored per user)|
|`result_count`|number|Number of results|

---

## Implementation in Components

Wrap the `trackEvent` call in a `useAnalytics` hook:

```typescript
// hooks/useAnalytics.ts
import { useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

export function useAnalytics() {
  const track = useCallback((eventName: string, payload?: Record<string, unknown>) => {
    trackEvent(eventName, payload);
  }, []);
  return { track };
}
```

Use in component:

```tsx
const { track } = useAnalytics();

<Button onClick={() => {
  track('cta_admissions_click', { page: router.pathname, cta_position: 'hero' });
  router.push('/admissions');
}}>
  Apply Now
</Button>
```

---

## Privacy & Compliance

- **No PII** – Never send personal data (names, index numbers, email addresses).
- **IP anonymisation** – The custom collector anonymises IP addresses before storage (e.g. zeroing the last octet) — this is enforced in code Nexus owns and can audit directly, not delegated to a third-party's privacy policy. Where Umami also runs, it is separately configured to anonymise IPs as the secondary signal.
- **Do Not Track** – Respect `navigator.doNotTrack`. If enabled, no events are sent.
- **Cookie consent** – Events are only sent after user accepts analytics cookies (see `CookieConsentBanner` component).

---

## Dashboard & Access

The primary dashboard is the Analytics Module inside the admin panel (Task 7.11) — accessible under the platform's own role-based access control, no separate credential set. The secondary Umami dashboard is restricted to KITS leads and administration, with credentials managed via environment variables.

**Default views (primary dashboard):**

- Real‑time visitors
- Page views over time
- Event breakdowns
- Search terms and result counts
- Device / browser / language distribution

**Custom metrics:** can be added to the primary dashboard as needed, since it reads from a table Nexus controls directly.

---

## Testing

During development, log events to the console instead of (or before) sending them:

```typescript
if (process.env.NODE_ENV !== 'production') {
  console.log('[analytics]', eventName, payload);
}
```

Staging sends events to a separate analytics table, not the production one. If Umami is also configured for staging, point it at a separate staging instance rather than the production one.

---

## Related Documents

- [Foundations](https://claude.ai/chat/Foundations.md) – privacy and performance
- [Page Specifications](https://claude.ai/chat/Page%20Specifications.md) – event placement per page
- [Engineering Roadmap](https://claude.ai/Engineering%20Roadmap.md) – ADR-007 (why the custom collector is primary) and Task 7.11 (the Analytics Module)

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_