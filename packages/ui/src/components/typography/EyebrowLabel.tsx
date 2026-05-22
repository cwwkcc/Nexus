// components/atoms/EyebrowLabel.tsx
import { type ElementType, type ReactNode } from 'react';
import { clsx } from 'clsx';

type Props = {
  children: ReactNode;
  /** Render as a different element when semantics require it — e.g. `legend` inside a fieldset. Defaults to `span`. */
  as?: ElementType;
  className?: string;
};

export function EyebrowLabel({ children, as: Tag = 'span', className }: Props) {
  return (
    <Tag
      className={clsx(
        'font-body text-eyebrow uppercase tracking-eyebrow text-gold-base select-none',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

EyebrowLabel.displayName = 'EyebrowLabel';
