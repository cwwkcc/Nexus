import clsx from 'clsx';

export type SectionHeaderVariant =
  | 'eyebrow-title'
  | 'eyebrow-title-description';
export type SectionHeaderAlign = 'left' | 'center';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleEm?: string;
  description?: string;
  align?: SectionHeaderAlign;
  withAccentRule?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  titleEm,
  description,
  align = 'left',
  withAccentRule = false,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={clsx(isCenter ? 'text-center' : 'text-left', 'mb-14')}>
      {/* Eyebrow */}
      <p
        className={clsx(
          'font-body, text-sm, uppercase, text-gold-base',
          withAccentRule ? 'mb-3.5' : 'mb-4',
        )}
      >
        {eyebrow}
      </p>

      {/* Gold accent rule */}
      {withAccentRule && (
        <div
          className={clsx(
            'w-8 h-0.5 bg-gold-base',
            isCenter ? 'mx-auto mb-4' : 'mb-4',
          )}
        />
      )}

      {/* Title */}
      <h2
        className={clsx(
          'font-display, text-h2 text-primary',
          description ? 'mb-4' : 'mb-0',
        )}
      >
        {title}
        {titleEm && (
          <>
            {' '}
            <em className="em, text-gold-base">{titleEm}</em>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={clsx(
            'font-body, text-base, text-muted',
            isCenter ? 'mx-auto,' : '',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
