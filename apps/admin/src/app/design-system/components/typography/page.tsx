'use client';

import { EyebrowLabel, Heading, InlineLink, QuoteBlock, RichTextRenderer, SectionHeader, Text } from '@nexus/ui';

import { DemoSection } from '../_components/DemoSection';

// -----------------------------------------------------------------------------
// Sample Tiptap JSON for RichTextRenderer
// -----------------------------------------------------------------------------
// This is the same doc shape apps/admin's RichTextEditor (Tiptap) produces and
// saves as a content entry's `body` field. Covers every node/mark the renderer
// currently handles: paragraph, heading (h2/h3), bold, italic, link, bulletList,
// orderedList, blockquote, and image.
const sampleTiptapDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'This is a normal paragraph rendered from Tiptap JSON. All styles come from design tokens.' }],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Heading 2 from CMS' }],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Heading 3 from CMS' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'A paragraph with ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ', ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
        { type: 'text', text: ', and a ' },
        { type: 'text', text: 'link', marks: [{ type: 'link', attrs: { href: '/about' } }] },
        { type: 'text', text: ' inside. Marks combine, links become InlineLink components.' },
      ],
    },
    {
      type: 'bulletList',
      content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Unordered list item one' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Unordered list item two' }] }] },
      ],
    },
    {
      type: 'orderedList',
      content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ordered list item one' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ordered list item two' }] }] },
      ],
    },
    {
      type: 'blockquote',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Blockquotes are converted into QuoteBlock (pull-quote variant).' }] }],
    },
    {
      type: 'image',
      attrs: {
        src: '/images/design-system/sample-rich-text.jpg',
        alt: 'Sample image node',
        title: 'Image nodes render through ImageFrame, with the title attr shown as a caption.',
      },
    },
  ],
};

