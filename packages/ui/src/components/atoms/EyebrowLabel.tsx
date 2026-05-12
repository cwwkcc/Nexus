// components/atoms/EyebrowLabel.tsx
import { clsx } from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function EyebrowLabel({ children, className }: Props) {
  return (
    <span
      className={clsx(
        'font-body text-eyebrow uppercase tracking-eyebrow text-gold-base select-none',
        className,
      )}
    >
      {children}
    </span>
  );
}

EyebrowLabel.displayName = 'EyebrowLabel';
