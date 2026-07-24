'use client';

import { useState } from 'react';

// All positive tokens with their values
const POSITIVE_TOKENS = [
  { token: 'space-0p5', value: 2 },
  { token: 'space-1', value: 4 },
  { token: 'space-2', value: 8 },
  { token: 'space-4', value: 16 },
  { token: 'space-6', value: 24 },
  { token: 'space-8', value: 32 },
  { token: 'space-12', value: 48 },
  { token: 'space-16', value: 64 },
  { token: 'space-24', value: 96 },
  { token: 'space-32', value: 128 },
  { token: 'space-48', value: 192 },
  { token: 'space-64', value: 256 },
  { token: 'space-96', value: 384 },
];

// All negative tokens – includes space-neg-96
const NEGATIVE_TOKENS = [
  { token: 'space-neg-0p5', value: -2 },
  { token: 'space-neg-1', value: -4 },
  { token: 'space-neg-2', value: -8 },
  { token: 'space-neg-4', value: -16 },
  { token: 'space-neg-8', value: -32 },
  { token: 'space-neg-16', value: -64 },
  { token: 'space-neg-24', value: -96 },
  { token: 'space-neg-48', value: -192 },
  { token: 'space-neg-88', value: -352 },
  { token: 'space-neg-96', value: -384 },
];

const MAX_POSITIVE = 384;
const MAX_NEGATIVE = 384;

