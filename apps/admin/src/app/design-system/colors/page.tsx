// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

// =============================================================================
// TOKENS
// =============================================================================

const COLOR_GROUPS = [
  {
    label: 'Green',
    description: 'Primary brand color — used for buttons, headers, and key UI elements.',
    tokens: ['green-base', 'green-light', 'green-hover'],
  },
  {
    label: 'Gold',
    description: 'Accent color — used for links, highlights, badges, and decorative elements.',
    tokens: ['gold-base', 'gold-light', 'gold-pale', 'gold-hover', 'gold-active', 'gold-glow'],
  },
  {
    label: 'Surfaces',
    description: 'Background surfaces — from parchment page floor to elevated cards and inverse dark surfaces.',
    tokens: ['surface-base', 'surface-default', 'surface-deep', 'surface-elevated', 'surface-canopy', 'surface-glass', 'surface-glass-canopy', 'surface-glass-subtle', 'surface-glass-medium', 'surface-glass-card', 'surface-inverse', 'surface-hover', 'surface-active', 'surface-disabled'],
  },
  {
    label: 'Text',
    description: 'Text colors — from primary readable text to muted and inverse text on dark backgrounds.',
    tokens: ['text-primary', 'text-muted', 'text-subtle', 'text-inverse', 'text-heading', 'text-gold'],
  },
  {
    label: 'Border',
    description: 'Border colors — from subtle dividers to strong borders and glass edge highlights.',
    tokens: ['border-default', 'border-light', 'border-strong', 'border-highlight', 'border-glass-border', 'border-glass-border-highlight'],
  },
  {
    label: 'Semantic',
    description: 'Semantic colors for status messages — success, error, warning, and info.',
    tokens: ['semantic-success-base', 'semantic-success-surface', 'semantic-error-base', 'semantic-error-surface', 'semantic-warning-base', 'semantic-warning-surface', 'semantic-info-base', 'semantic-info-surface'],
  },
  {
    label: 'Overlays',
    description: 'Overlay colors for modals, drawers, lightboxes, and hover states.',
    tokens: ['overlay-light', 'overlay-medium', 'overlay-heavy'],
  },
  {
    label: 'State Opacity',
    description: 'Opacity values for disabled and loading states.',
    tokens: ['opacity-disabled', 'opacity-loading'],
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function ColorsPage() {
  const [colorValues, setColorValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const values: Record<string, string> = {};
    const allTokens = COLOR_GROUPS.flatMap((g) => g.tokens);
    for (const token of allTokens) {
      const cssVar = `--color-${token}`;
      values[token] = style.getPropertyValue(cssVar).trim();
    }
    setColorValues(values);
  }, []);

  const getUtilityClasses = (token: string): string[] => {
    const utils: string[] = [];
    if (token.startsWith('green-') || token.startsWith('gold-')) {
      utils.push(`bg-${token}`, `text-${token}`, `border-${token}`);
    } else if (token.startsWith('surface-')) {
      utils.push(`bg-${token}`, `border-${token}`);
    } else if (token.startsWith('text-')) {
      utils.push(`text-${token}`);
    } else if (token.startsWith('border-')) {
      utils.push(`border-${token}`);
    } else if (token.startsWith('semantic-')) {
      if (token.endsWith('-base')) {
        utils.push(`bg-${token}`, `text-${token}`, `border-${token}`);
      } else {
        utils.push(`bg-${token}`, `border-${token}`);
      }
    } else if (token.startsWith('overlay-')) {
      utils.push(`bg-${token}`);
    } else if (token.startsWith('opacity-')) {
      utils.push(`opacity-${token.replace('opacity-', '')}`);
    }
    return utils;
  };

  const isLightColor = (value: string): boolean => {
    const light = ['#FFFFFF', '#FBF9F2', '#F5EFE0', '#EDE6D0', '#F2D98A', '#DCEADE', '#F0E9D8', '#E6F0E8', '#F6E8E5', '#FAF1DE', '#EAF0F4'];
    return light.some((c) => value.includes(c));
  };

  const renderColorCard = (token: string) => {
    const color = colorValues[token] || 'transparent';
    const isRgba = color.startsWith('rgba');
    const isLight = isLightColor(color);
    const utils = getUtilityClasses(token);
    const isOpacity = token.startsWith('opacity-');

    return (
      <div key={token} className="bg-surface-default border border-border-light rounded-md overflow-hidden shadow-elevation-1">
        {/* Swatch - always use inline style for reliable rendering */}
        <div
          className="w-full h-size-20 relative"
          style={{
            // NOTE: was hardcoding 'rgba(0,0,0,0.5)' as the base for BOTH opacity tokens,
            // then also applying `opacity` on top — double-applying the alpha and ignoring
            // the actual value for opacity-loading (0.6). Solid black + a single opacity
            // pass shows the real per-token value.
            backgroundColor: isOpacity ? 'rgba(0,0,0,1)' : color,
            opacity: isOpacity ? parseFloat(color) : 1,
            border: isLight ? '1px solid rgba(0,0,0,0.1)' : 'none',
          }}
        >
          {/* Checkerboard for rgba/glass/overlay/semantic-surface tokens */}
          {isRgba && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(45deg, #d4d4d4 25%, transparent 25%), linear-gradient(-45deg, #d4d4d4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d4d4d4 75%), linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
              }}
            />
          )}

          {/* Color value label */}
          <div className="absolute bottom-space-1 left-space-1 bg-black/60 px-space-1p5 py-space-0p5 rounded text-[10px] font-mono text-text-inverse/90">{color || '—'}</div>
        </div>

        <div className="p-space-3">
          <code className="font-mono text-label text-gold-base block">{token}</code>
          <div className="flex flex-wrap gap-space-1 mt-space-1p5">
            {utils.slice(0, 3).map((u) => (
              <code key={u} className="bg-surface-deep px-space-1 py-space-0p5 rounded text-caption text-text-muted">
                {u}
              </code>
            ))}
            {utils.length > 3 && <code className="bg-surface-deep px-space-1 py-space-0p5 rounded text-caption text-text-muted">+{utils.length - 3}</code>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="max-w-content mx-auto px-space-6 md:px-space-8 lg:px-space-10">
        <h1 className="font-display text-h1 mb-space-4 text-text-primary">Colors</h1>
        <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">All colors are defined as tokens and available through Tailwind utilities. Never use raw hex values — always reference these tokens.</p>

        {COLOR_GROUPS.map((group) => (
          <div key={group.label} className="mb-space-12">
            <h2 className="font-display text-h2 mb-space-2 text-text-primary">{group.label}</h2>
            <p className="font-body text-body-sm text-text-muted mb-space-4">{group.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-space-4">{group.tokens.map((token) => renderColorCard(token))}</div>
          </div>
        ))}

        {/* Utility Reference */}
        <div className="mt-space-12 p-space-6 bg-surface-deep border border-border-light rounded-md">
          <h2 className="font-display text-h3 mb-space-3 text-text-primary">Tailwind Utility Reference</h2>
          <p className="font-body text-body-sm text-text-muted mb-space-3">All color tokens work with these utility prefixes:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-2">
            {[
              { prefix: 'bg', label: 'Background' },
              { prefix: 'text', label: 'Text' },
              { prefix: 'border', label: 'Border' },
              { prefix: 'ring', label: 'Focus Ring' },
            ].map(({ prefix, label }) => (
              <div key={prefix} className="flex items-center gap-space-2">
                <code className="font-mono text-caption text-gold-base">
                  {prefix}-{'{color}'}
                </code>
                <span className="font-body text-caption text-text-muted">({label})</span>
              </div>
            ))}
          </div>
          <p className="font-body text-body-sm text-text-muted mt-space-3">
            Example: <code className="bg-surface-deep px-space-1 rounded">bg-green-base</code> gives the primary green background.
          </p>
        </div>

        {/* Usage Note */}
        <div className="mt-space-8 p-space-6 bg-semantic-info-surface border border-semantic-info-base rounded-md">
          <h3 className="font-display text-h3 text-semantic-info-base mb-space-2">Usage Note</h3>
          <p className="font-body text-body-sm text-text-muted">Always use token names — never hardcode hex values. This ensures consistency across the entire platform and makes theme updates (dark mode, high contrast) possible without refactoring.</p>
          <div className="mt-space-3 flex flex-wrap gap-space-3">
            <code className="bg-surface-deep px-space-2 py-space-1 rounded text-sm text-semantic-error-base">❌ bg-#1A4A2E</code>
            <code className="bg-surface-deep px-space-2 py-space-1 rounded text-sm text-semantic-success-base">✅ bg-green-base</code>
          </div>
        </div>
      </div>
    </div>
  );
}
