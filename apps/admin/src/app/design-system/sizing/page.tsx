// apps/admin/src/app/design-system/sizing/page.tsx
'use client';

// ─── Scale groups ─────────────────────────────────────────────────────────────

type Token = { token: string; value: string; px: number };

const strokeTokens: Token[] = [
  { token: 'size-px', value: '1px', px: 1 },
  { token: 'size-0p5', value: '2px', px: 2 },
  { token: 'size-1', value: '4px', px: 4 },
  { token: 'size-1p5', value: '6px', px: 6 },
  { token: 'size-2', value: '8px', px: 8 },
  { token: 'size-2p5', value: '10px', px: 10 },
  { token: 'size-3', value: '12px', px: 12 },
  { token: 'size-3p5', value: '14px', px: 14 },
];

const componentTokens: Token[] = [
  { token: 'size-4', value: '16px', px: 16 },
  { token: 'size-5', value: '20px', px: 20 },
  { token: 'size-6', value: '24px', px: 24 },
  { token: 'size-7', value: '28px', px: 28 },
  { token: 'size-8', value: '32px', px: 32 },
  { token: 'size-9', value: '36px', px: 36 },
  { token: 'size-10', value: '40px', px: 40 },
  { token: 'size-11', value: '44px', px: 44 },
  { token: 'size-12', value: '48px', px: 48 },
  { token: 'size-13', value: '52px', px: 52 },
  { token: 'size-14', value: '56px', px: 56 },
  { token: 'size-15', value: '60px', px: 60 },
  { token: 'size-16', value: '64px', px: 64 },
];

const blockTokens: Token[] = [
  { token: 'size-20', value: '80px', px: 80 },
  { token: 'size-22', value: '88px', px: 88 },
  { token: 'size-24', value: '96px', px: 96 },
  { token: 'size-26', value: '104px', px: 104 },
  { token: 'size-28', value: '112px', px: 112 },
  { token: 'size-30', value: '120px', px: 120 },
  { token: 'size-32', value: '128px', px: 128 },
  { token: 'size-34', value: '136px', px: 136 },
  { token: 'size-36', value: '144px', px: 144 },
  { token: 'size-38', value: '152px', px: 152 },
  { token: 'size-40', value: '160px', px: 160 },
  { token: 'size-44', value: '176px', px: 176 },
  { token: 'size-48', value: '192px', px: 192 },
];

const sectionTokens: Token[] = [
  { token: 'size-56', value: '224px', px: 224 },
  { token: 'size-60', value: '240px', px: 240 },
  { token: 'size-64', value: '256px', px: 256 },
  { token: 'size-68', value: '272px', px: 272 },
  { token: 'size-72', value: '288px', px: 288 },
  { token: 'size-76', value: '304px', px: 304 },
  { token: 'size-80', value: '320px', px: 320 },
  { token: 'size-84', value: '336px', px: 336 },
  { token: 'size-88', value: '352px', px: 352 },
  { token: 'size-92', value: '368px', px: 368 },
  { token: 'size-96', value: '384px', px: 384 },
];

const layoutTokens: Token[] = [
  { token: 'size-100', value: '400px', px: 400 },
  { token: 'size-104', value: '416px', px: 416 },
  { token: 'size-108', value: '432px', px: 432 },
  { token: 'size-112', value: '448px', px: 448 },
  { token: 'size-116', value: '464px', px: 464 },
  { token: 'size-120', value: '480px', px: 480 },
  { token: 'size-128', value: '512px', px: 512 },
  { token: 'size-136', value: '544px', px: 544 },
  { token: 'size-144', value: '576px', px: 576 },
  { token: 'size-152', value: '608px', px: 608 },
  { token: 'size-160', value: '640px', px: 640 },
  { token: 'size-168', value: '672px', px: 672 },
  { token: 'size-176', value: '704px', px: 704 },
  { token: 'size-180', value: '720px', px: 720 },
  { token: 'size-192', value: '768px', px: 768 },
];

const containerTokens: Token[] = [
  { token: 'size-200', value: '800px', px: 800 },
  { token: 'size-210', value: '840px', px: 840 },
  { token: 'size-220', value: '880px', px: 880 },
  { token: 'size-225', value: '900px', px: 900 },
  { token: 'size-240', value: '960px', px: 960 },
  { token: 'size-256', value: '1024px', px: 1024 },
  { token: 'size-280', value: '1120px', px: 1120 },
  { token: 'size-300', value: '1200px', px: 1200 },
  { token: 'size-320', value: '1280px', px: 1280 },
  { token: 'size-360', value: '1440px', px: 1440 },
  { token: 'size-384', value: '1536px', px: 1536 },
];

const iconTokens: Token[] = [
  { token: 'icon-sm', value: '16px', px: 16 },
  { token: 'icon-md', value: '20px', px: 20 },
  { token: 'icon-lg', value: '24px', px: 24 },
  { token: 'icon-xl', value: '32px', px: 32 },
];

