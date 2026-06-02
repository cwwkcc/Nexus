## Overview

Nexus uses **Umami** (self‑hosted) for privacy‑respecting analytics. This document defines all custom events, properties, and privacy considerations.

**Umami dashboard:** `https://analytics.cwwkcc.lk` (internal only)

---

## Page Views (Automatic)

Umami automatically tracks page views. No custom event needed.

---

## Custom Events

All events are sent via `window.umami.track(eventName, payload)`. Use a shared utility:

```typescript
// lib/analytics.ts
export const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, payload);
  }
};
```

---

### 1. `cta_admissions_click`

**Trigger:** Click on any button or link that leads to the admissions page or initiates admission process.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `page` | string | Current page path |
| `cta_position` | string | `hero`, `nav`, `footer`, `sidebar`, `in‑content` |

**Example:**

```typescript
trackEvent('cta_admissions_click', { page: '/', cta_position: 'hero' });
```

---

### 2. `results_search`

**Trigger:** Submission of results lookup form (valid or invalid).

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `exam_type` | string | `ol`, `al`, `scholarship` |
| `year` | number | Exam year |
| `success` | boolean | Whether results were found |

**Important:** Do **not** send index number, name, or any PII.

**Example:**

```typescript
trackEvent('results_search', { exam_type: 'ol', year: 2025, success: true });
```

---

### 3. `society_join_click`

**Trigger:** Click on “Join Society” button on any society page.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `society_slug` | string | Slug of the society (e.g., `kits`) |

**Example:**

```typescript
trackEvent('society_join_click', { society_slug: 'kits' });
```

---

### 4. `news_article_opened`

**Trigger:** Full load of a news article page (`/news/[slug]`).

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `article_title` | string | Title of the article |
| `category` | string | `academic`, `sports`, `events`, `achievements` |

**Example:**

```typescript
trackEvent('news_article_opened', { article_title: 'KITS Launches Nexus', category: 'technology' });
```

---

### 5. `contact_form_submit`

**Trigger:** Successful submission of contact form (general enquiry or feedback).

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `form_type` | string | `general`, `feedback` |

**Example:**

```typescript
trackEvent('contact_form_submit', { form_type: 'general' });
```

---

### 6. `gallery_album_view`

**Trigger:** Opening a gallery album (i.e., when the lightbox or album page is loaded).

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `album_title` | string | Title of the album |

**Example:**

```typescript
trackEvent('gallery_album_view', { album_title: 'Prize Giving 2025' });
```

---

### 7. `download_document`

**Trigger:** Click on a download link for a PDF (admission form, prospectus, results sheet, etc.).

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `document_name` | string | File name or identifier (e.g., `admission-form-2026`) |

**Example:**

```typescript
trackEvent('download_document', { document_name: 'admission-form-2026' });
```

---

### 8. `search_query` (optional, future)

**Trigger:** When a user performs a site‑wide search (if implemented).

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `query` | string | Search term (aggregated, not stored per user) |
| `result_count` | number | Number of results |

---

## Implementation in Components

Wrap the `trackEvent` call in a `useAnalytics` hook:

```typescript
// hooks/useAnalytics.ts
import { useCallback } from 'react';

export function useAnalytics() {
  const track = useCallback((eventName: string, payload?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track(eventName, payload);
    }
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
- **IP anonymisation** – Umami is configured to anonymise IP addresses.
- **Do Not Track** – Respect `navigator.doNotTrack`. If enabled, no events are sent.
- **Cookie consent** – Events are only sent after user accepts analytics cookies (see `CookieConsentBanner` component).

---

## Dashboard & Access

Umami dashboard accessible only to KITS leads and administration. Credentials managed via environment variables.

**Default dashboards:**
- Real‑time visitors
- Page views over time
- Event breakdowns
- Referrers
- Device / browser statistics

**Custom metrics:** can be created as needed.

---

## Testing

During development, use `window.umami.debug = true` to see events in console.

Staging environment sends events to a separate Umami instance (or same with `?umami_debug`).

---

## Related Documents

- [Foundations](./Design%20System/Foundations.md) – privacy and performance
- [Page Specifications](./Design%20System/Page%20Specifications.md) – event placement per page

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*


---



