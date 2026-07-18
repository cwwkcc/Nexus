'use client';

import { useState } from 'react';

// =============================================================================
// TOKENS
// =============================================================================

// Font Families
const FONT_FAMILY_TOKENS = [
  { token: 'font-display', value: 'Cormorant Garamond, Georgia, serif', label: 'Display' },
  { token: 'font-body', value: 'Inter, system-ui, sans-serif', label: 'Body' },
  { token: 'font-quote', value: 'Cormorant Upright, Georgia, serif', label: 'Quote' },
  { token: 'font-mono', value: 'IBM Plex Mono, Menlo, monospace', label: 'Mono' },
];

// Font Sizes - key sizes only
const FONT_SIZE_TOKENS = [
  { token: 'text-display', value: 'clamp(2.25rem, 1.75rem + 2.5vw, 4rem)', label: 'Display' },
  { token: 'text-h1', value: 'clamp(2rem, 1.61rem + 1.94vw, 3.36rem)', label: 'Heading 1' },
  { token: 'text-h2', value: 'clamp(1.75rem, 1.45rem + 1.5vw, 2.8rem)', label: 'Heading 2' },
  { token: 'text-h3', value: 'clamp(1.5rem, 1.26rem + 1.19vw, 2.33rem)', label: 'Heading 3' },
  { token: 'text-h4', value: 'clamp(1.3rem, 1.12rem + 0.91vw, 1.94rem)', label: 'Heading 4' },
  { token: 'text-h5', value: 'clamp(1.15rem, 1.04rem + 0.57vw, 1.55rem)', label: 'Heading 5' },
  { token: 'text-h6', value: 'clamp(1rem, 0.93rem + 0.36vw, 1.25rem)', label: 'Heading 6' },
  { token: 'text-body', value: '1.05rem', label: 'Body' },
  { token: 'text-body-sm', value: '0.87rem', label: 'Body Small' },
  { token: 'text-label', value: '0.83rem', label: 'Label' },
  { token: 'text-eyebrow', value: '0.75rem', label: 'Eyebrow' },
  { token: 'text-caption', value: '0.69rem', label: 'Caption' },
];

// Line Heights
const LINE_HEIGHT_TOKENS = [
  { token: 'leading-tight', value: '1', label: 'Tight' },
  { token: 'leading-snug', value: '1.08', label: 'Snug' },
  { token: 'leading-normal', value: '1.6', label: 'Normal' },
  { token: 'leading-relaxed', value: '1.7', label: 'Relaxed' },
  { token: 'leading-loose', value: '1.3', label: 'Loose' },
  { token: 'leading-display', value: '1', label: 'Display' },
  { token: 'leading-body', value: '1.7', label: 'Body' },
];

// Letter Spacing
const LETTER_SPACING_TOKENS = [
  { token: 'tracking-tight', value: '-0.02em', label: 'Tight' },
  { token: 'tracking-normal', value: '0em', label: 'Normal' },
  { token: 'tracking-open', value: '0.08em', label: 'Open' },
  { token: 'tracking-wide', value: '0.15em', label: 'Wide' },
  { token: 'tracking-extended', value: '0.25em', label: 'Extended' },
];

