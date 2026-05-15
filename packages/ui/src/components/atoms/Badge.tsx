'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';

export type BadgeStatus =
  | 'draft'
  | 'published'
  | 'archived'
  | 'unread'
  | 'reviewed';
export type BadgeVariant = 'category' | 'status' | 'achievement';

export type BadgeProps =
  | { variant: 'category'; label: string; className?: string }
  | { variant: 'achievement'; label: string; className?: string }
  | { variant: 'status'; status: BadgeStatus; className?: string };

const variantStyles: Record<Exclude<BadgeVariant, 'status'>, string> = {
  category: 'bg-surface-default text-text-muted',
  achievement: 'bg-gold-pale text-gold-active',
};

const statusStyles: Record<BadgeStatus, string> = {
  draft: 'bg-warning-surface text-warning-base',
  published: 'bg-success-surface text-success-base',
  archived: 'bg-surface-default text-text-muted',
  unread: 'bg-info-surface text-info-base',
  reviewed: 'bg-success-surface text-success-base',
};

const statusLabels: Record<BadgeStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
  unread: 'Unread',
  reviewed: 'Reviewed',
};

const base =
  'inline-flex items-center px-space-2 py-space-1 rounded-full font-body text-caption ' +
  'uppercase tracking-caption leading-none select-none whitespace-nowrap';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const isStatus = props.variant === 'status';
  const colorClass = isStatus
    ? statusStyles[props.status]
    : variantStyles[props.variant];

  const label = isStatus ? statusLabels[props.status] : props.label;

  return (
    <span
      ref={ref}
      aria-label={isStatus ? `Status: ${label}` : undefined}
      data-variant={props.variant}
      data-status={isStatus ? props.status : undefined}
      className={clsx(base, colorClass, props.className)}
    >
      {label}
    </span>
  );
});
Badge.displayName = 'Badge';
