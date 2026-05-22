// apps/web/src/app/[locale]/components/atoms/page.tsx
'use client';

import {
  Avatar,
  Badge,
  Button,
  ResultsGradeBadge,
  Tag,
  ToolTip,
  InlineHelpText,
  BeatLoader,
  BarLoader,
  ScaleLoader,
} from '@nexus/ui';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-6 items-center">{children}</div>
    </div>
  );
}

export default function AtomsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Atoms</h1>
        <p className="font-body text-body text-text-muted mb-12">
          The smallest UI building blocks – buttons, badges, avatars, loaders
          and more.
        </p>

        <DemoSection title="Avatar">
          <Avatar name="John Doe" size="md" variant="green" />
          <Avatar name="Jane Smith" size="lg" variant="gold" />
          <Avatar name="KITS Member" size="sm" variant="muted" />
          <Avatar src="/images/white.jpg" name="With Image" size="md" />
        </DemoSection>

        <DemoSection title="Badge">
          <Badge variant="category" label="Science" />
          <Badge variant="achievement" label="Gold Medal" />
          <Badge variant="status" status="published" />
          <Badge variant="status" status="draft" />
        </DemoSection>

        <DemoSection title="Button">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </DemoSection>

        <DemoSection title="ResultsGradeBadge">
          <ResultsGradeBadge grade="A" />
          <ResultsGradeBadge grade="B" />
          <ResultsGradeBadge grade="C" />
          <ResultsGradeBadge grade="S" />
          <ResultsGradeBadge grade="W" />
        </DemoSection>

        <DemoSection title="Tag">
          <Tag label="React" />
          <Tag label="TypeScript" active />
          <Tag label="Next.js" onClick={() => alert('Tag clicked')} />
        </DemoSection>

        <DemoSection title="ToolTip">
          <ToolTip content="This is a tooltip" position="top">
            <Button variant="secondary">Hover me</Button>
          </ToolTip>
          <ToolTip content="Bottom tooltip" position="bottom">
            <span className="cursor-help underline">Help text</span>
          </ToolTip>
        </DemoSection>

        <DemoSection title="InlineHelpText">
          <InlineHelpText tone="default">Default helper text</InlineHelpText>
          <InlineHelpText tone="success">Success message</InlineHelpText>
          <InlineHelpText tone="error">Error message</InlineHelpText>
        </DemoSection>

        <DemoSection title="BeatLoader">
          <BeatLoader variant="green" />
          <BeatLoader variant="gold" />
          <BeatLoader variant="muted" />
          <BeatLoader size="sm" speed="fast" />
          <BeatLoader size="lg" speed="slow" />
        </DemoSection>

        <DemoSection title="BarLoader">
          <BarLoader variant="green" />
          <BarLoader variant="gold" />
          <BarLoader variant="muted" />
        </DemoSection>

        <DemoSection title="ScaleLoader">
          <ScaleLoader variant="green" />
          <ScaleLoader variant="gold" />
          <ScaleLoader variant="muted" />
        </DemoSection>
      </div>
    </div>
  );
}
