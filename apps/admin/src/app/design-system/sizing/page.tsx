'use client';

import { useState } from 'react';

// =============================================================================
// TOKENS
// =============================================================================

// Pixel sizes (0-384px)
const PIXEL_TOKENS = [
  { token: 'size-1', value: '4px' },
  { token: 'size-2', value: '8px' },
  { token: 'size-4', value: '16px' },
  { token: 'size-6', value: '24px' },
  { token: 'size-8', value: '32px' },
  { token: 'size-12', value: '48px' },
  { token: 'size-16', value: '64px' },
  { token: 'size-24', value: '96px' },
  { token: 'size-32', value: '128px' },
  { token: 'size-48', value: '192px' },
  { token: 'size-64', value: '256px' },
  { token: 'size-96', value: '384px' },
];

// Viewport width tokens
const VW_TOKENS = [
  { token: 'size-screen-w-25', value: '25vw' },
  { token: 'size-screen-w-50', value: '50vw' },
  { token: 'size-screen-w-75', value: '75vw' },
  { token: 'size-screen-w-100', value: '100vw' },
];

// Viewport height tokens
const VH_TOKENS = [
  { token: 'size-screen-h-25', value: '25vh' },
  { token: 'size-screen-h-50', value: '50vh' },
  { token: 'size-screen-h-75', value: '75vh' },
  { token: 'size-screen-h-100', value: '100vh' },
];

// Percentage tokens
const PCT_TOKENS = [
  { token: 'size-pct-25', value: '25%' },
  { token: 'size-pct-50', value: '50%' },
  { token: 'size-pct-75', value: '75%' },
  { token: 'size-pct-100', value: '100%' },
];

// Fraction tokens
const FRACTION_TOKENS = [
  { token: 'size-1-2', value: '50%' },
  { token: 'size-1-3', value: '33.333%' },
  { token: 'size-2-3', value: '66.667%' },
  { token: 'size-1-4', value: '25%' },
  { token: 'size-3-4', value: '75%' },
];

// Icon sizes
const ICON_TOKENS = [
  { token: 'icon-sm', value: '16px' },
  { token: 'icon-md', value: '20px' },
  { token: 'icon-lg', value: '24px' },
  { token: 'icon-xl', value: '32px' },
];

// Border widths
const BORDER_TOKENS = [
  { token: 'border-sm', value: '1px' },
  { token: 'border-md', value: '2px' },
  { token: 'border-lg', value: '4px' },
  { token: 'border-xl', value: '6px' },
  { token: 'border-2xl', value: '8px' },
];

// Max widths
const MAX_WIDTH_TOKENS = [
  { token: 'max-w-prose', value: '680px' },
  { token: 'max-w-content', value: '960px' },
  { token: 'max-w-wide', value: '1200px' },
  { token: 'max-w-full', value: '100%' },
];

// Semantic values - kept clean and simple
const SEMANTIC_TOKENS = [
  { token: 'size-full', value: '100%', description: 'Fills the full width of the parent container' },
  { token: 'size-min', value: 'min-content', description: 'Shrinks to the minimum width needed for content' },
  { token: 'size-max', value: 'max-content', description: 'Expands to the maximum width needed for content' },
  { token: 'size-fit', value: 'fit-content', description: 'Fits the content without extra space' },
  { token: 'size-auto', value: 'auto', description: 'Browser determines the best width automatically' },
];

const MAX_PIXEL = 384;

// =============================================================================
// COMPONENT
// =============================================================================