// -----------------------------------------------------------------------------
// Main Typography Demo Page
// -----------------------------------------------------------------------------
export default function TypographyPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Typography Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Specialised text components – eyebrows, headings, inline links, quotes, rich text renderer, section headers, and flexible text wrappers.</p>

        {/* ========== EYEBROW LABEL ========== */}
        <DemoSection title="EyebrowLabel">
          <div className="flex flex-wrap gap-space-6 items-baseline">
            <EyebrowLabel>Default eyebrow</EyebrowLabel>
            <EyebrowLabel as="div">Custom element (div)</EyebrowLabel>
            <EyebrowLabel aria-hidden>Hidden from screen readers</EyebrowLabel>
          </div>
        </DemoSection>

        {/* ========== HEADING ========== */}
        <DemoSection title="Heading – Levels">
          <div className="flex flex-wrap gap-space-6 items-baseline">
            <Heading level="h1">Heading 1</Heading>
            <Heading level="h2">Heading 2</Heading>
            <Heading level="h3">Heading 3</Heading>
            <Heading level="h4">Heading 4</Heading>
            <Heading level="h5">Heading 5</Heading>
            <Heading level="h6">Heading 6</Heading>
          </div>
        </DemoSection>

        <DemoSection title="Heading – Colours">
          <div className="flex flex-wrap gap-space-6 items-baseline">
            <Heading level="h2" color="gold">
              Gold heading
            </Heading>
            <Heading level="h2" color="muted">
              Muted heading
            </Heading>
            <Heading level="h2" color="inverse" className="bg-green-base px-space-2">
              Inverse heading
            </Heading>
            <Heading level="h2" color="success">
              Success heading
            </Heading>
            <Heading level="h2" color="error">
              Error heading
            </Heading>
          </div>
        </DemoSection>

        <DemoSection title="Heading – Polymorphic ‘as’">
          <Heading level="h2" as="h3">
            Rendered as h3 but styled as h2
          </Heading>
        </DemoSection>

        {/* ========== INLINE LINK ========== */}
        <DemoSection title="InlineLink">
          <div className="flex flex-wrap gap-space-6 items-baseline">
            <InlineLink href="/about">Internal link</InlineLink>
            <InlineLink href="https://example.com" external>
              External link (new tab)
            </InlineLink>
            <InlineLink href="/download.pdf" download>
              Download link
            </InlineLink>
            <InlineLink href="/about" prefetch={false}>
              Internal link with prefetch off
            </InlineLink>
            <InlineLink href="/about" aria-label="About KCC">
              With custom aria-label
            </InlineLink>
          </div>
        </DemoSection>

        {/* ========== QUOTE BLOCK ========== */}
        <DemoSection title="QuoteBlock – Pull Quote">
          <div className="flex flex-col gap-space-6 max-w-2xl">
            <QuoteBlock variant="pull-quote" quote="Education is the birthright of every child." attribution="Dr. C.W.W. Kannangara" />
            <QuoteBlock variant="pull-quote" quote="Wisdom is all wealth." cite="https://cwwkcc.lk/about" />
          </div>
        </DemoSection>

        <DemoSection title="QuoteBlock – Ceremonial">
          <div className="flex flex-col gap-space-6 max-w-2xl">
            <QuoteBlock variant="ceremonial" quote="Panna Naranam Ratanam" attribution="School Motto" />
            <QuoteBlock variant="ceremonial" quote="Truth, Courage, Discipline" />
          </div>
        </DemoSection>

        {/* ========== RICH TEXT RENDERER ========== */}
        <DemoSection title="RichTextRenderer" description="Renders Tiptap JSON — the same shape apps/admin's editor saves — with design system components.">
          <div className="w-full max-w-2xl border border-border-light p-space-6 rounded-md bg-surface-elevated">
            <RichTextRenderer value={sampleTiptapDoc} />
          </div>
        </DemoSection>

        {/* ========== SECTION HEADER ========== */}
        <DemoSection title="SectionHeader – Basic">
          <div className="flex flex-col gap-space-12 max-w-2xl">
            <SectionHeader eyebrow="Our Story" title="The school that" titleEm="changed a nation." />
            <SectionHeader eyebrow="Milestones" title="153 Years" description="Key moments in KCC history." align="center" withAccentRule />
          </div>
        </DemoSection>

        <DemoSection title="SectionHeader – Variants">
          <div className="flex flex-col gap-space-12 max-w-2xl">
            <SectionHeader variant="eyebrow-title" eyebrow="Only Eyebrow + Title" title="Description is ignored" description="This text will not appear" />
            <SectionHeader variant="eyebrow-title-description" eyebrow="Full Header" title="With Description" description="This appears because variant includes description." align="center" />
            <SectionHeader headingLevel="h1" eyebrow="Custom Heading Level" title="Rendered as h1" marginBottom="mb-space-6" />
          </div>
        </DemoSection>

        {/* ========== TEXT ========== */}
        <DemoSection title="Text – Body Variants">
          <div className="flex flex-col gap-space-4 max-w-2xl">
            <Text variant="body" color="primary">
              Standard body text (1.05rem, Source Serif 4, primary colour).
            </Text>
            <Text variant="body-sm" color="muted">
              Small body text (0.92rem, muted colour).
            </Text>
            <Text variant="caption" color="gold">
              Caption text – uppercase, tracked, gold.
            </Text>
            <Text variant="label" color="success" as="div">
              Label text – uppercase, tracked, success colour.
            </Text>
            <Text variant="label-sm" color="error">
              Small label text – error colour.
            </Text>
          </div>
        </DemoSection>

        <DemoSection title="Text – Semantic Colours">
          <div className="flex flex-wrap gap-space-6 items-baseline">
            <Text color="primary">Primary</Text>
            <Text color="muted">Muted</Text>
            <Text color="inverse" className="bg-green-base px-space-2 py-space-1">
              Inverse
            </Text>
            <Text color="gold">Gold</Text>
            <Text color="success">Success</Text>
            <Text color="error">Error</Text>
            <Text color="warning">Warning</Text>
            <Text color="info">Info</Text>
          </div>
        </DemoSection>

        <DemoSection title="Text – Custom Elements">
          <div className="flex flex-col gap-space-4">
            <Text as="span" variant="caption">
              Rendered as span
            </Text>
            <Text as="div" variant="body-sm" color="muted">
              Rendered as div
            </Text>
            <Text as="label" variant="label">
              Label for input
            </Text>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
