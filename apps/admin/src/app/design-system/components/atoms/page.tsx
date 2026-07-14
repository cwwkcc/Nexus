'use client';

import { Avatar, Badge, Button, ButtonLink, ResultsGradeBadge, Tag, ToolTip, InlineHelpText, BeatLoader, ScaleLoader } from '@nexus/ui';

import { DemoSection } from '../_components/DemoSection';

export default function AtomsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Atoms</h1>
        <p className="font-body text-body text-text-muted mb-space-12">The smallest UI building blocks – buttons, badges, avatars, loaders, tags, ToolTips, and helper text.</p>

        {/* ========== BUTTON ========== */}
        <DemoSection title="Button – Variants (action only)">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </DemoSection>

        <DemoSection title="Button – Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon-sm" aria-label="Close">
            ✕
          </Button>
          <Button size="icon-md" aria-label="Settings">
            ⚙
          </Button>
          <Button size="icon-lg" aria-label="Menu">
            ☰
          </Button>
          <Button size="icon-xl" aria-label="User">
            👤
          </Button>
        </DemoSection>

        <DemoSection title="Button – States">
          <Button loading>Loading</Button>
          <Button loading loadingText="Saving">
            Save
          </Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width</Button>
        </DemoSection>

        <DemoSection title="Button – Icons">
          <Button leftIcon={<span aria-hidden="true">←</span>}>Back</Button>
          <Button rightIcon={<span aria-hidden="true">→</span>}>Next</Button>
          <Button leftIcon={<span>✓</span>} rightIcon={<span>↗</span>}>
            Both
          </Button>
        </DemoSection>

        {/* ========== BUTTON LINK ========== */}
        <DemoSection title="ButtonLink – Navigation (href)">
          <ButtonLink href="/about">Internal Link</ButtonLink>
          <ButtonLink href="https://example.com" target="_blank">
            External Link
          </ButtonLink>
          <ButtonLink href="/admissions" variant="primary">
            Primary Link
          </ButtonLink>
          <ButtonLink href="#" disabled>
            Disabled Link
          </ButtonLink>
        </DemoSection>

        <DemoSection title="ButtonLink – Sizes">
          <ButtonLink href="#" size="sm">
            Small Link
          </ButtonLink>
          <ButtonLink href="#" size="md">
            Medium Link
          </ButtonLink>
          <ButtonLink href="#" size="lg">
            Large Link
          </ButtonLink>
          <ButtonLink href="#" size="icon-sm" aria-label="Home">
            🏠
          </ButtonLink>
          <ButtonLink href="#" size="icon-md" aria-label="Search">
            🔍
          </ButtonLink>
        </DemoSection>

        {/* ========== BADGE ========== */}
        <DemoSection title="Badge – Category & Achievement">
          <Badge variant="category" label="Science" />
          <Badge variant="category" label="Sports" />
          <Badge variant="achievement" label="Gold Medal" />
          <Badge variant="achievement" label="President’s Scout" />
        </DemoSection>

        <DemoSection title="Badge – Status">
          <Badge variant="status" status="draft" />
          <Badge variant="status" status="published" />
          <Badge variant="status" status="archived" />
          <Badge variant="status" status="unread" />
          <Badge variant="status" status="reviewed" />
        </DemoSection>

        <DemoSection title="Badge – Polymorphic as">
          <Badge variant="category" label="Clickable" as="button" />
          <Badge variant="status" status="published" as="div" />
        </DemoSection>

        {/* ========== TAG ========== */}
        <DemoSection title="Tag – Default & Interactive">
          <Tag label="React" />
          <Tag label="TypeScript" active />
          <Tag label="Next.js" onClick={() => alert('Tag clicked')} />
          <Tag label="Tailwind" active onClick={() => alert('Active tag')} />
        </DemoSection>

        {/* ========== AVATAR ========== */}
        <DemoSection title="Avatar – Sizes">
          <Avatar name="JD" size="xs" />
          <Avatar name="JD" size="sm" />
          <Avatar name="JD" size="md" />
          <Avatar name="JD" size="lg" />
          <Avatar name="JD" size="xl" />
        </DemoSection>

        <DemoSection title="Avatar – Variants">
          <Avatar name="Green" variant="green" />
          <Avatar name="Gold" variant="gold" />
          <Avatar name="Muted" variant="muted" />
        </DemoSection>

        <DemoSection title="Avatar – With Image & Fallback">
          <Avatar src="/images/white.jpg" name="John Doe" size="lg" />
          <Avatar name="No Image" size="lg" />
          <Avatar name="" size="lg" />
          <Avatar name="A" size="lg" />
        </DemoSection>

        {/* ========== ToolTip ========== */}
        <DemoSection title="ToolTip – Positions">
          <ToolTip content="Top ToolTip" position="top">
            <Button variant="secondary">Top</Button>
          </ToolTip>
          <ToolTip content="Bottom ToolTip" position="bottom">
            <Button variant="secondary">Bottom</Button>
          </ToolTip>
          <ToolTip content="Left ToolTip" position="left">
            <Button variant="secondary">Left</Button>
          </ToolTip>
          <ToolTip content="Right ToolTip" position="right">
            <Button variant="secondary">Right</Button>
          </ToolTip>
        </DemoSection>

        <DemoSection title="ToolTip – On any element">
          <ToolTip content="I also work on spans">
            <span className="cursor-help underline decoration-dotted">Hover me</span>
          </ToolTip>
          <ToolTip content="Focusable">
            <button aria-label="Focus me">Tab to focus</button>
          </ToolTip>
        </DemoSection>

        {/* ========== INLINE HELP TEXT ========== */}
        <DemoSection title="InlineHelpText – Tones">
          <InlineHelpText tone="default">Default helper text</InlineHelpText>
          <InlineHelpText tone="success">Success message</InlineHelpText>
          <InlineHelpText tone="error">Error message</InlineHelpText>
        </DemoSection>

        {/* ========== RESULTS GRADE BADGE ========== */}
        <DemoSection title="ResultsGradeBadge">
          <ResultsGradeBadge grade="A" />
          <ResultsGradeBadge grade="B" />
          <ResultsGradeBadge grade="C" />
          <ResultsGradeBadge grade="S" />
          <ResultsGradeBadge grade="W" />
          <ResultsGradeBadge grade="F" />
        </DemoSection>

        {/* ========== BEAT LOADER ========== */}
        <DemoSection title="BeatLoader – Sizes">
          <BeatLoader size="sm" />
          <BeatLoader size="md" />
          <BeatLoader size="lg" />
        </DemoSection>

        <DemoSection title="BeatLoader – Colours">
          <BeatLoader variant="green" />
          <BeatLoader variant="gold" />
          <BeatLoader variant="muted" />
        </DemoSection>

        <DemoSection title="BeatLoader – Speeds">
          <BeatLoader speed="fast" />
          <BeatLoader speed="normal" />
          <BeatLoader speed="slow" />
        </DemoSection>

        {/* ========== SCALE LOADER ========== */}
        <DemoSection title="ScaleLoader – Sizes">
          <ScaleLoader size="sm" />
          <ScaleLoader size="md" />
          <ScaleLoader size="lg" />
        </DemoSection>

        <DemoSection title="ScaleLoader – Colours">
          <ScaleLoader variant="green" />
          <ScaleLoader variant="gold" />
          <ScaleLoader variant="muted" />
        </DemoSection>

        <DemoSection title="ScaleLoader – Speeds">
          <ScaleLoader speed="fast" />
          <ScaleLoader speed="normal" />
          <ScaleLoader speed="slow" />
        </DemoSection>
      </div>
    </div>
  );
}
