'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

export type AnnouncementVariant = 'warning' | 'error' | 'info';

const VARIANT_STYLES: Record<
  AnnouncementVariant,
  { bg: string; border: string; text: string; icon: string }
> = {
  warning: {
    bg: 'var(--semantic-warning-surface, #FAF1DE)',
    border: 'var(--semantic-warning-base, #B07A2B)',
    text: 'var(--semantic-warning-base, #B07A2B)',
    icon: '⚠',
  },
  error: {
    bg: 'var(--semantic-error-surface, #F6E8E5)',
    border: 'var(--semantic-error-base, #8A3B32)',
    text: 'var(--semantic-error-base, #8A3B32)',
    icon: '✕',
  },
  info: {
    bg: 'var(--semantic-info-surface, #EAF0F4)',
    border: 'var(--semantic-info-base, #4A6475)',
    text: 'var(--semantic-info-base, #4A6475)',
    icon: 'ℹ',
  },
};

export interface AnnouncementBannerProps {
  variant?: AnnouncementVariant;
  children: React.ReactNode;
  dismissible?: boolean;
  className?: string;
}

export function AnnouncementBanner({
  variant = 'info',
  children,
  dismissible = false,
  className,
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={clsx(
        'flex items-center justify-between w-full px-6 py-3',
        className,
      )}
      style={{
        background: styles.bg,
        borderBottom: `1px solid ${styles.border}`,
      }}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          style={{
            color: styles.text,
            fontSize: '0.9rem',
            fontFamily: 'var(--font-body)',
            flexShrink: 0,
          }}
        >
          {styles.icon}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: styles.text,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {children}
        </p>
      </div>

      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: styles.text,
            fontSize: '1rem',
            opacity: 0.6,
            padding: '4px',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
