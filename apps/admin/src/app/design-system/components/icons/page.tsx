// @ts-nocheck
// apps/admin/src/app/design-system/components/icons/page.tsx
'use client';

import { cn } from '@nexus/ui';
import {
  // Lucide UI icons
  Icon,
  type IconName,
  // Brand components
  SchoolLogo,
  CrestAnimation,
  CrestDiagram,
  // Social icons – all variants
  FacebookWhite,
  FacebookColor,
  LinkedInBlack,
  LinkedInColor,
  LinkedInWhite,
  LinkedInInlineColor,
  WhatsAppGlyphBlack,
  WhatsAppGlyphGreen,
  WhatsAppGlyphWhite,
  WhatsAppStackedBlack,
  WhatsAppStackedGreen,
  WhatsAppStackedWhite,
  YouTubeInlineBlack,
  YouTubeInlineColor,
  YouTubeInlineWhite,
  YouTubeWhite,
  YouTubeBlack,
  YouTubeColor,
  GitHubInvertocatBlack,
  GitHubInvertocatWhite,
  GitHubLockupBlack,
  GitHubLockupWhite,
  InstagramGlyphBlack,
  InstagramGlyphWhite,
  InstagramGlyphGradient,
} from '@nexus/ui';
import { useState } from 'react';

import { DemoSection } from '../_components/DemoSection';

