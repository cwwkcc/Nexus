// components/atoms/EyebrowLabel.tsx
import { type ElementType, type ReactNode, forwardRef } from 'react';

import { cn } from '../../utilities/cn';

type EyebrowLableVariant = 'gold' | 'inverse' | 'muted' | 'primary';

type EyebrowLableSize = 'xs' | 'sm' | 'base' | 'lg';

type EyebrowLabelProps = {
  children: ReactNode;
  as?: ElementType;
  'aria-hidden'?: boolean;
  className?: string;
  variant?: EyebrowLableVariant;
  size?: EyebrowLableSize;
  /** Whether to truncate text with ellipsis */
  truncate?: boolean;
};

const variantClasses = {
  gold: 'text-text-gold',
  inverse: 'text-text-inverse',
  muted: 'text-text-muted',
  primary: 'text-text-primary',
};

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-eyebrow',
  lg: 'text-lg',
};

export const EyebrowLabel = forwardRef<HTMLElement, EyebrowLabelProps>(({ children, as: Tag = 'span', 'aria-hidden': ariaHidden = true, className, variant = 'gold', size = 'base', truncate = false, ...rest }, ref) => (
  <Tag ref={ref} aria-hidden={ariaHidden} className={cn('font-body uppercase select-none', variantClasses[variant], sizeClasses[size], truncate && 'truncate', className)} {...rest}>
    {children}
  </Tag>
));

EyebrowLabel.displayName = 'EyebrowLabel';