// Font Weights
const FONT_WEIGHT_TOKENS = [
  { token: 'font-normal', value: '400', label: 'Normal' },
  { token: 'font-medium', value: '500', label: 'Medium' },
  { token: 'font-semibold', value: '600', label: 'Semi Bold' },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function TypographyPage() {
  const [activeTab, setActiveTab] = useState<'sizes' | 'families' | 'leading' | 'tracking' | 'weights'>('sizes');

  // ---- Render helpers ----

  // Font Size Card
  const renderSizeCard = ({ token, value, label }: { token: string; value: string; label: string }) => {
    // Sample text varies by size
    const getSampleText = () => {
      if (token === 'text-display' || token === 'text-h1') {
        return 'The quick brown fox jumps over the lazy dog.';
      }
      if (token === 'text-h2' || token === 'text-h3') {
        return 'The quick brown fox jumps over the lazy dog.';
      }
      if (token === 'text-h4' || token === 'text-h5' || token === 'text-h6') {
        return 'The quick brown fox jumps over the lazy dog.';
      }
      if (token === 'text-body') {
        return 'The quick brown fox jumps over the lazy dog. The school was founded in 1873.';
      }
      if (token === 'text-label' || token === 'text-eyebrow' || token === 'text-caption') {
        return 'UPPERCASE LABEL TEXT';
      }
      return 'The quick brown fox jumps over the lazy dog.';
    };

    const sampleText = getSampleText();
    const isUppercase = token === 'text-label' || token === 'text-eyebrow' || token === 'text-caption';

    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{label}</span>
        </div>
        <div className={`${token} ${isUppercase ? 'uppercase' : ''}`}>
          <span className="text-text-primary">{sampleText}</span>
        </div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-1 rounded">{value}</code>
        </div>
      </div>
    );
  };

  // Font Family Card
  const renderFamilyCard = ({ token, value, label }: { token: string; value: string; label: string }) => {
    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{label}</span>
        </div>
        <div className={token}>
          <p className="text-text-primary text-body">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-text-muted text-body-sm mt-space-1">1234567890 !@#$%^&*()</p>
        </div>
        <div className="mt-space-2 text-caption text-text-muted truncate">
          <code className="bg-surface-deep px-space-1 rounded text-xs">{value}</code>
        </div>
      </div>
    );
  };

  // Line Height Card
  const renderLeadingCard = ({ token, value, label }: { token: string; value: string; label: string }) => {
    const sampleText = 'The school was founded in 1873 and has been a beacon of education ever since. Our students go on to achieve great things.';
    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{label}</span>
        </div>
        <div className={`${token}`}>
          <p className="text-body text-text-primary">{sampleText}</p>
        </div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-1 rounded">{value}</code>
        </div>
      </div>
    );
  };

  // Letter Spacing Card
  const renderTrackingCard = ({ token, value, label }: { token: string; value: string; label: string }) => {
    const sampleText = token === 'tracking-tight' ? 'TIGHT' : token === 'tracking-normal' ? 'NORMAL' : 'WIDE';
    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4">
        <div className="flex items-center justify-between mb-space-2">
          <code className="font-mono text-label text-gold-base">{token}</code>
          <span className="font-mono text-caption text-text-muted">{label}</span>
        </div>
        <div className={token}>
          <p className="text-body text-text-primary uppercase">{sampleText}</p>
        </div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-1 rounded">{value}</code>
        </div>
      </div>
    );
  };

  // Font Weight Card
  const renderWeightCard = ({ token, value, label }: { token: string; value: string; label: string }) => {
    return (
      <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-4 text-center">
        <code className="font-mono text-label text-gold-base block mb-space-2">{token}</code>
        <p className={`${token} text-h3 text-text-primary`}>The quick brown fox</p>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-1 rounded">{value}</code>
          <span className="ml-space-2">{label}</span>
        </div>
      </div>
    );
  };

  // Sinhala Font Demo
  const renderSinhalaDemo = () => {
    return (
      <div className="bg-surface-elevated border border-border-light rounded-md p-space-6">
        <h3 className="font-display text-h3 mb-space-3 text-gold-base">Sinhala</h3>
        <div className="font-sinhala-display text-sinhala-h2 mb-space-4">කන්නන්ගර මධ්‍ය මහා විද්‍යාලය</div>
        <div className="font-sinhala-body text-sinhala-body text-text-muted">ශ්‍රී ලංකාවේ ප්‍රථම මධ්‍ය මහා විද්‍යාලය — ජාතිය හැඩගැස්වූ බුද්ධිමතුන් බිහිකළ වසර 153ක අභිමානය.</div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-1 rounded">font-sinhala-display</code>
          {' · '}
          <code className="bg-surface-deep px-space-1 rounded">font-sinhala-body</code>
        </div>
      </div>
    );
  };

  const renderTamilDemo = () => {
    return (
      <div className="bg-surface-elevated border border-border-light rounded-md p-space-6">
        <h3 className="font-display text-h3 mb-space-3 text-gold-base">Tamil</h3>
        <div className="font-tamil-display text-tamil-h2 mb-space-4">கண்ணங்கர மத்திய மகா வித்தியாலயம்</div>
        <div className="font-tamil-body text-tamil-body text-text-muted">இலங்கையின் முதலாவது மத்திய மகா வித்தியாலயம் — தேசத்தை உருவாக்கிய அறிஞர்களை உருவாக்கிய 153 வருட அசைக்க முடியாத பெருமை.</div>
        <div className="mt-space-2 text-caption text-text-muted">
          <code className="bg-surface-deep px-space-1 rounded">font-tamil-display</code>
          {' · '}
          <code className="bg-surface-deep px-space-1 rounded">font-tamil-body</code>
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
        <h1 className="font-display text-h1 mb-space-4">Typography</h1>
        <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">Typography tokens control font sizes, families, line heights, letter spacing, and weights. All text styles are built from these tokens — never use arbitrary values.</p>

        {/* Tab Switcher */}
        <div className="flex gap-space-2 mb-space-8 border-b border-border-light overflow-x-auto">
          <button onClick={() => setActiveTab('sizes')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors whitespace-nowrap ${activeTab === 'sizes' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Font Sizes
          </button>
          <button onClick={() => setActiveTab('families')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors whitespace-nowrap ${activeTab === 'families' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Font Families
          </button>
          <button onClick={() => setActiveTab('leading')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors whitespace-nowrap ${activeTab === 'leading' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Line Heights
          </button>
          <button onClick={() => setActiveTab('tracking')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors whitespace-nowrap ${activeTab === 'tracking' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Letter Spacing
          </button>
          <button onClick={() => setActiveTab('weights')} className={`px-space-4 py-space-2 font-body text-label uppercase tracking-label border-b-2 transition-colors whitespace-nowrap ${activeTab === 'weights' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            Font Weights
          </button>
        </div>

        {/* ==================== FONT SIZES TAB ==================== */}
        {activeTab === 'sizes' && (
          <>
            <div className="mb-space-8 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-2">Font Size Tokens</h2>
              <p className="font-body text-body-sm text-text-muted">
                All font sizes are defined as tokens. Use them with the <code className="bg-surface-deep px-space-1 rounded">text-*</code> utility. Some sizes use <code className="bg-surface-deep px-space-1 rounded">clamp()</code> for responsive scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">{FONT_SIZE_TOKENS.map(renderSizeCard)}</div>
          </>
        )}

        {/* ==================== FONT FAMILIES TAB ==================== */}
        {activeTab === 'families' && (
          <>
            <div className="mb-space-8 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-2">Font Family Tokens</h2>
              <p className="font-body text-body-sm text-text-muted">
                Font families are stacked with appropriate fallbacks. Use them with the <code className="bg-surface-deep px-space-1 rounded">font-*</code> utility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6 mb-space-12">{FONT_FAMILY_TOKENS.map(renderFamilyCard)}</div>

            {/* Multilingual Demos */}
            <h2 className="font-display text-h2 mb-space-4">Multilingual Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
              {renderSinhalaDemo()}
              {renderTamilDemo()}
            </div>
          </>
        )}

        {/* ==================== LINE HEIGHTS TAB ==================== */}
        {activeTab === 'leading' && (
          <>
            <div className="mb-space-8 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-2">Line Height Tokens</h2>
              <p className="font-body text-body-sm text-text-muted">
                Line heights control vertical rhythm. Use them with the <code className="bg-surface-deep px-space-1 rounded">leading-*</code> utility. Sinhala and Tamil body text use a taller line height for readability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">{LINE_HEIGHT_TOKENS.map(renderLeadingCard)}</div>
          </>
        )}

        {/* ==================== LETTER SPACING TAB ==================== */}
        {activeTab === 'tracking' && (
          <>
            <div className="mb-space-8 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-2">Letter Spacing Tokens</h2>
              <p className="font-body text-body-sm text-text-muted">
                Letter spacing controls character spacing. Use them with the <code className="bg-surface-deep px-space-1 rounded">tracking-*</code> utility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">{LETTER_SPACING_TOKENS.map(renderTrackingCard)}</div>
          </>
        )}

        {/* ==================== FONT WEIGHTS TAB ==================== */}
        {activeTab === 'weights' && (
          <>
            <div className="mb-space-8 p-space-6 bg-surface-elevated border border-border-light rounded-md">
              <h2 className="font-display text-h3 mb-space-2">Font Weight Tokens</h2>
              <p className="font-body text-body-sm text-text-muted">
                Font weights control text thickness. Use them with the <code className="bg-surface-deep px-space-1 rounded">font-*</code> utility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">{FONT_WEIGHT_TOKENS.map(renderWeightCard)}</div>
          </>
        )}

        {/* ==================== UTILITY REFERENCE ==================== */}
        <div className="mt-space-12 p-space-6 bg-surface-deep border border-border-light rounded-md">
          <h2 className="font-display text-h3 mb-space-3">Tailwind Utility Reference</h2>
          <p className="font-body text-body-sm text-text-muted mb-space-3">All typography tokens work with these utility prefixes:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-2">
            {[
              { prefix: 'text', label: 'Font Size' },
              { prefix: 'font', label: 'Font Family / Weight' },
              { prefix: 'leading', label: 'Line Height' },
              { prefix: 'tracking', label: 'Letter Spacing' },
            ].map(({ prefix, label }) => (
              <div key={prefix} className="flex items-center gap-space-2">
                <code className="font-mono text-caption text-gold-base">
                  {prefix}-{'{token}'}
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
