import { clsx } from 'clsx';

export interface CaptionProps {
  children: React.ReactNode;
  variant?: 'inline' | 'overlay';
  className?: string;
}

export function Caption({
  children,
  variant = 'inline',
  className,
}: CaptionProps) {
  return (
    <figcaption
      className={clsx(
        'font-body text-caption text-text-muted',
        variant === 'overlay' &&
          'absolute bottom-0 left-0 right-0 bg-overlay-medium text-text-inverse p-2 text-center',
        variant === 'inline' && 'mt-2 text-center',
        className,
      )}
    >
      {children}
    </figcaption>
  );
}