export default function SpacingPage() {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive');

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Spacing Scale</h1>
        <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">
          All spacing values are based on a <strong>4px baseline</strong>. Tokens range from <code className="bg-surface-deep px-space-1 rounded">space-0</code> (0px) to <code className="bg-surface-deep px-space-1 rounded">space-96</code> (384px) in 4px increments. Negative values range from <code className="bg-surface-deep px-space-1 rounded">space-neg-0p5</code> (-2px) to <code className="bg-surface-deep px-space-1 rounded">space-neg-96</code> (-384px).
        </p>

        {/* Tab switcher */}
        <div className="flex gap-space-2 mb-space-8 border-b border-border-light">
          <button onClick={() => setActiveTab('positive')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors ${activeTab === 'positive' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Positive Spacing
          </button>
          <button onClick={() => setActiveTab('negative')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors ${activeTab === 'negative' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Negative Spacing
          </button>
        </div>

        {activeTab === 'positive' ? (
          <>
            {/* Full scale visual strip */}
            <div className="mb-space-12 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-4">The Full Scale</h2>
              <p className="font-body text-body-sm text-text-muted mb-space-4">
                Tokens from <code className="bg-surface-deep px-space-1 rounded">space-0</code> to <code className="bg-surface-deep px-space-1 rounded">space-96</code> in 4px increments. Half-steps give you 2px granularity.
              </p>
              <div className="flex items-end h-space-12 gap-space-0p5 overflow-x-auto pb-space-2">
                {Array.from({ length: 97 }, (_, i) => {
                  const token = i === 0 ? 'space-0' : i % 2 === 0 ? `space-${i}` : `space-${i}p5`;
                  const value = i === 0 ? 0 : i * 4;
                  const height = Math.max(2, (value / MAX_POSITIVE) * 48);
                  const isDemo = POSITIVE_TOKENS.some((d) => d.token === token);
                  return <div key={i} className={`flex-1 min-w-[2px] ${isDemo ? 'bg-gold-base' : 'bg-border-default'}`} style={{ height: `${height}px` }} title={`${token}: ${value}px`} />;
                })}
              </div>
              <div className="flex justify-between text-caption text-text-muted mt-space-2">
                <span>space-0</span>
                <span>space-48</span>
                <span>space-96</span>
              </div>
            </div>

            {/* Token demo cards */}
            <h2 className="font-display text-h2 mb-space-4">Key Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
              {POSITIVE_TOKENS.map(({ token, value }) => {
                const pct = (value / MAX_POSITIVE) * 100;
                return (
                  <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
                    <div className="flex items-center justify-between mb-space-2">
                      <code className="font-mono text-label text-gold-base">{token}</code>
                      <span className="font-mono text-caption text-text-muted">{value}px</span>
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
                      <code className="bg-surface-deep px-space-0p5 rounded text-center">p-{token}</code>
                      <code className="bg-surface-deep px-space-0p5 rounded text-center">gap-{token}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Negative full scale */}
            <div className="mb-space-12 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-4">Negative Scale</h2>
              <p className="font-body text-body-sm text-text-muted mb-space-4">
                Tokens from <code className="bg-surface-deep px-space-1 rounded">space-neg-0p5</code> (-2px) to <code className="bg-surface-deep px-space-1 rounded">space-neg-96</code> (-384px) in 2px increments.
              </p>
              <div className="flex items-end h-space-12 gap-space-0p5 overflow-x-auto pb-space-2">
                {Array.from({ length: 49 }, (_, i) => {
                  const value = i === 0 ? 2 : i * 8;
                  const token = i === 0 ? 'space-neg-0p5' : `space-neg-${i * 2}`;
                  const height = Math.max(2, (value / MAX_NEGATIVE) * 48);
                  const isDemo = NEGATIVE_TOKENS.some((d) => d.token === token);
                  return <div key={i} className={`flex-1 min-w-[2px] ${isDemo ? 'bg-semantic-error-base' : 'bg-border-default'}`} style={{ height: `${height}px` }} title={`${token}: -${value}px`} />;
                })}
              </div>
              <div className="flex justify-between text-caption text-text-muted mt-space-2">
                <span>space-neg-0p5</span>
                <span>space-neg-48</span>
                <span>space-neg-96</span>
              </div>
            </div>

            {/* Negative demo cards */}
            <h2 className="font-display text-h2 mb-space-4">Key Negative Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
              {NEGATIVE_TOKENS.map(({ token, value }) => {
                const pct = (Math.abs(value) / MAX_NEGATIVE) * 100;
                return (
                  <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
                    <div className="flex items-center justify-between mb-space-2">
                      <code className="font-mono text-label text-semantic-error-base">{token}</code>
                      <span className="font-mono text-caption text-text-muted">{value}px</span>
                    </div>
                    {/* FIX: w-full on container so percentage width works */}
                    <div className="bg-surface-deep rounded-sm overflow-hidden relative h-space-6 w-full">
                      <div
                        className="absolute bottom-0 right-0 bg-semantic-error-base"
                        style={{
                          height: '20px',
                          width: `${Math.max(2, pct)}%`,
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-space-1 mt-space-2 text-caption text-text-muted">
                      <code className="bg-surface-deep px-space-0p5 rounded text-center">mr-{token}</code>
                      <code className="bg-surface-deep px-space-0p5 rounded text-center">mt-{token}</code>
                      <code className="bg-surface-deep px-space-0p5 rounded text-center">top-{token}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Utility reference */}
        <div className="mt-space-12 p-space-6 bg-surface-deep border border-border-light rounded-md">
          <h2 className="font-display text-h3 mb-space-3">Tailwind Utility Reference</h2>
          <p className="font-body text-body-sm text-text-muted mb-space-3">All spacing tokens work with these utility prefixes:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-2">
            {[
              { prefix: 'p', label: 'Padding' },
              { prefix: 'px', label: 'Padding X' },
              { prefix: 'py', label: 'Padding Y' },
              { prefix: 'pt', label: 'Padding Top' },
              { prefix: 'pr', label: 'Padding Right' },
              { prefix: 'pb', label: 'Padding Bottom' },
              { prefix: 'pl', label: 'Padding Left' },
              { prefix: 'm', label: 'Margin' },
              { prefix: 'mx', label: 'Margin X' },
              { prefix: 'my', label: 'Margin Y' },
              { prefix: 'mt', label: 'Margin Top' },
              { prefix: 'mr', label: 'Margin Right' },
              { prefix: 'mb', label: 'Margin Bottom' },
              { prefix: 'ml', label: 'Margin Left' },
              { prefix: 'gap', label: 'Gap' },
              { prefix: 'gap-x', label: 'Gap X' },
              { prefix: 'gap-y', label: 'Gap Y' },
              { prefix: 'top', label: 'Top' },
              { prefix: 'right', label: 'Right' },
              { prefix: 'bottom', label: 'Bottom' },
              { prefix: 'left', label: 'Left' },
            ].map(({ prefix, label }) => (
              <div key={prefix} className="flex items-center gap-space-2">
                <code className="font-mono text-caption text-gold-base">
                  {prefix}-space-{'{n}'}
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
