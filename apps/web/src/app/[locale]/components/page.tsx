'use client';

import { useState } from 'react';
import {
  BeatLoader,
  BarLoader,
  ScaleLoader,
  Button,
  Badge,
} from 'packages/ui/src';

// ─── Types ────────────────────────────────────────────────────────────────────

type SpinnerVariant = 'green' | 'gold' | 'muted';
type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerSpeed = 'fast' | 'normal' | 'slow';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="relative mt-4 rounded-sm overflow-hidden"
      style={{ background: 'var(--surface-inverse)' }}
    >
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-xs px-2 py-1 rounded-sm transition-all"
        style={{
          fontFamily: 'var(--font-body)',
          color: copied ? 'var(--color-gold-light)' : 'var(--text-muted)',
          border: '1px solid var(--border-default)',
          background: 'transparent',
          cursor: 'pointer',
          opacity: 0.8,
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        className="overflow-x-auto text-sm p-5 leading-relaxed"
        style={{
          color: 'var(--color-gold-pale)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{
          color: 'var(--color-gold-base)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {label}
      </p>
      <h2
        className="text-4xl mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)',
          fontWeight: 500,
        }}
      >
        {title}
      </h2>
      <p
        className="text-base max-w-xl"
        style={{
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest mb-4"
      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
    >
      {children}
    </p>
  );
}

function DemoCell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex items-center justify-center w-full rounded-sm p-6"
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
        }}
      >
        {children}
      </div>
      <span
        className="text-xs"
        style={{
          color: 'var(--text-muted)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="my-16"
      style={{ borderTop: '1px solid var(--border-light)' }}
    />
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ComponentGuidePage() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const simulateLoad = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2500);
  };

  return (
    <div style={{ background: 'var(--surface-base)', minHeight: '100vh' }}>
      <div className="content-width py-20">
        {/* ── Page Header ── */}
        <div
          className="mb-20 pb-16"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{
              color: 'var(--color-gold-base)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Nexus Design System
          </p>
          <h1
            className="text-6xl mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            Component Reference
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
            }}
          >
            This guide documents every available prop, variant, and usage
            pattern for the core UI primitives. All components live in{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              packages/ui/src/components/atoms
            </code>{' '}
            and are exported from{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              @nexus/ui
            </code>
            .
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            BEATLOADER
        ════════════════════════════════════════════════ */}
        <SectionTitle
          label="Spinner 01"
          title="BeatLoader"
          description="Three dots that bounce vertically with squash and stretch. Use for inline loading states — inside buttons, next to text, or within small UI regions."
        />

        {/* Variants */}
        <DemoLabel>Variants</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='variant="green"'>
            <BeatLoader variant="green" />
          </DemoCell>
          <DemoCell label='variant="gold"'>
            <BeatLoader variant="gold" />
          </DemoCell>
          <DemoCell label='variant="muted"'>
            <BeatLoader variant="muted" />
          </DemoCell>
        </div>

        {/* Sizes */}
        <DemoLabel>Sizes</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='size="sm"'>
            <BeatLoader size="sm" />
          </DemoCell>
          <DemoCell label='size="md" (default)'>
            <BeatLoader size="md" />
          </DemoCell>
          <DemoCell label='size="lg"'>
            <BeatLoader size="lg" />
          </DemoCell>
        </div>

        {/* Speeds */}
        <DemoLabel>Speeds</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='speed="fast"'>
            <BeatLoader speed="fast" />
          </DemoCell>
          <DemoCell label='speed="normal" (default)'>
            <BeatLoader speed="normal" />
          </DemoCell>
          <DemoCell label='speed="slow"'>
            <BeatLoader speed="slow" />
          </DemoCell>
        </div>

        <CodeBlock
          code={`import { BeatLoader } from '@nexus/ui';

// Default
<BeatLoader />

// All props
<BeatLoader
  variant="green"   // 'green' | 'gold' | 'muted'    — default: 'green'
  size="md"         // 'sm' | 'md' | 'lg'             — default: 'md'
  speed="normal"    // 'fast' | 'normal' | 'slow'     — default: 'normal'
  label="Loading"   // aria-label for screen readers   — default: 'Loading'
  className=""      // extra Tailwind classes
/>`}
        />

        <Divider />

        {/* ════════════════════════════════════════════════
            SCALELOADER
        ════════════════════════════════════════════════ */}
        <SectionTitle
          label="Spinner 02"
          title="ScaleLoader"
          description="Five vertical bars that wave up and down in a symmetric pattern. Use for heavier loading contexts — full sections, data fetches, or page-level transitions."
        />

        <DemoLabel>Variants</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='variant="green"'>
            <ScaleLoader variant="green" />
          </DemoCell>
          <DemoCell label='variant="gold"'>
            <ScaleLoader variant="gold" />
          </DemoCell>
          <DemoCell label='variant="muted"'>
            <ScaleLoader variant="muted" />
          </DemoCell>
        </div>

        <DemoLabel>Sizes</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='size="sm"'>
            <ScaleLoader size="sm" />
          </DemoCell>
          <DemoCell label='size="md" (default)'>
            <ScaleLoader size="md" />
          </DemoCell>
          <DemoCell label='size="lg"'>
            <ScaleLoader size="lg" />
          </DemoCell>
        </div>

        <DemoLabel>Speeds</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='speed="fast"'>
            <ScaleLoader speed="fast" />
          </DemoCell>
          <DemoCell label='speed="normal" (default)'>
            <ScaleLoader speed="normal" />
          </DemoCell>
          <DemoCell label='speed="slow"'>
            <ScaleLoader speed="slow" />
          </DemoCell>
        </div>

        <CodeBlock
          code={`import { ScaleLoader } from '@nexus/ui';

// Default
<ScaleLoader />

// All props
<ScaleLoader
  variant="green"   // 'green' | 'gold' | 'muted'    — default: 'green'
  size="md"         // 'sm' | 'md' | 'lg'             — default: 'md'
  speed="normal"    // 'fast' | 'normal' | 'slow'     — default: 'normal'
  label="Loading"   // aria-label for screen readers   — default: 'Loading'
  className=""      // extra Tailwind classes
/>`}
        />

        <Divider />

        {/* ════════════════════════════════════════════════
            BARLOADER
        ════════════════════════════════════════════════ */}
        <SectionTitle
          label="Spinner 03"
          title="BarLoader"
          description="A horizontal track with a shimmer sweep. Use for progress-like contexts — results loading, data tables, or any wide container where a linear loader feels natural."
        />

        <DemoLabel>Variants</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='variant="green"'>
            <BarLoader variant="green" />
          </DemoCell>
          <DemoCell label='variant="gold"'>
            <BarLoader variant="gold" />
          </DemoCell>
          <DemoCell label='variant="muted"'>
            <BarLoader variant="muted" />
          </DemoCell>
        </div>

        <DemoLabel>Sizes</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='size="sm"'>
            <BarLoader size="sm" />
          </DemoCell>
          <DemoCell label='size="md" (default)'>
            <BarLoader size="md" />
          </DemoCell>
          <DemoCell label='size="lg"'>
            <BarLoader size="lg" />
          </DemoCell>
        </div>

        <DemoLabel>Speeds</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='speed="fast"'>
            <BarLoader speed="fast" />
          </DemoCell>
          <DemoCell label='speed="normal" (default)'>
            <BarLoader speed="normal" />
          </DemoCell>
          <DemoCell label='speed="slow"'>
            <BarLoader speed="slow" />
          </DemoCell>
        </div>

        <CodeBlock
          code={`import { BarLoader } from '@nexus/ui';

// Default
<BarLoader />

// All props
<BarLoader
  variant="green"   // 'green' | 'gold' | 'muted'    — default: 'green'
  size="md"         // 'sm' | 'md' | 'lg'             — default: 'md'
  speed="normal"    // 'fast' | 'normal' | 'slow'     — default: 'normal'
  label="Loading"   // aria-label for screen readers   — default: 'Loading'
  className=""      // extra Tailwind classes
/>`}
        />

        <Divider />

        {/* ════════════════════════════════════════════════
            BUTTON
        ════════════════════════════════════════════════ */}
        <SectionTitle
          label="Primitive 01"
          title="Button"
          description="The core interactive primitive. Supports six semantic variants, three sizes, icon slots, a loading state that preserves width, and full native button prop forwarding."
        />

        {/* Variants */}
        <DemoLabel>Variants</DemoLabel>
        <div
          className="grid grid-cols-3 gap-4 p-8 rounded-sm mb-2"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <p
          className="text-xs mb-8"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
        >
          Note:{' '}
          <code style={{ fontFamily: 'ui-monospace, monospace' }}>link</code>{' '}
          renders without uppercase — it uses normal tracking intentionally.
        </p>

        {/* Sizes */}
        <DemoLabel>Sizes</DemoLabel>
        <div
          className="flex flex-wrap items-center gap-4 p-8 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        {/* Loading state */}
        <DemoLabel>Loading state — width is preserved</DemoLabel>
        <div
          className="flex flex-wrap items-center gap-4 p-8 rounded-sm mb-2"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button loading={buttonLoading} onClick={simulateLoad}>
            {buttonLoading ? 'Saving…' : 'Click to simulate'}
          </Button>
          <Button variant="secondary" loading={buttonLoading}>
            Secondary
          </Button>
          <Button size="lg" loading={buttonLoading}>
            Large button
          </Button>
        </div>
        <p
          className="text-xs mb-8"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
        >
          Children stay mounted but become invisible during loading — no layout
          shift.
        </p>

        {/* Disabled */}
        <DemoLabel>Disabled</DemoLabel>
        <div
          className="flex flex-wrap items-center gap-4 p-8 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </div>

        {/* Icons */}
        <DemoLabel>With icons</DemoLabel>
        <div
          className="flex flex-wrap items-center gap-4 p-8 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button leftIcon={<span>←</span>}>Left Icon</Button>
          <Button rightIcon={<span>→</span>}>Right Icon</Button>
          <Button leftIcon={<span>←</span>} rightIcon={<span>→</span>}>
            Both Icons
          </Button>
          <Button variant="secondary" rightIcon={<span>↗</span>}>
            View Results
          </Button>
        </div>

        {/* Full width */}
        <DemoLabel>Full width</DemoLabel>
        <div
          className="p-8 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button fullWidth>Full Width Button</Button>
        </div>

        <CodeBlock
          code={`import { Button } from '@nexus/ui';

// Default
<Button>Label</Button>

// All props
<Button
  variant="primary"      // 'primary' | 'secondary' | 'ghost'
                         // 'outline' | 'destructive' | 'link'  — default: 'primary'
  size="md"              // 'sm' | 'md' | 'lg' | 'icon'         — default: 'md'
  loading={false}        // shows BeatLoader, preserves width     — default: false
  disabled={false}       // disables interaction                  — default: false
  fullWidth={false}      // w-full                               — default: false
  leftIcon={<Icon />}    // rendered before children
  rightIcon={<Icon />}   // rendered after children
  type="button"          // 'button' | 'submit' | 'reset'        — default: 'button'
  className=""           // extra Tailwind — uses twMerge, safe to override
  onClick={handler}      // any native button prop works via ...rest
>
  Label
</Button>

// Icon-only — aria-label is required (dev warning fires without it)
<Button size="icon" aria-label="Close menu">
  <CloseIcon />
</Button>`}
        />

        {/* ── data-* note ── */}
        <div
          className="mt-8 p-5 rounded-sm"
          style={{
            background: 'var(--surface-deep)',
            border: '1px solid var(--border-default)',
          }}
        >
          <p
            className="text-sm font-medium mb-2"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-primary)',
            }}
          >
            data-* attributes
          </p>
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}
          >
            Every button renders{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              data-variant
            </code>
            ,{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              data-size
            </code>
            ,{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              data-loading
            </code>
            , and{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              data-disabled
            </code>{' '}
            attributes. Use these for CSS targeting, automated testing
            selectors, or debugging in DevTools.
          </p>
          <CodeBlock
            code={`/* CSS targeting via data attributes */
[data-variant="destructive"]:hover { ... }
[data-loading] { pointer-events: none; }

/* Test selectors */
screen.getByRole('button', { name: /save/i });
document.querySelector('[data-variant="primary"][data-loading]');`}
          />
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-20 pt-8"
          style={{ borderTop: '1px solid var(--border-light)' }}
        >
          <p
            className="text-xs"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Nexus Design System · packages/ui · Last updated 2026
          </p>
        </div>
      </div>
      <Badge
        variant="status"
        status="published"
        className="fixed bottom-4 right-4"
      />
    </div>
  );
}
