'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { ComponentProps } from 'react';

import { InlineLink } from './InlineLink';
import { QuoteBlock } from './QuoteBlock';
import { cn } from '../../utilities/cn';
import { ImageFrame } from '../media/ImageFrame';

export interface RichTextRendererProps {
  value: unknown;
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="font-body text-body text-text-primary mb-space-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="font-display text-h2 mt-space-8 mb-space-4 text-text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display text-h3 mt-space-6 mb-space-3 text-text-primary">{children}</h3>,
    h4: ({ children }) => (
      <h4 className="font-display text-h3 mt-space-4 mb-space-2 text-text-primary">
        {/* Using text-h3 as fallback; consider adding text-h4 token */}
        {children}
      </h4>
    ),
    blockquote: ({ children }) => <QuoteBlock variant="pull-quote" quote={typeof children === 'string' ? children : ''} />,
  },
  marks: {
    link: ({ children, value }) => (
      <InlineLink href={value?.href} external={value?.href?.startsWith('http')}>
        {children}
      </InlineLink>
    ),
    em: ({ children }) => <em className="italic font-quote">{children}</em>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => <ul className="flex flex-col gap-space-1 list-disc pl-space-6 mb-space-4">{children}</ul>,
    number: ({ children }) => <ol className="flex flex-col gap-space-1 list-decimal pl-space-6 mb-space-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="font-body text-body text-text-primary">{children}</li>,
    number: ({ children }) => <li className="font-body text-body text-text-primary">{children}</li>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-space-6">
        <ImageFrame src={value.asset?.url} alt={value.alt || ''} aspectRatio="hero" variant="standard" />
        {value.caption && <figcaption className="text-center font-body text-caption text-text-muted mt-space-2">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export function RichTextRenderer({ value, className }: RichTextRendererProps) {
  if (!value) return null;
  return (
    <div className={cn('max-w-none', className)}>
      <PortableText value={value as ComponentProps<typeof PortableText>['value']} components={components} />
    </div>
  );
}
