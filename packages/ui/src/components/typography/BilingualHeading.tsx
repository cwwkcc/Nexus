'use client';

import { clsx } from 'clsx';
import { useLocale } from 'next-intl';

export interface BilingualHeadingProps {
  english: string;
  sinhala: string;
  tamil?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
  showBoth?: boolean; // If true, shows both languages stacked; if false, shows only active language
}

export function BilingualHeading({
  english,
  sinhala,
  tamil,
  as: Tag = 'h2',
  className,
  showBoth = false,
}: BilingualHeadingProps) {
  const locale = useLocale();

  if (showBoth) {
    return (
      <div className={clsx('space-y-2', className)}>
        <Tag className="font-display text-current">{english}</Tag>
        <p className="font-sinhala text-lg leading-relaxed text-text-muted">
          {sinhala}
        </p>
        {tamil && (
          <p className="font-body text-base text-text-muted">{tamil}</p>
        )}
      </div>
    );
  }

  const getText = () => {
    if (locale === 'si') return sinhala;
    if (locale === 'ta' && tamil) return tamil;
    return english;
  };

  return (
    <Tag
      className={clsx(
        locale === 'si' && 'font-sinhala text-xl leading-relaxed',
        className,
      )}
    >
      {getText()}
    </Tag>
  );
}
