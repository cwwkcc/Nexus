// packages/ui/src/components/feedback/ErrorState.tsx
'use client';

import { cn } from '../../utilities/cn';

export type ErrorStateVariant = 'inline' | 'section';

export interface ErrorStateProps {
  variant?: ErrorStateVariant;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  variant = 'inline',
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  const isSection = variant === 'section';

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col',
        isSection
          ? 'items-center text-center py-space-16 px-space-6'
          : 'items-start text-left py-space-5 px-space-6',
        'bg-semantic-error-surface border border-semantic-error-base',
        'gap-space-3',
      )}
    >
      {isSection && (
        <div
          aria-hidden="true"
          className={cn(
            'w-size-10 h-size-10 rounded-full',
            'border border-semantic-error-base',
            'flex items-center justify-center',
            'text-semantic-error-base text-lg',
            'opacity-70',
          )}
        >
          !
        </div>
      )}

      <p
        className={cn(
          'font-body text-body-sm',
          'text-semantic-error-base',
          'leading-relaxed',
        )}
      >
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            'font-body text-caption uppercase tracking-caption',
            'px-space-5 py-space-2',
            'border border-semantic-error-base',
            'bg-transparent text-semantic-error-base',
            'cursor-pointer',
            'transition-all duration-fast ease-snap',
            'hover:bg-semantic-error-base hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]',
          )}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