export default function SizingPage() {
  const [activeTab, setActiveTab] = useState<'sizes' | 'borders' | 'containers'>('sizes');

  // ---- Render helpers ----
  const renderPixelCard = ({ token, value }: { token: string; value: string }) => {
    const numValue = parseFloat(value);
    const pct = (numValue / MAX_PIXEL) * 100;

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm overflow-hidden w-full">
          <div
            className="bg-green-base"
            style={{
              height: '20px',
              width: `${Math.max(2, pct)}%`,
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-space-1 mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-0p5 rounded text-center">w-{token}</code>
          <code className="bg-surface-deep px-space-0p5 rounded text-center">h-{token}</code>
          <code className="bg-surface-deep px-space-0p5 rounded text-center">min-w-{token}</code>
        </div>
      </div>
    );
  };

  const renderViewportCard = ({ token, value }: { token: string; value: string }) => {
    const numValue = parseFloat(value);
    const isVw = token.includes('screen-w');
    const isVh = token.includes('screen-h');
    const pct = Math.min(100, numValue);

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm overflow-hidden w-full">
          <div
            className="bg-green-base"
            style={{
              height: '20px',
              width: `${Math.max(2, pct)}%`,
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-space-1 mt-space-2 text-caption text-text-muted">
          {isVw && (
            <>
              <code className="bg-surface-deep px-space-0p5 rounded text-center">w-{token}</code>
              <code className="bg-surface-deep px-space-0p5 rounded text-center">min-w-{token}</code>
            </>
          )}
          {isVh && (
            <>
              <code className="bg-surface-deep px-space-0p5 rounded text-center">h-{token}</code>
              <code className="bg-surface-deep px-space-0p5 rounded text-center">min-h-{token}</code>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderPercentCard = ({ token, value }: { token: string; value: string }) => {
    const numValue = parseFloat(value);
    const pct = Math.min(100, numValue);

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm overflow-hidden w-full">
          <div
            className="bg-green-base"
            style={{
              height: '20px',
              width: `${Math.max(2, pct)}%`,
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-space-1 mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-0p5 rounded text-center">w-{token}</code>
          <code className="bg-surface-deep px-space-0p5 rounded text-center">h-{token}</code>
          <code className="bg-surface-deep px-space-0p5 rounded text-center">max-w-{token}</code>
        </div>
      </div>
    );
  };

  const renderFractionCard = ({ token, value }: { token: string; value: string }) => {
    const numValue = parseFloat(value);
    const pct = Math.min(100, numValue);

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm overflow-hidden w-full">
          <div
            className="bg-green-base"
            style={{
              height: '20px',
              width: `${Math.max(2, pct)}%`,
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-space-1 mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-0p5 rounded text-center">w-{token}</code>
          <code className="bg-surface-deep px-space-0p5 rounded text-center">h-{token}</code>
        </div>
      </div>
    );
  };

  const renderIconCard = ({ token, value }: { token: string; value: string }) => {
    const size = parseFloat(value);

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4 text-center">
        <div className="flex items-center justify-center h-space-16">
          <div
            className="bg-gold-base rounded-sm"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        </div>
        <div className="mt-space-2">
          <code className="font-mono text-label text-gold-base block">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="mt-space-1 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-0p5 rounded">w-{token}</code>
          {' · '}
          <code className="bg-surface-deep px-space-0p5 rounded">h-{token}</code>
        </div>
      </div>
    );
  };

  const renderBorderCard = ({ token, value }: { token: string; value: string }) => {
    const numValue = parseFloat(value);

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm overflow-hidden w-full h-space-6 flex items-center">
          <div
            className="bg-gold-base"
            style={{
              height: '100%',
              width: `${Math.max(1, Math.min(100, numValue * 12))}px`,
              maxWidth: '100%',
            }}
          />
        </div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-0p5 rounded">border-{token}</code>
        </div>
      </div>
    );
  };

  const renderMaxWidthCard = ({ token, value }: { token: string; value: string }) => {
    const numValue = parseFloat(value);
    const maxDisplay = 1200;
    const pct = Math.min(100, (numValue / maxDisplay) * 100);

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm overflow-hidden w-full">
          <div
            className="bg-green-base"
            style={{
              height: '20px',
              width: `${Math.max(2, pct)}%`,
            }}
          />
        </div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-0p5 rounded">{token}</code>
        </div>
      </div>
    );
  };

  // ---- Semantic Values: clean reference cards ----
  const renderSemanticCard = ({ token, value, description }: { token: string; value: string; description: string }) => {
    // Determine which utilities apply to this token
    const utilities = ['w', 'h', 'min-w', 'max-w', 'min-h', 'max-h'];

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{value}</span>
        </div>
        <div className="bg-surface-deep rounded-sm p-space-3">
          <span className="font-body text-body-sm text-text-primary">{description}</span>
        </div>
        <div className="flex flex-wrap gap-space-1 mt-space-3 text-caption text-text-muted">
          {utilities.map((prefix) => (
            <code key={prefix} className="bg-surface-deep px-space-1 rounded">
              {prefix}-{token}
            </code>
          ))}
        </div>
      </div>
    );
  };

  // =============================================================================
  // JSX
  // =============================================================================

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Sizing Scale</h1>
        <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">
          Width, height, min-/max-width, and min-/max-height tokens. All sizes are available with the <code className="bg-surface-deep px-space-1 rounded">size-*</code> prefix in your Tailwind classes. Tokens range from <code className="bg-surface-deep px-space-1 rounded">size-0</code> (0px) to <code className="bg-surface-deep px-space-1 rounded">size-96</code> (384px) in 4px increments.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-space-2 mb-space-8 border-b border-border-light">
          <button onClick={() => setActiveTab('sizes')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors ${activeTab === 'sizes' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            All Sizes
          </button>
          <button onClick={() => setActiveTab('borders')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors ${activeTab === 'borders' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Border Widths
          </button>
          <button onClick={() => setActiveTab('containers')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors ${activeTab === 'containers' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Containers
          </button>
        </div>

        {/* ==================== SIZES TAB ==================== */}
        {activeTab === 'sizes' && (
          <>
            {/* Full scale visual strip */}
            <div className="mb-space-12 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-4">The Full Scale</h2>
              <p className="font-body text-body-sm text-text-muted mb-space-4">
                Tokens from <code className="bg-surface-deep px-space-1 rounded">size-0</code> to <code className="bg-surface-deep px-space-1 rounded">size-96</code> in 4px increments.
              </p>
              <div className="flex items-end h-space-12 gap-space-0p5 overflow-x-auto pb-space-2">
                {Array.from({ length: 97 }, (_, i) => {
                  const token = i === 0 ? 'size-0' : i % 2 === 0 ? `size-${i}` : `size-${i}p5`;
                  const value = i === 0 ? 0 : i * 4;
                  const height = Math.max(2, (value / MAX_PIXEL) * 48);
                  const isDemo = PIXEL_TOKENS.some((d) => d.token === token);
                  return <div key={i} className={`flex-1 min-w-[2px] ${isDemo ? 'bg-gold-base' : 'bg-border-default'}`} style={{ height: `${height}px` }} title={`${token}: ${value}px`} />;
                })}
              </div>
              <div className="flex justify-between text-caption text-text-muted mt-space-2">
                <span>size-0</span>
                <span>size-48</span>
                <span>size-96</span>
              </div>
            </div>

            {/* Pixel Sizes */}
            <h2 className="font-display text-h2 mb-space-4">Pixel Sizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6 mb-space-12">{PIXEL_TOKENS.map(renderPixelCard)}</div>

            {/* Viewport Sizes */}
            <h2 className="font-display text-h2 mb-space-4">Viewport Sizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6 mb-space-12">
              {VW_TOKENS.map(renderViewportCard)}
              {VH_TOKENS.map(renderViewportCard)}
            </div>

            {/* Percentages */}
            <h2 className="font-display text-h2 mb-space-4">Percentages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6 mb-space-12">{PCT_TOKENS.map(renderPercentCard)}</div>

            {/* Fractions */}
            <h2 className="font-display text-h2 mb-space-4">Fractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6 mb-space-12">{FRACTION_TOKENS.map(renderFractionCard)}</div>

            {/* Semantic Values - Clean reference cards */}
            <h2 className="font-display text-h2 mb-space-4">Semantic Values</h2>
            <p className="font-body text-body-sm text-text-muted mb-space-4">
              Special sizing values that adapt to content. Use these with <code className="bg-surface-deep px-space-1 rounded">w-*</code>, <code className="bg-surface-deep px-space-1 rounded">h-*</code>, and <code className="bg-surface-deep px-space-1 rounded">max-w-*</code> utilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6 mb-space-12">{SEMANTIC_TOKENS.map(renderSemanticCard)}</div>

            {/* Icon Sizes */}
            <h2 className="font-display text-h2 mb-space-4">Icon Sizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6">{ICON_TOKENS.map(renderIconCard)}</div>
          </>
        )}

        {/* ==================== BORDERS TAB ==================== */}
        {activeTab === 'borders' && (
          <>
            <div className="mb-space-12 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-4">Border Widths</h2>
              <p className="font-body text-body-sm text-text-muted mb-space-4">
                Border width tokens from <code className="bg-surface-deep px-space-1 rounded">border-sm</code> (1px) to <code className="bg-surface-deep px-space-1 rounded">border-2xl</code> (8px).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">{BORDER_TOKENS.map(renderBorderCard)}</div>

            {/* Border visual reference */}
            <div className="mt-space-12 p-space-6 bg-surface-deep border border-border-light rounded-md">
              <h3 className="font-display text-h3 mb-space-3">Visual Reference</h3>
              <div className="space-y-space-4">
                {BORDER_TOKENS.map(({ token, value }) => {
                  const numValue = parseFloat(value);
                  return (
                    <div key={token} className="flex items-center gap-space-4">
                      <code className="font-mono text-caption text-gold-base w-32 shrink-0">{token}</code>
                      <span className="font-mono text-caption text-text-muted w-16 shrink-0">{value}</span>
                      <div
                        className="flex-1 border-gold-base"
                        style={{
                          borderWidth: numValue,
                          borderStyle: 'solid',
                          height: '30px',
                          backgroundColor: 'var(--surface-elevated)',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ==================== CONTAINERS TAB ==================== */}
        {activeTab === 'containers' && (
          <>
            <div className="mb-space-12 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-4">Container Max Widths</h2>
              <p className="font-body text-body-sm text-text-muted mb-space-4">
                Predefined container widths for consistent page layouts. Use <code className="bg-surface-deep px-space-1 rounded">max-w-*</code> with any of these tokens.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-space-6">{MAX_WIDTH_TOKENS.map(renderMaxWidthCard)}</div>
          </>
        )}

        {/* ==================== UTILITY REFERENCE ==================== */}
        <div className="mt-space-12 p-space-6 bg-surface-deep border border-border-light rounded-md">
          <h2 className="font-display text-h3 mb-space-3">Tailwind Utility Reference</h2>
          <p className="font-body text-body-sm text-text-muted mb-space-3">All sizing tokens work with these utility prefixes:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-2">
            {[
              { prefix: 'w', label: 'Width' },
              { prefix: 'h', label: 'Height' },
              { prefix: 'min-w', label: 'Min-Width' },
              { prefix: 'max-w', label: 'Max-Width' },
              { prefix: 'min-h', label: 'Min-Height' },
              { prefix: 'max-h', label: 'Max-Height' },
            ].map(({ prefix, label }) => (
              <div key={prefix} className="flex items-center gap-space-2">
                <code className="font-mono text-caption text-gold-base">
                  {prefix}-size-{'{n}'}
                </code>
                <span className="font-body text-caption text-text-muted">({label})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
