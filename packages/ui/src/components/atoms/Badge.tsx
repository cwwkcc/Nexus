'use client';

import { forwardRef } from 'react';
import { cn } from '../../utilities/cn';

type BadgeStatus = 'draft' | 'published' | 'archived' | 'unread' | 'reviewed';
type BadgeVariant = 'category' | 'status' | 'achievement';

interface BadgeProps {
  variant: BadgeVariant;
  status: BadgeStatus;
  lable: string;
  className: string;
}

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
      className={cn(base, colorClass, props.className)}
    >
      {label}
    </span>
  );
});
Badge.displayName = 'Badge';
