// components/atoms/Badge.tsx
import { clsx } from 'clsx';

type BadgeVariant = 'category' | 'status' | 'achievement';
type BadgeStatus = 'draft' | 'published' | 'archived' | 'unread' | 'reviewed';

type Props =
  | { variant: 'category'; label: string; className?: string }
  | { variant: 'achievement'; label: string; className?: string }
  | { variant: 'status'; status: BadgeStatus; className?: string };

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
  'inline-flex items-center px-space-2 py-space-1 rounded-full font-body text-caption uppercase tracking-caption select-none whitespace-nowrap';

export function Badge(props: Props) {
  if (props.variant === 'status') {
    return (
      <span className={clsx(base, statusStyles[props.status], props.className)}>
        {statusLabels[props.status]}
      </span>
    );
  }

  if (props.variant === 'achievement') {
    return (
      <span
        className={clsx(base, 'bg-gold-pale text-gold-active', props.className)}
      >
        {props.label}
      </span>
    );
  }

  // category (default)
  return (
    <span
      className={clsx(
        base,
        'bg-surface-default text-text-muted',
        props.className,
      )}
    >
      {props.label}
    </span>
  );
}

Badge.displayName = 'Badge';
