import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utilities/cn';

type SectionHeaderVariant = 'eyebrow-title' | 'eyebrow-title-description';
type SectionHeaderAlign = 'left' | 'center';
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface SectionHeaderProps extends ComponentPropsWithoutRef<'div'> {
  /** The eyebrow (kicker) text above the main title */
  eyebrow: string;
  /** The main title text */
  title: string;
  /** Optional emphasised part of the title (rendered in gold) */
  titleEm?: string;
  /** Optional description text below the title (only used when variant includes description) */
  description?: string;
  /** Alignment of the header content */
  align?: SectionHeaderAlign;
  /** Whether to show a small gold decorative rule below the eyebrow */
  withAccentRule?: boolean;
  /** Controls whether description is shown */
  variant?: SectionHeaderVariant;
  /** Semantic heading level (default h2) */
  headingLevel?: HeadingLevel;
  /** Custom bottom margin – use spacing tokens (e.g., 'mb-space-14') */
  marginBottom?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      titleEm,
      description,
      align = 'left',
      withAccentRule = false,
      variant = 'eyebrow-title-description',
      headingLevel = 'h2',
      marginBottom = 'mb-space-14',
      className,
      ...rest
    },
    ref,
  ) => {
    const isCenter = align === 'center';
    const HeadingTag = headingLevel;
    const showDescription =
      variant === 'eyebrow-title-description' && !!description;

    return (
      <div
        ref={ref}
        className={cn(
          isCenter ? 'text-center' : 'text-left',
          marginBottom,
          className,
        )}
        {...rest}
      >
        {/* Eyebrow */}
        <p
          className={cn(
            'font-body text-sm uppercase text-gold-base',
            withAccentRule ? 'mb-space-3p5' : 'mb-space-4',
          )}
        >
          {eyebrow}
        </p>

        {/* Gold accent rule */}
        {withAccentRule && (
          <div
            className={cn(
              'w-size-8 h-size-0p5 bg-gold-base',
              isCenter ? 'mx-auto mb-space-4' : 'mb-space-4',
            )}
          />
        )}

        {/* Title */}
        <HeadingTag
          className={cn(
            'font-display text-h2 text-text-primary',
            showDescription ? 'mb-space-4' : 'mb-space-0',
          )}
        >
          {title}
          {titleEm && (
            <>
              {' '}
              <em className="em text-gold-base">{titleEm}</em>
            </>
          )}
        </HeadingTag>

        {/* Description – only shown if variant allows and description exists */}
        {showDescription && (
          <p
            className={cn(
              'font-body text-body text-text-muted',
              isCenter && 'mx-auto',
              'max-w-prose',
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';
