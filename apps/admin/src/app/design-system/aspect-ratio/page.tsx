// apps/admin/src/app/design-system/aspect-ratio/page.tsx
'use client';

import { ImageFrame } from '@nexus/ui';

// Ratios defined in packages/config/src/tokens/aspectRatio.ts
const definedRatios = [
  {
    label: 'hero',
    token: 'aspect-hero',
    cssVar: '--aspect-hero',
    value: '16 / 9',
    ratio: '16:9' as const,
    description: 'Widescreen — hero banners, video thumbnails, event covers',
    aspectRatio: '16/9' as const,
  },
  {
    label: 'portrait',
    token: 'aspect-portrait',
    cssVar: '--aspect-portrait',
    value: '3 / 4',
    ratio: '3:4' as const,
    description: 'Portrait — staff photos, student cards, ID-style images',
    aspectRatio: '3/4' as const,
  },
  {
    label: 'square',
    token: 'aspect-square',
    cssVar: '--aspect-square',
    value: '1 / 1',
    ratio: '1:1' as const,
    description: 'Square — avatars, logos, icon thumbnails',
    aspectRatio: '1/1' as const,
  },
] as const;

// Not yet a named token — used as a raw value
const customRatios = [
  {
    label: 'event',
    token: null,
    cssVar: null,
    value: '16 / 7',
    ratio: '16:7' as const,
    description:
      'Ultra-wide — event banners, panoramic gallery images (planned token)',
    aspectRatio: '16/7',
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-space-16">
      <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function AspectRatioPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Aspect Ratio Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-4">
        Named aspect ratios for images and media. Tailwind utility:{' '}
        <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">
          aspect-*
        </code>
        . CSS var:{' '}
        <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">
          var(--aspect-*)
        </code>
        .
      </p>

      {/* Token reference table */}
      <div className="mb-space-12 flex flex-col gap-space-2">
        {definedRatios.map(({ label, token, cssVar, value, description }) => (
          <div
            key={label}
            className="flex items-start gap-space-6 p-space-4 bg-surface-elevated border border-border-light rounded-md"
          >
            <code
              className="font-mono text-label text-text-primary shrink-0"
              style={{ width: 110 }}
            >
              {token}
            </code>
            <code
              className="font-mono text-caption text-gold-base shrink-0"
              style={{ width: 56 }}
            >
              {value}
            </code>
            <span className="font-body text-caption text-text-muted">
              {description}
            </span>
          </div>
        ))}
        {customRatios.map(({ label, value, description }) => (
          <div
            key={label}
            className="flex items-start gap-space-6 p-space-4 bg-surface-elevated border border-border-light rounded-md opacity-70"
          >
            <code
              className="font-mono text-label text-text-muted shrink-0"
              style={{ width: 110 }}
            >
              (planned)
            </code>
            <code
              className="font-mono text-caption text-text-muted shrink-0"
              style={{ width: 56 }}
            >
              {value}
            </code>
            <span className="font-body text-caption text-text-muted">
              {description}
            </span>
          </div>
        ))}
      </div>

      {/* Named token demos */}
      <Section title="Named Tokens">
        <div className="flex flex-col gap-space-10">
          {definedRatios.map(
            ({ label, token, cssVar, ratio, description, aspectRatio }) => (
              <div key={label}>
                <div className="flex items-baseline gap-space-4 mb-space-3">
                  <h4 className="font-display text-h3">{label}</h4>
                  <code className="font-mono text-caption text-text-muted">
                    {ratio}
                  </code>
                  <code className="font-mono text-caption text-gold-base">
                    {token}
                  </code>
                </div>
                <ImageFrame
                  src="/images/ironman.jpg"
                  alt={`Aspect ratio demo — ${ratio}`}
                  aspectRatio={aspectRatio}
                  className="w-size-64"
                />
                <p className="font-body text-caption text-text-muted mt-space-2">
                  {description}
                </p>
              </div>
            ),
          )}
        </div>
      </Section>

      {/* Custom / planned */}
      <Section title="Planned Tokens">
        <div className="flex flex-col gap-space-10">
          {customRatios.map(({ label, ratio, description, aspectRatio }) => (
            <div key={label}>
              <div className="flex items-baseline gap-space-4 mb-space-3">
                <h4 className="font-display text-h3">{label}</h4>
                <code className="font-mono text-caption text-text-muted">
                  {ratio}
                </code>
                <span className="font-mono text-caption text-text-muted italic">
                  not yet in aspectRatio.ts
                </span>
              </div>
              <ImageFrame
                src="/images/ironman.jpg"
                alt={`Aspect ratio demo — ${ratio}`}
                className="w-size-64"
              />
              <p className="font-body text-caption text-text-muted mt-space-2">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
