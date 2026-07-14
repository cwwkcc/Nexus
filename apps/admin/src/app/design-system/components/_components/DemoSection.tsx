'use client';

import { ButtonLink, cn, Icon } from '@nexus/ui';

export interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  align?: 'left' | 'center';
  withAccentRule?: boolean;
  sourceHref?: string;
  layout?: 'flex' | 'grid';
  columns?: number;
  className?: string;
}

export function DemoSection({ title, description, children, align = 'left', withAccentRule = false, sourceHref, layout = 'flex', columns = 3, className }: DemoSectionProps) {
  const isCenter = align === 'center';

  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[Math.min(columns, 4)];

  return (
    <div className={cn('mb-space-16', className)}>
      {/* Header */}
      <div className={cn('mb-space-8', isCenter && 'text-center')}>
        <h2 className="font-display text-h2 text-text-primary">{title}</h2>

        {withAccentRule && <div className={cn('w-size-12 h-size-0p5 bg-gold-base mt-space-4', isCenter && 'mx-auto')} />}

        {description && <p className={cn('font-body text-body text-text-muted mt-space-4 max-w-prose', isCenter && 'mx-auto')}>{description}</p>}

        {sourceHref && (
          <div className={cn('mt-space-6', isCenter && 'flex justify-center')}>
            <ButtonLink href={sourceHref} variant="ghost" size="sm" leftIcon={<Icon name="code" size="sm" />}>
              View Code
            </ButtonLink>
          </div>
        )}
      </div>

      {/* Children container */}
      {layout === 'flex' ? <div className="flex flex-wrap gap-space-6 items-start w-size-full">{children}</div> : <div className={cn('grid gap-space-6 w-size-full', gridColumns)}>{children}</div>}
    </div>
  );
}
