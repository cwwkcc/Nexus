'use client';

import { clsx } from 'clsx';
import { Button } from '@nexus/ui';

export interface DemoSectionProps {
  /** Section title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Children (demo components) */
  children: React.ReactNode;
  /** Alignment of header content */
  align?: 'left' | 'center';
  /** Show gold decorative rule below title */
  withAccentRule?: boolean;
  /** Link to source code (e.g., GitHub) – shows a "View Code" button */
  sourceHref?: string;
  /** Additional CSS classes */
  className?: string;
}

export function DemoSection({
  title,
  description,
  children,
  align = 'left',
  withAccentRule = false,
  sourceHref,
  className,
}: DemoSectionProps) {
  const isCenter = align === 'center';

  return (
    <div className={clsx('mb-space-16', className)}>
      {/* Header */}
      <div className={clsx('mb-space-8', isCenter && 'text-center')}>
        {/* Title */}
        <h2 className="font-display text-h2 text-text-primary">{title}</h2>

        {/* Accent rule (optional) */}
        {withAccentRule && (
          <div
            className={clsx(
              'w-size-12 h-size-0-5 bg-gold-base mt-space-4',
              isCenter && 'mx-auto',
            )}
          />
        )}

        {/* Description (optional) */}
        {description && (
          <p
            className={clsx(
              'font-body text-body text-text-muted mt-space-4 max-w-prose',
              isCenter && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}

        {/* View Code button (optional) */}
        {sourceHref && (
          <div
            className={clsx('mt-space-6', isCenter && 'flex justify-center')}
          >
            <Button
              as="a"
              href={sourceHref}
              variant="ghost"
              size="sm"
              target="_blank"
              leftIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              }
            >
              View Code
            </Button>
          </div>
        )}
      </div>

      {/* Children container */}
      <div className="flex flex-wrap gap-space-6 items-center w-size-full">
        {children}
      </div>
    </div>
  );
}
