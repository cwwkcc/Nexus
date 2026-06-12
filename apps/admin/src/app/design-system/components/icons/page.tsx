// apps/admin/src/app/design-system/components/icons/page.tsx
'use client';

import { useState } from 'react';
import {
  // Lucide UI icons
  Icon,
  type IconName,
  // Brand components
  SchoolLogo,
  CrestAnimation,
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
import { DemoSection } from '../_components/DemoSection';

// All registered Lucide icon names (from registry.ts)
const iconNames: IconName[] = [
  'menu',
  'close',
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'search',
  'home',
  'arrow-up',
  'download',
  'share',
  'external-link',
  'copy',
  'upload',
  'play',
  'pause',
  'rewind',
  'fast-forward',
  'file-text',
  'file-spreadsheet',
  'archive',
  'mail',
  'phone',
  'map-pin',
  'calendar',
  'clock',
  'info',
  'check-circle',
  'alert-circle',
  'alert-triangle',
  'x-circle',
  'award',
  'trophy',
  'users',
  'user',
  'book-open',
  'building',
  'camera',
  'music',
  'flag',
];

export default function IconsPage() {
  const [previewName, setPreviewName] = useState<IconName>('award');
  const [previewSize, setPreviewSize] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl'
  >('xl');
  const [previewStroke, setPreviewStroke] = useState(2);
  const [previewColor, setPreviewColor] = useState('text-gold-base');

  const isValidIconName = (name: string): name is IconName => {
    return iconNames.includes(name as IconName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isValidIconName(val)) setPreviewName(val);
  };

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Icons</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Typed, token‑aware icon system. UI icons from Lucide, social & brand
          icons as custom SVGs. All support the{' '}
          <code className="bg-surface-deep px-space-1 rounded-sm">size</code>{' '}
          prop (xs–xl).
        </p>

        {/* ========== LUCIDE UI ICONS ========== */}
        <DemoSection
          title="UI Icons (Lucide)"
          description="All registered Lucide icons with size, strokeWidth, and colour tokens."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-space-4">
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center p-space-4 bg-surface-elevated border border-border-light rounded-md"
              >
                <Icon name={name} size="lg" className="text-text-primary" />
                <span className="mt-space-2 font-mono text-caption text-text-muted">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </DemoSection>

        {/* ========== SOCIAL ICONS ========== */}
        <DemoSection
          title="Social Icons"
          description="Official brand SVGs with size prop support."
        >
          <div className="space-y-space-12">
            {/* Facebook */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">
                Facebook
              </h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <FacebookWhite size="lg" className="text-text-primary" />
                <FacebookColor size="lg" />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">
                LinkedIn
              </h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <LinkedInBlack size="lg" className="text-text-primary" />
                <LinkedInColor size="lg" />
                <LinkedInWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
                <LinkedInInlineColor size="lg" />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">
                WhatsApp
              </h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <WhatsAppGlyphBlack size="lg" className="text-text-primary" />
                <WhatsAppGlyphGreen size="lg" />
                <WhatsAppGlyphWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
                <WhatsAppStackedBlack size="lg" className="text-text-primary" />
                <WhatsAppStackedGreen size="lg" />
                <WhatsAppStackedWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
              </div>
            </div>

            {/* YouTube */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">
                YouTube
              </h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <YouTubeInlineBlack size="lg" className="text-text-primary" />
                <YouTubeInlineColor size="lg" />
                <YouTubeInlineWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
                <YouTubeWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
                <YouTubeBlack size="lg" className="text-text-primary" />
                <YouTubeColor size="lg" />
              </div>
            </div>

            {/* GitHub */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">
                GitHub
              </h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <GitHubInvertocatBlack
                  size="lg"
                  className="text-text-primary"
                />
                <GitHubInvertocatWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
                <GitHubLockupBlack size="lg" className="text-text-primary" />
                <GitHubLockupWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 border-b border-border-light pb-space-2">
                Instagram
              </h3>
              <div className="flex flex-wrap gap-space-6 items-center">
                <InstagramGlyphBlack size="lg" className="text-text-primary" />
                <InstagramGlyphWhite
                  size="lg"
                  className="bg-surface-inverse p-space-1 rounded"
                />
                <InstagramGlyphGradient size="lg" />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* ========== SIZE DEMO ========== */}
        <DemoSection
          title="Size Prop"
          description="All social icons support xs–xl sizes matching design tokens."
        >
          <div className="flex flex-wrap items-end gap-space-8">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div
                key={size}
                className="flex flex-col items-center gap-space-2"
              >
                <FacebookColor size={size} />
                <span className="font-mono text-caption">{size}</span>
              </div>
            ))}
          </div>
        </DemoSection>

        {/* ========== BRAND MARKS ========== */}
        <DemoSection
          title="Brand & Institutional Marks"
          description="School crest, lockup, and animated crest."
        >
          <div className="flex flex-wrap items-center gap-space-12">
            <div className="flex flex-col items-center gap-space-3">
              <SchoolLogo
                variant="crest-only"
                className="w-size-24 h-size-24"
              />
              <span className="font-mono text-caption">Crest only</span>
            </div>
            <div className="flex flex-col items-center gap-space-3">
              <SchoolLogo variant="lockup" className="w-size-40" />
              <span className="font-mono text-caption">Lockup</span>
            </div>
            <div className="flex flex-col items-center gap-space-3">
              <CrestAnimation size="sm" animateOnMount={false}>
                <div />
              </CrestAnimation>
              <span className="font-mono text-caption">Animated crest</span>
            </div>
          </div>
        </DemoSection>

        {/* ========== LIVE PLAYGROUND ========== */}
        <DemoSection
          title="Live Playground"
          description="Test any UI icon with size, stroke, and colour."
        >
          <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md">
            <div className="flex flex-col items-center gap-space-6">
              <div className="flex items-center justify-center w-size-32 h-size-32 bg-surface-deep rounded-md">
                <Icon
                  name={previewName}
                  size={previewSize}
                  strokeWidth={previewStroke}
                  className={previewColor}
                />
              </div>
              <div className="flex flex-wrap gap-space-4">
                <input
                  type="text"
                  list="icon-names"
                  value={previewName}
                  onChange={handleNameChange}
                  className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption"
                  placeholder="icon name"
                />
                <datalist id="icon-names">
                  {iconNames.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
                <select
                  value={previewSize}
                  onChange={(e) => setPreviewSize(e.target.value as any)}
                  className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption"
                >
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                </select>
                <input
                  type="number"
                  value={previewStroke}
                  onChange={(e) => setPreviewStroke(parseFloat(e.target.value))}
                  step="0.5"
                  className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption w-size-20"
                />
                <select
                  value={previewColor}
                  onChange={(e) => setPreviewColor(e.target.value)}
                  className="px-space-3 py-space-2 bg-surface-default border border-border-light rounded-md font-mono text-caption"
                >
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
