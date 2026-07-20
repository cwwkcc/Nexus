// packages/ui/src/components/feedback/LoadingSkeleton.tsx
'use client';

import { cn } from '../../utilities/cn';

export type SkeletonVariant = 'card' | 'table-row' | 'section';

export interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  /** Number of repeated skeleton items */
  count?: number;
  ariaLabel?: string;
}

// Shimmer animation – kept as global style (injects once, but safe)
const shimmerStyles = `
@keyframes kcc-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@media (prefers-reduced-motion: reduce) {
  .kcc-shimmer { display: none !important; }
}
`;

// Only inject once – multiple identical style tags are harmless.
if (typeof document !== 'undefined' && !document.querySelector('#kcc-skeleton-styles')) {
  const style = document.createElement('style');
  style.id = 'kcc-skeleton-styles';
  style.textContent = shimmerStyles;
  document.head.appendChild(style);
}

function SkeletonBase({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden bg-surface-deep', className)}>
      <div
        className="kcc-shimmer absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,151,58,0.08), transparent)',
          animation: 'kcc-shimmer 1.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className={cn('bg-surface-elevated border border-border-light', 'overflow-hidden')}>
      <SkeletonBase className="h-size-48" /> {/* 192px – closest to 200px */}
      <div className="flex flex-col gap-space-3 p-space-5 pb-space-6">
        <SkeletonBase className="h-size-3 w-[30%] rounded-sm" />
        <SkeletonBase className="h-[22px] w-[85%] rounded-sm" /> {/* 22px not tokenized, keep */}
        <SkeletonBase className="h-size-3p5 w-full rounded-sm" /> {/* 14px */}
        <SkeletonBase className="h-size-3p5 w-[75%] rounded-sm" />
        <SkeletonBase className="h-size-3 w-[25%] rounded-sm mt-space-1" />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className={cn('flex items-center gap-space-4 py-space-3p5', 'border-b border-border-light')}>
      <SkeletonBase className="h-size-4 w-[8%] rounded-sm shrink-0" /> {/* 16px */}
      <SkeletonBase className="h-size-4 w-[30%] rounded-sm" />
      <SkeletonBase className="h-size-4 w-[20%] rounded-sm" />
      <SkeletonBase className="h-size-4 w-[15%] rounded-sm ml-auto" />
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="flex flex-col gap-space-6">
      <div className="flex flex-col gap-space-3">
        <SkeletonBase className="h-size-3 w-[15%] rounded-sm" />
        <SkeletonBase className="h-size-9 w-[40%] rounded-sm" /> {/* 36px – size-9 */}
        <SkeletonBase className="h-[18px] w-[60%] rounded-sm" /> {/* 18px not tokenized, keep */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export function LoadingSkeleton({ variant = 'card', count = 3, ariaLabel = 'Loading content' }: LoadingSkeletonProps) {
  if (variant === 'section') {
    return <SectionSkeleton />;
  }

  const items = Array.from({ length: count });

  if (variant === 'table-row') {
    return (
      <div role="status" aria-label={ariaLabel}>
        {items.map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  // Card grid (default)
  return (
    <div role="status" aria-label={ariaLabel} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4">
      {items.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
