// packages/ui/src/components/feedback/EmptyState.tsx
'use client';

import { cn } from '../../utilities/cn';

export interface EmptyStateProps {
  heading: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ heading, description, action }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'py-space-16 px-space-6 text-center',
      )}
    >
      {/* Crest motif */}
      <div
        aria-hidden="true"
        className={cn(
          'w-size-14 h-size-14 rounded-full',
          'border border-border-light',
          'flex items-center justify-center',
          'mb-space-6',
          'opacity-35',
        )}
      >
        <span
          className={cn(
            'font-display text-[1.5rem] font-medium italic',
            'text-gold-base',
          )}
        >
          K
        </span>
      </div>

      <h3
        className={cn(
          'font-display text-h3 font-medium',
          'text-text-primary',
          'mb-space-2p5',
        )}
      >
        {heading}
      </h3>

      {description && (
        <p
          className={cn(
            'font-body text-body-sm',
            'text-text-muted',
            'max-w-[360px]',
            action ? 'mb-space-6' : 'mb-0',
          )}
        >
          {description}
        </p>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'font-body text-label uppercase tracking-label',
            'px-space-6 py-space-2p5',
            'border border-gold-base',
            'bg-transparent text-gold-base',
            'cursor-pointer',
            'transition-all duration-fast ease-snap',
            'hover:bg-gold-base hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]',
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
