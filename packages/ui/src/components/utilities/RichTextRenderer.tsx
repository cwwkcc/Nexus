'use client';

import { clsx } from 'clsx';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { ImageFrame } from '../media/ImageFrame';
import { InlineLink } from '../typography/InlineLink';
import { QuoteBlock } from '../typography/QuoteBlock';

// For use with Sanity CMS portable text
export interface RichTextRendererProps {
  value: any; // PortableText block array
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-body text-text-primary mb-4 leading-relaxed">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-h2 mt-8 mb-4 text-text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-h3 mt-6 mb-3 text-text-primary">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-xl font-medium mt-4 mb-2 text-text-primary">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <QuoteBlock variant="pull-quote" quote={children as string} />
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <InlineLink href={value?.href} external={value?.href?.startsWith('http')}>
        {children}
      </InlineLink>
    ),
    em: ({ children }) => <em className="italic font-serif">{children}</em>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body text-body text-text-primary">{children}</li>
    ),
    number: ({ children }) => (
      <li className="font-body text-body text-text-primary">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-6">
        <ImageFrame
          src={value.asset?.url}
          alt={value.alt || ''}
          aspectRatio="16/9"
          variant="standard"
        />
        {value.caption && (
          <figcaption className="text-center text-caption text-text-muted mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export function RichTextRenderer({ value, className }: RichTextRendererProps) {
  if (!value) return null;
  return (
    <div
      className={clsx(
        'prose prose-lg max-w-none prose-headings:font-display prose-p:font-body prose-p:text-text-primary prose-a:text-gold-base prose-a:underline prose-strong:text-text-primary',
        className,
      )}
    >
      <PortableText value={value} components={components} />
    </div>
  );
}
