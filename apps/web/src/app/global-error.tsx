'use client';

// apps/web/src/app/global-error.tsx
//
// The one error boundary that must render its own <html>/<body>. Every
// other error.tsx (e.g. [locale]/error.tsx) only replaces its own segment
// — the layout above it is assumed to still be working, so it can lean on
// that layout's <html>/<body>, global CSS, and providers. global-error.tsx
// exists for the opposite case: an error in the root layout itself (here,
// [locale]/layout.tsx doubles as the root layout — there's no separate
// app/layout.tsx). If THAT crashes, there's no working layout left to
// render inside of, so this file has to supply the entire document
// itself. That's also why it lives outside [locale]: [locale]/layout.tsx
// might be exactly what's broken, so nothing under [locale] can be
// trusted to still work either.
//
// Deliberately dependency-light: no @nexus/ui, no next-intl. Both depend
// on context/providers a broken root layout might have been supplying —
// pulling them in here risks the fallback itself failing to render.
// @nexus/tokens and @nexus/contracts are safe (plain constants, no React
// context, no CSS pipeline), so colors and the locale list still come
// from the same single source of truth as everywhere else.
//
// Locale detection reads the URL directly rather than next-intl's routing
// context (unavailable here — see above). Good enough to get <html lang>
// right; not used for translated copy, since there's no verified
// Sinhala/Tamil wording for this content yet.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { brandColors, statusColors, surface, text } from '@nexus/tokens';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function detectLocale(): LocaleEnumData {
  if (typeof window === 'undefined') return 'en';
  const segment = window.location.pathname.split('/')[1];
  return SUPPORTED_LOCALES.includes(segment as LocaleEnumData) ? (segment as LocaleEnumData) : 'en';
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang={detectLocale()}>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: surface.base,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '28rem',
              width: '100%',
              backgroundColor: surface.default,
              padding: '2rem',
              borderRadius: '0.5rem',
              borderTop: `4px solid ${statusColors.error.base}`,
            }}
          >
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: statusColors.error.base, margin: '0 0 0.5rem 0' }}>Critical Error</h1>
            <p style={{ fontSize: '1.125rem', color: text.primary, margin: '0 0 1.5rem 0' }}>The application encountered a critical error and cannot continue. Please try refreshing the page.</p>

            {process.env.NODE_ENV === 'development' && (
              <details style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <summary style={{ fontWeight: 600, cursor: 'pointer', color: text.muted }}>Error Details (Dev Only)</summary>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.8rem', color: text.muted, marginTop: '0.5rem' }}>{error.message}</pre>
                {error.digest && <p style={{ fontSize: '0.75rem', color: text.subtle, marginTop: '0.5rem' }}>Digest: {error.digest}</p>}
              </details>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => reset()} style={{ padding: '0.5rem 1.25rem', backgroundColor: brandColors.green.base, color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                Try Again
              </button>
              <button onClick={() => (window.location.href = '/')} style={{ padding: '0.5rem 1.25rem', backgroundColor: 'transparent', color: text.primary, border: `1px solid ${text.muted}`, borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