const borderWidthTokens = [
  { token: 'border-none', value: '0px', px: 0 },
  { token: 'border-sm', value: '1px', px: 1 },
  { token: 'border-md', value: '2px', px: 2 },
  { token: 'border-lg', value: '4px', px: 4 },
  { token: 'border-xl', value: '6px', px: 6 },
  { token: 'border-2xl', value: '8px', px: 8 },
];

const semanticTokens = [
  { token: 'size-0', value: '0px', usage: 'Zero / explicit reset' },
  {
    token: 'size-full',
    value: '100%',
    usage: 'Fill parent (w-size-full, h-size-full)',
  },
  {
    token: 'size-min',
    value: 'min-content',
    usage: 'Shrink to minimum intrinsic width',
  },
  {
    token: 'size-max',
    value: 'max-content',
    usage: 'Expand to maximum intrinsic width',
  },
  {
    token: 'size-fit',
    value: 'fit-content',
    usage: 'Fit to content within constraints',
  },
  { token: 'size-auto', value: 'auto', usage: 'Browser auto sizing' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const BAR_MAX = 320; // max visual bar width in px

function ScaleGroup({
  label,
  description,
  tokens,
  barColor = 'var(--color-gold-pale)',
  borderColor = 'var(--color-gold-base)',
}: {
  label: string;
  description: string;
  tokens: Token[];
  barColor?: string;
  borderColor?: string;
}) {
  const maxPx = Math.max(...tokens.map((t) => t.px));
  return (
    <div className="mb-space-12">
      <h3 className="font-display text-h3 mb-space-1">{label}</h3>
      <p className="font-body text-caption text-text-muted mb-space-4">
        {description}
      </p>
      <div className="flex flex-col gap-space-1p5">
        {tokens.map(({ token, value, px }) => {
          const barWidth = Math.max((px / maxPx) * BAR_MAX, 2);
          return (
            <div key={token} className="flex items-center gap-space-4">
              <span
                className="font-mono text-caption text-text-muted shrink-0"
                style={{ width: 88 }}
              >
                {token}
              </span>
              <span
                className="font-mono text-caption text-text-primary shrink-0 text-right"
                style={{ width: 44 }}
              >
                {value}
              </span>
              <div
                className="rounded-sm"
                style={{
                  width: barWidth,
                  height: 16,
                  background: barColor,
                  border: `1px solid ${borderColor}`,
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-h3 mt-space-16 mb-space-6 pb-space-2 border-b border-border-light">
      {children}
    </h2>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SizingPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Sizing Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-4">
        Width, height, min‑/max‑width, and min‑/max‑height tokens on a 4 px base
        scale.
      </p>
      <div className="flex flex-wrap gap-space-2 mb-space-12">
        {[
          'w-size-*',
          'h-size-*',
          'min-w-size-*',
          'max-w-size-*',
          'min-h-size-*',
          'max-h-size-*',
        ].map((u) => (
          <code
            key={u}
            className="font-mono text-caption bg-surface-default px-space-2 py-space-1 rounded-sm border border-border-light"
          >
            {u}
          </code>
        ))}
        <code className="font-mono text-caption bg-surface-default px-space-2 py-space-1 rounded-sm border border-border-light">
          var(--size-*)
        </code>
      </div>

      {/* ── Scale groups ─────────────────────────────────────────── */}
      <SectionTitle>Scale Groups</SectionTitle>

      <ScaleGroup
        label="Stroke / Sub-pixel"
        description="1–14 px — borders, dividers, hairlines, icon strokes"
        tokens={strokeTokens}
        barColor="var(--color-green-pale, #e8f5e9)"
        borderColor="var(--color-green-base)"
      />

      <ScaleGroup
        label="Component"
        description="16–64 px — icons, avatar, button height, input height, small UI pieces"
        tokens={componentTokens}
      />

      <ScaleGroup
        label="Block"
        description="80–192 px — card thumbnails, sidebar widths, avatar groups, medium panels"
        tokens={blockTokens}
        barColor="var(--color-gold-pale)"
        borderColor="var(--color-gold-base)"
      />

      <ScaleGroup
        label="Section"
        description="224–384 px — modal widths, sidebar panels, form max-widths"
        tokens={sectionTokens}
        barColor="var(--color-green-pale, #e8f5e9)"
        borderColor="var(--color-green-base)"
      />

      <ScaleGroup
        label="Layout"
        description="400–768 px — content column widths, main area constraints"
        tokens={layoutTokens}
      />

      <ScaleGroup
        label="Container"
        description="800–1536 px — full-width containers, page max-widths, hero sections"
        tokens={containerTokens}
        barColor="var(--color-green-pale, #e8f5e9)"
        borderColor="var(--color-green-base)"
      />

      {/* ── Icon sizes ────────────────────────────────────────────── */}
      <SectionTitle>Icon Sizes</SectionTitle>
      <p className="font-body text-caption text-text-muted mb-space-6">
        Semantic icon-size tokens — prefer these over raw{' '}
        <code className="font-mono bg-surface-default px-space-1 rounded-sm">
          size-*
        </code>{' '}
        tokens when sizing icons. CSS var:{' '}
        <code className="font-mono bg-surface-default px-space-1 rounded-sm">
          var(--icon-*)
        </code>
        .
      </p>
      <div className="flex items-end gap-space-8 flex-wrap">
        {iconTokens.map(({ token, value, px }) => (
          <div key={token} className="flex flex-col items-center gap-space-2">
            <div
              className="bg-gold-base rounded-sm"
              style={{ width: px, height: px }}
            />
            <span className="font-mono text-caption text-text-primary">
              {token}
            </span>
            <span className="font-mono text-caption text-text-muted">
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Border widths ─────────────────────────────────────────── */}
      <SectionTitle>Border Widths</SectionTitle>
      <p className="font-body text-caption text-text-muted mb-space-6">
        Semantic border-width tokens. Tailwind utility:{' '}
        <code className="font-mono bg-surface-default px-space-1 rounded-sm">
          border-border-*
        </code>
        . CSS var:{' '}
        <code className="font-mono bg-surface-default px-space-1 rounded-sm">
          var(--border-*)
        </code>
        .
      </p>
      <div className="flex flex-col gap-space-3">
        {borderWidthTokens.map(({ token, value, px }) => (
          <div key={token} className="flex items-center gap-space-4">
            <span
              className="font-mono text-caption text-text-muted shrink-0"
              style={{ width: 88 }}
            >
              {token}
            </span>
            <span
              className="font-mono text-caption text-text-primary shrink-0 text-right"
              style={{ width: 32 }}
            >
              {value}
            </span>
            {px > 0 ? (
              <div
                className="bg-gold-base rounded-sm"
                style={{ width: 160, height: px }}
              />
            ) : (
              <span className="font-mono text-caption text-text-muted italic">
                (no border)
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Viewport fractions ────────────────────────────────────── */}
      <SectionTitle>Viewport Fractions</SectionTitle>
      <p className="font-body text-caption text-text-muted mb-space-6">
        Tokens from{' '}
        <code className="font-mono bg-surface-default px-space-1 rounded-sm">
          size-screen-w-*
        </code>{' '}
        (viewport width) and{' '}
        <code className="font-mono bg-surface-default px-space-1 rounded-sm">
          size-screen-h-*
        </code>{' '}
        (viewport height), in 5 % steps.
      </p>
      <div className="grid grid-cols-2 gap-space-8">
        {/* vw */}
        <div>
          <h4 className="font-body text-label text-text-muted mb-space-3">
            Width (vw)
          </h4>
          <div className="flex flex-col gap-space-1">
            {Array.from({ length: 20 }, (_, i) => {
              const pct = (i + 1) * 5;
              return (
                <div key={pct} className="flex items-center gap-space-4">
                  <span
                    className="font-mono text-caption text-text-muted shrink-0"
                    style={{ width: 148 }}
                  >
                    size-screen-w-{pct}
                  </span>
                  <span className="font-mono text-caption text-text-primary">
                    {pct}vw
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* vh */}
        <div>
          <h4 className="font-body text-label text-text-muted mb-space-3">
            Height (vh)
          </h4>
          <div className="flex flex-col gap-space-1">
            {Array.from({ length: 20 }, (_, i) => {
              const pct = (i + 1) * 5;
              return (
                <div key={pct} className="flex items-center gap-space-4">
                  <span
                    className="font-mono text-caption text-text-muted shrink-0"
                    style={{ width: 148 }}
                  >
                    size-screen-h-{pct}
                  </span>
                  <span className="font-mono text-caption text-text-primary">
                    {pct}vh
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Percentage fractions ──────────────────────────────────── */}
      <SectionTitle>Percentage Fractions</SectionTitle>
      <p className="font-body text-caption text-text-muted mb-space-6">
        Relative to parent — useful for flex/grid children and overlays.
      </p>
      <div className="flex flex-col gap-space-1">
        {Array.from({ length: 20 }, (_, i) => {
          const pct = (i + 1) * 5;
          const barWidth = (pct / 100) * BAR_MAX;
          return (
            <div key={pct} className="flex items-center gap-space-4">
              <span
                className="font-mono text-caption text-text-muted shrink-0"
                style={{ width: 100 }}
              >
                size-pct-{pct}
              </span>
              <span
                className="font-mono text-caption text-text-primary shrink-0 text-right"
                style={{ width: 36 }}
              >
                {pct}%
              </span>
              <div
                className="rounded-sm"
                style={{
                  width: barWidth,
                  height: 14,
                  background: 'var(--color-gold-pale)',
                  border: '1px solid var(--color-gold-base)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Semantic values ───────────────────────────────────────── */}
      <SectionTitle>Semantic Values</SectionTitle>
      <div className="flex flex-col gap-space-2">
        {semanticTokens.map(({ token, value, usage }) => (
          <div
            key={token}
            className="flex items-start gap-space-6 p-space-3 bg-surface-elevated border border-border-light rounded-md"
          >
            <code
              className="font-mono text-caption text-text-primary shrink-0"
              style={{ width: 88 }}
            >
              {token}
            </code>
            <code
              className="font-mono text-caption text-gold-base shrink-0"
              style={{ width: 96 }}
            >
              {value}
            </code>
            <span className="font-body text-caption text-text-muted">
              {usage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
