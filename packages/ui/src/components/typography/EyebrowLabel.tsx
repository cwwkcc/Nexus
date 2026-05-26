// components/atoms/EyebrowLabel.tsx
import { type ElementType, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utilities/cn';

type EyebrowLabelProps = {
  children: ReactNode;
  as?: ElementType;
  'aria-hidden'?: boolean;
  className?: string;
};

export const EyebrowLabel = forwardRef<HTMLElement, EyebrowLabelProps>(
  (
    { children, as: Tag = 'span', 'aria-hidden': ariaHidden, className },
    ref,
  ) => (
    <Tag
      ref={ref}
      aria-hidden={ariaHidden}
      className={cn(
        'font-body text-eyebrow uppercase tracking-eyebrow text-gold-base select-none',
        className,
      )}
    >
      {children}
    </Tag>
  ),
);

EyebrowLabel.displayName = 'EyebrowLabel';