// All registered Lucide icon names (from registry.ts)
const iconNames: IconName[] = ['menu', 'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'search', 'home', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'download', 'share', 'external-link', 'copy', 'upload', 'play', 'pause', 'rewind', 'fast-forward', 'file-text', 'file-spreadsheet', 'archive', 'mail', 'phone', 'map-pin', 'calendar', 'clock', 'info', 'check-circle', 'alert-circle', 'alert-triangle', 'x-circle', 'award', 'trophy', 'users', 'user', 'book-open', 'building', 'camera', 'music', 'flag', 'code', 'minus'];

export default function IconsPage() {
  const [previewName, setPreviewName] = useState<IconName>('award');
  const [inputText, setInputText] = useState('award');
  const [previewSize, setPreviewSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('xl');
  const [previewStroke, setPreviewStroke] = useState(2);
  const [previewColor, setPreviewColor] = useState('text-gold-base');
  const [schoolLogoLocale, setSchoolLogoLocale] = useState<'en' | 'si'>('en');

  const isValidIconName = (name: string): name is IconName => {
    return iconNames.includes(name as IconName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    // Optionally, you could update previewName live while typing, but that's usually disorienting.
    // We'll only update on blur or selection.
  };

  const handleBlurOrSelect = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isValidIconName(val)) {
      setPreviewName(val);
      setInputText(val);
    } else {
      // revert to last valid name
      setInputText(previewName);
    }
  };

  const [crestVariant, setCrestVariant] = useState<'ambient' | 'hold' | 'click'>('ambient');

  // Incrementing keys force a remount of each CrestAnimation, replaying the animation.
  const [heroKey, setHeroKey] = useState(0);
  const [loadingKey, setLoadingKey] = useState(0);

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Icons</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Typed, token‑aware icon system. UI icons from Lucide, social & brand icons as custom SVGs. All support the <code className="bg-surface-deep px-space-1 rounded-sm">size</code> prop (xs–xl).
        </p>

        {/* ========== LUCIDE UI ICONS ========== */}
        <DemoSection title="UI Icons (Lucide)" description="All registered Lucide icons with size, strokeWidth, and colour tokens.">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-space-4">
            {iconNames.map((name) => (
              <div key={name} className="flex flex-col items-center p-space-4 bg-surface-elevated border border-border-light rounded-md">
                <Icon name={name} size="lg" className="text-text-primary" />
                <span className="mt-space-2 font-mono text-caption text-text-muted">{name}</span>
              </div>
            ))}
          </div>
        </DemoSection>

        {/* ========== SOCIAL ICONS ========== */}
        <DemoSection title="Social Icons" description="Official brand SVGs with size prop support.">
          <div className="space-y-space-12">
            {/* Facebook */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">Facebook</h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <FacebookWhite size="" className="w-size-16 h-size-16 text-text-primary" />
                <FacebookColor size="" className="w-size-16 h-size-16" />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">LinkedIn</h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <LinkedInBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <LinkedInColor size="" className="w-size-16 h-size-16" />
                <LinkedInWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
                <LinkedInInlineColor size="" className="w-size-16 h-size-16" />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">WhatsApp</h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <WhatsAppGlyphBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <WhatsAppGlyphGreen size="" className="w-size-16 h-size-16" />
                <WhatsAppGlyphWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
                <WhatsAppStackedBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <WhatsAppStackedGreen size="" className="w-size-16 h-size-16" />
                <WhatsAppStackedWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
              </div>
            </div>

            {/* YouTube */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">YouTube</h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <YouTubeInlineBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <YouTubeInlineColor size="" className="w-size-16 h-size-16" />
                <YouTubeInlineWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
                <YouTubeWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
                <YouTubeBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <YouTubeColor size="" className="w-size-16 h-size-16" />
              </div>
            </div>

            {/* GitHub */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">GitHub</h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <GitHubInvertocatBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <GitHubInvertocatWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
                <GitHubLockupBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <GitHubLockupWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">Instagram</h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <InstagramGlyphBlack size="" className="w-size-16 h-size-16 text-text-primary" />
                <InstagramGlyphWhite size="" className="w-size-16 h-size-16 bg-surface-inverse p-space-1 rounded" />
                <InstagramGlyphGradient size="" className="w-size-16 h-size-16" />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* ========== SIZE DEMO ========== */}
        <DemoSection title="Size Prop" description="All social icons support xs–xl sizes matching design tokens.">
          <div className="flex flex-wrap items-end gap-space-8">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-space-2">
                <FacebookColor size={size} />
                <span className="font-mono text-caption">{size}</span>
              </div>
            ))}
          </div>
        </DemoSection>

        {/* ========== SCHOOL LOGO ALL VARIANTS ========== */}
        <DemoSection title="School Logo – All Variants" description="Five layout variants with bilingual support (English / Sinhala).">
          <div className="space-y-space-12">
            {/* Locale switcher for the demos */}
            <div className="flex items-center gap-space-4 p-space-4 bg-surface-default rounded-md">
              <span className="font-body text-label">Locale:</span>
              <button onClick={() => setSchoolLogoLocale('en')} className={`px-space-4 py-space-2 rounded-md transition-colors ${schoolLogoLocale === 'en' ? 'bg-gold-base text-green-base' : 'bg-surface-elevated text-text-muted hover:text-text-primary'}`}>
                English
              </button>
              <button onClick={() => setSchoolLogoLocale('si')} className={`px-space-4 py-space-2 rounded-md transition-colors ${schoolLogoLocale === 'si' ? 'bg-gold-base text-green-base' : 'bg-surface-elevated text-text-muted hover:text-text-primary'}`}>
                Sinhala
              </button>
            </div>

            {/* crest-only */}
            <div>
              <h4 className="font-display text-h4 mb-space-3 text-gold-base">crest-only</h4>
              <div className="w-32 h-32 border border-border-light rounded-md p-space-4 bg-surface-elevated">
                <SchoolLogo variant="crest-only" locale={schoolLogoLocale} />
              </div>
            </div>

            {/* wordmark-only */}
            <div>
              <h4 className="font-display text-h4 mb-space-3 text-gold-base">wordmark-only</h4>
              <div className="border border-border-light rounded-md p-space-6 bg-surface-elevated max-w-md">
                <SchoolLogo variant="wordmark-only" locale={schoolLogoLocale} />
              </div>
            </div>

            {/* lockup (stacked, crest above wordmark) */}
            <div>
              <h4 className="font-display text-h4 mb-space-3 text-gold-base">lockup</h4>
              <div className="border border-border-light rounded-md p-space-6 bg-surface-elevated max-w-sm">
                <SchoolLogo variant="lockup" locale={schoolLogoLocale} />
              </div>
            </div>

            {/* horizontal (crest beside wordmark) */}
            <div>
              <h4 className="font-display text-h4 mb-space-3 text-gold-base">horizontal</h4>
              <div className="border border-border-light rounded-md p-space-6 bg-surface-elevated">
                <SchoolLogo variant="horizontal" locale={schoolLogoLocale} />
              </div>
            </div>

            {/* stacked (wordmark above crest) */}
            <div>
              <h4 className="font-display text-h4 mb-space-3 text-gold-base">stacked</h4>
              <div className="border border-border-light rounded-md p-space-6 bg-surface-elevated max-w-sm">
                <SchoolLogo variant="stacked" locale={schoolLogoLocale} />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* ========== BRAND MARKS (animated crest) ========== */}

        {/* Static sizes */}
        <DemoSection title="Animated Crest – Static" description="animateOnMount={false}. Baseline reference — no motion, just the crest at each size token.">
          <div className="flex flex-wrap items-center gap-space-12">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-space-3">
                <CrestAnimation size={size} animateOnMount={false} />
                <span className="font-mono text-caption">{size}</span>
              </div>
            ))}
          </div>
        </DemoSection>

        {/* Hero variant */}
        <DemoSection title="Animated Crest – Hero" description='variant="hero". Fade-in entrance, single diagonal gold sweep, settles into a faint idle glow. For landing page hero sections.'>
          <div className="space-y-space-8">
            <div className="flex flex-wrap items-end gap-space-12">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-space-3">
                  <CrestAnimation key={`hero-${size}-${heroKey}`} size={size} variant="hero" animateOnMount={true} />
                  <span className="font-mono text-caption">{size}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setHeroKey((k) => k + 1)} className="inline-flex items-center gap-space-2 px-space-4 py-space-2 bg-surface-elevated border border-border-light rounded-md font-body text-label text-text-muted hover:text-text-primary transition-colors">
              <Icon name="rewind" size="sm" />
              Replay
            </button>
          </div>
        </DemoSection>

        {/* Loading variant */}
        <DemoSection title="Animated Crest – Loading" description='variant="loading". Continuous breathing glow, static crest. For loading screens and skeleton states.'>
          <div className="space-y-space-8">
            <div className="flex flex-wrap items-end gap-space-12">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-space-3">
                  <CrestAnimation key={`loading-${size}-${loadingKey}`} size={size} variant="loading" animateOnMount={true} />
                  <span className="font-mono text-caption">{size}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setLoadingKey((k) => k + 1)} className="inline-flex items-center gap-space-2 px-space-4 py-space-2 bg-surface-elevated border border-border-light rounded-md font-body text-label text-text-muted hover:text-text-primary transition-colors">
              <Icon name="rewind" size="sm" />
              Restart
            </button>
          </div>
        </DemoSection>

        {/* ========== CREST DIAGRAM ========== */}
        <DemoSection title="Crest Diagram" description="Interactive annotated crest diagram with default KCC symbols. Hover, hold, or click hotspots to reveal meanings.">
          <div className="space-y-space-8 w-full">
            {/* Variant switcher */}
            <div className="flex justify-center gap-space-4">
              <button onClick={() => setCrestVariant('ambient')} className={cn('inline-flex items-center gap-space-2 px-space-4 py-space-2 rounded-md transition-all', crestVariant === 'ambient' ? 'bg-gold-base text-green-base' : 'bg-surface-elevated text-text-muted hover:text-text-primary')}>
                <span className="font-body text-label">Ambient</span>
              </button>
              <button onClick={() => setCrestVariant('hold')} className={cn('inline-flex items-center gap-space-2 px-space-4 py-space-2 rounded-md transition-all', crestVariant === 'hold' ? 'bg-gold-base text-green-base' : 'bg-surface-elevated text-text-muted hover:text-text-primary')}>
                <span className="font-body text-label">Hold</span>
              </button>
              <button onClick={() => setCrestVariant('click')} className={cn('inline-flex items-center gap-space-2 px-space-4 py-space-2 rounded-md transition-all', crestVariant === 'click' ? 'bg-gold-base text-green-base' : 'bg-surface-elevated text-text-muted hover:text-text-primary')}>
                <span className="font-body text-label">Click</span>
              </button>
            </div>

            {/* CrestDiagram with explicit symbols */}
            <CrestDiagram variant={crestVariant} />

            <p className="font-body text-caption text-text-muted text-center mt-space-4">
              {crestVariant === 'ambient' && ' Lines flow continuously – no interaction needed.'}
              {crestVariant === 'hold' && ' Press and hold a hotspot to reveal meaning.'}
              {crestVariant === 'click' && ' Click a hotspot to toggle the label.'}
            </p>
          </div>
        </DemoSection>
        {/* ========== LIVE PLAYGROUND ========== */}
        <DemoSection title="Live Playground" description="Test any UI icon with size, stroke, and colour.">
          <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md">
            <div className="flex flex-col items-center gap-space-6">
              <div className="flex items-center justify-center w-size-32 h-size-32 bg-surface-deep rounded-md">
                <Icon name={previewName} size={previewSize} strokeWidth={previewStroke} className={previewColor} />
              </div>
              <div className="flex flex-wrap gap-space-4">
                <input type="text" list="icon-names" value={inputText} onChange={handleInputChange} onBlur={handleBlurOrSelect} className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption" placeholder="icon name" />
                <datalist id="icon-names">
                  {iconNames.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
                <select value={previewSize} onChange={(e) => setPreviewSize(e.target.value as 'xs' | 'sm' | 'md' | 'lg' | 'xl')} className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption">
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                </select>
                <input type="number" value={previewStroke} onChange={(e) => setPreviewStroke(parseFloat(e.target.value))} step="0.5" className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption w-size-20" />
                <select value={previewColor} onChange={(e) => setPreviewColor(e.target.value)} className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption">
                  <option value="text-gold-base">Gold</option>
                  <option value="text-green-base">Green</option>
                  <option value="text-text-primary">Primary</option>
                  <option value="text-text-muted">Muted</option>
                  <option value="text-semantic-success-base">Success</option>
                  <option value="text-semantic-warning-base">Warning</option>
                  <option value="text-semantic-error-base">Error</option>
                </select>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
