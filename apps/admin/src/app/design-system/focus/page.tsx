// apps/admin/src/app/design-system/focus/page.tsx
'use client';

export default function FocusPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Focus Ring Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Consistent focus indicators that meet WCAG 2.1 AA.
        </p>

        <div className="flex flex-wrap gap-space-8 items-center">
          <button className="px-space-6 py-space-3 bg-green-base text-text-inverse rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2">
            Focusable Button
          </button>
          <a
            href="#"
            className="px-space-6 py-space-3 text-gold-base border border-gold-base rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2"
          >
            Focusable Link
          </a>
        </div>

        <div className="mt-space-16 p-space-6 bg-surface-elevated border border-border-light rounded-md">
          <h2 className="font-display text-h3 mb-space-4">Token Values</h2>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
            <div>
              <dt className="font-mono text-label">focus-ring-color</dt>
              <dd className="font-mono text-caption text-text-muted">
                var(--focus-ring-color) = #C9973A
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label">focus-ring-width</dt>
              <dd className="font-mono text-caption text-text-muted">
                var(--focus-ring-width) = 2px
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label">focus-ring-offset</dt>
              <dd className="font-mono text-caption text-text-muted">
                var(--focus-ring-offset) = 2px
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
