// apps/admin/src/app/design-system/focus/page.tsx
'use client';

// CSS custom properties used:
//   --focus-ring-color : #C9973A
//   --focus-ring-width : 2px
//   --focus-ring-offset: 2px

const focusStyle = {
  outline: 'var(--focus-ring-width) solid var(--focus-ring-color)',
  outlineOffset: 'var(--focus-ring-offset)',
} as const;

const tokens = [
  {
    token: 'focus-ring-color',
    var: '--focus-ring-color',
    value: '#C9973A',
    description: 'Gold — high contrast on both light and dark surfaces',
  },
  {
    token: 'focus-ring-width',
    var: '--focus-ring-width',
    value: '2px',
    description: 'Meets WCAG 2.1 AA minimum 2 CSS px focus indicator size',
  },
  {
    token: 'focus-ring-offset',
    var: '--focus-ring-offset',
    value: '2px',
    description: 'Gap between element and ring for visual separation',
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-space-16">
      <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">{title}</h3>
      {children}
    </div>
  );
}

export default function FocusPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Focus Ring Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-12">Consistent focus indicators that meet WCAG 2.1 AA. Applied via CSS custom properties so they update globally from a single source of truth.</p>

      {/* Token reference */}
      <Section title="Token Values">
        <div className="flex flex-col gap-space-3">
          {tokens.map(({ token, var: cssVar, value, description }) => (
            <div key={token} className="flex items-start gap-space-6 p-space-4 bg-surface-elevated border border-border-light rounded-md">
              {/* Swatch */}
              <div
                className="shrink-0 rounded-sm border border-border-light mt-space-1"
                style={{
                  width: 20,
                  height: 20,
                  background: token === 'focus-ring-color' ? value : 'var(--color-surface-default)',
                  outline: token !== 'focus-ring-color' ? `${value} solid var(--color-gold-base)` : undefined,
                }}
              />
              <div className="flex flex-col gap-space-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-space-3">
                  <code className="font-mono text-label text-text-primary">{cssVar}</code>
                  <code className="font-mono text-caption text-gold-base">{value}</code>
                </div>
                <span className="font-body text-caption text-text-muted">{description}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Always-visible demos — light surface */}
      <Section title="Always-Visible Demo — Light Surface">
        <p className="font-body text-caption text-text-muted mb-space-6">
          Focus ring applied with <code className="font-mono bg-surface-default px-space-1 rounded-sm">outline: var(--focus-ring-width) solid var(--focus-ring-color)</code> and <code className="font-mono bg-surface-default px-space-1 rounded-sm">outline-offset: var(--focus-ring-offset)</code>.
        </p>
        <div className="flex flex-wrap gap-space-8 items-start">
          {/* Filled button */}
          <div className="flex flex-col items-center gap-space-3">
            <button className="px-space-6 py-space-3 bg-green-base text-text-inverse rounded-md font-body text-label" style={focusStyle}>
              Primary Button
            </button>
            <span className="font-mono text-caption text-text-muted">bg-green-base</span>
          </div>

          {/* Ghost button */}
          <div className="flex flex-col items-center gap-space-3">
            <button className="px-space-6 py-space-3 border border-gold-base text-gold-base rounded-md font-body text-label bg-transparent" style={focusStyle}>
              Ghost Button
            </button>
            <span className="font-mono text-caption text-text-muted">border-gold-base</span>
          </div>

          {/* Link */}
          <div className="flex flex-col items-center gap-space-3">
            <a href="#" className="font-body text-label text-gold-base underline underline-offset-2 rounded-sm" style={focusStyle}>
              Text Link
            </a>
            <span className="font-mono text-caption text-text-muted">anchor / link</span>
          </div>

          {/* Input */}
          <div className="flex flex-col items-center gap-space-3">
            <input type="text" className="px-space-4 py-space-3 bg-surface-elevated border border-border-light rounded-md font-body text-label text-text-primary" defaultValue="Input field" style={focusStyle} />
            <span className="font-mono text-caption text-text-muted">text input</span>
          </div>

          {/* Icon button */}
          <div className="flex flex-col items-center gap-space-3">
            <button className="w-size-11 h-size-11 flex items-center justify-center bg-surface-elevated border border-border-light rounded-md text-text-muted hover:text-text-primary" style={focusStyle} aria-label="Icon button example">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <span className="font-mono text-caption text-text-muted">icon button</span>
          </div>
        </div>
      </Section>

      {/* Always-visible demos — dark surface */}
      <Section title="Always-Visible Demo — Dark Surface">
        <div className="p-space-8 rounded-md flex flex-wrap gap-space-8 items-start" style={{ background: 'var(--color-green-dark, #1a2e1a)' }}>
          <div className="flex flex-col items-center gap-space-3">
            <button className="px-space-6 py-space-3 bg-gold-base text-text-inverse rounded-md font-body text-label" style={focusStyle}>
              Gold Button
            </button>
            <span className="font-mono text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
              on dark bg
            </span>
          </div>
          <div className="flex flex-col items-center gap-space-3">
            <button className="px-space-6 py-space-3 border border-gold-base text-gold-base rounded-md font-body text-label bg-transparent" style={focusStyle}>
              Ghost on Dark
            </button>
            <span className="font-mono text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
              on dark bg
            </span>
          </div>
        </div>
      </Section>

      {/* Interactive keyboard demo */}
      <Section title="Interactive Keyboard Demo">
        <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md mb-space-4">
          <p className="font-body text-caption text-text-muted mb-space-6 flex items-center gap-space-2">
            <kbd className="px-space-2 py-space-1 bg-surface-default border border-border-light rounded-sm font-mono text-caption">Tab</kbd>
            <span>through these elements to see the focus ring in action.</span>
          </p>
          <div className="flex flex-wrap gap-space-6">
            <button className="px-space-6 py-space-3 bg-green-base text-text-inverse rounded-md font-body text-label focus-visible:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-color)] focus-visible:[outline-offset:var(--focus-ring-offset)]">First</button>
            <button className="px-space-6 py-space-3 border border-gold-base text-gold-base rounded-md font-body text-label bg-transparent focus-visible:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-color)] focus-visible:[outline-offset:var(--focus-ring-offset)]">Second</button>
            <input type="text" className="px-space-4 py-space-3 bg-surface-default border border-border-light rounded-md font-body text-label text-text-primary focus:outline-none focus:[outline:var(--focus-ring-width)_solid_var(--focus-ring-color)] focus:[outline-offset:var(--focus-ring-offset)]" placeholder="Type here…" />
            <a href="#" className="px-space-6 py-space-3 font-body text-label text-gold-base underline underline-offset-2 rounded-sm focus-visible:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-color)] focus-visible:[outline-offset:var(--focus-ring-offset)]">
              Link
            </a>
          </div>
        </div>
        <p className="font-body text-caption text-text-muted">
          <code className="font-mono bg-surface-default px-space-1 rounded-sm">focus-visible</code> only activates on keyboard navigation, not on mouse click — per <a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible" target="_blank" rel="noopener noreferrer" className="text-gold-base underline underline-offset-2">
            WCAG 2.1 SC 2.4.7
          </a>.
        </p>
      </Section>

      {/* Usage guide */}
      <Section title="Usage">
        <div className="flex flex-col gap-space-4">
          {/* CSS custom property approach */}
          <div className="p-space-4 bg-surface-elevated border border-border-light rounded-md">
            <p className="font-body text-caption text-text-muted mb-space-2">Inline style — direct CSS token consumption:</p>
            <pre className="font-mono text-caption text-text-primary overflow-x-auto">
              {`style={{
  outline: "var(--focus-ring-width) solid var(--focus-ring-color)",
  outlineOffset: "var(--focus-ring-offset)",
}}`}
            </pre>
          </div>
          {/* Tailwind arbitrary approach */}
          <div className="p-space-4 bg-surface-elevated border border-border-light rounded-md">
            <p className="font-body text-caption text-text-muted mb-space-2">
              Tailwind arbitrary value — keyboard-only via <code className="font-mono bg-surface-default px-space-1 rounded-sm">focus-visible</code>:
            </p>
            <pre className="font-mono text-caption text-text-primary overflow-x-auto">
              {`className="focus-visible:outline-none
focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-color)]
focus-visible:[outline-offset:var(--focus-ring-offset)]"`}
            </pre>
          </div>
        </div>
      </Section>
    </div>
  );
}
