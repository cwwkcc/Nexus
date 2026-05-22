// apps/web/src/app/[locale]/components/typography/page.tsx
'use client';

import {
  BilingualHeading,
  EyebrowLabel,
  InlineLink,
  QuoteBlock,
  SectionHeader,
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
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Typography</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Specialised text components – headings, quotes, bilingual text and
          inline links.
        </p>

        <DemoSection title="BilingualHeading">
          <BilingualHeading
            english="Welcome"
            sinhala="ආයුබෝවන්"
            tamil="வணக்கம்"
          />
        </DemoSection>

        <DemoSection title="EyebrowLabel">
          <EyebrowLabel>Featured Article</EyebrowLabel>
        </DemoSection>

        <DemoSection title="InlineLink">
          <InlineLink href="/about">Learn more about KCC</InlineLink>
          <InlineLink href="https://example.com" external>
            External link
          </InlineLink>
        </DemoSection>

        <DemoSection title="QuoteBlock">
          <QuoteBlock
            variant="pull-quote"
            quote="Education is the birthright of every child."
            attribution="Dr. Kannangara"
          />
          <QuoteBlock
            variant="ceremonial"
            quote="Panna Naranam Ratanam"
            attribution="School Motto"
          />
        </DemoSection>

        <DemoSection title="SectionHeader">
          <SectionHeader
            eyebrow="Our Story"
            title="The school that"
            titleEm="changed a nation."
          />
          <SectionHeader
            eyebrow="Milestones"
            title="153 Years"
            description="Key moments in history."
            align="center"
            withAccentRule
          />
        </DemoSection>
      </div>
    </div>
  );
}
