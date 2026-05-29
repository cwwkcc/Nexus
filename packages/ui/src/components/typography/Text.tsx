import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../utilities/cn';

type TextVariant = 'body' | 'body-sm' | 'caption' | 'label' | 'label-sm';

type TextColor =
  | 'primary' // text-text-primary
  | 'muted' // text-text-muted
  | 'inverse' // text-text-inverse
  | 'gold' // text-gold-base
  | 'success' // text-semantic-success-base
  | 'error' // text-semantic-error-base
  | 'warning' // text-semantic-warning-base
  | 'info'; // text-semantic-info-base

interface TextProps extends ComponentPropsWithoutRef<'p'> {
  /** Visual style variant */
  variant?: TextVariant;
  /** Text colour token */
  color?: TextColor;
  /** HTML element to render (default 'p') */
  as?: ElementType;
}

const variantClasses: Record<TextVariant, string> = {
  body: 'text-body',
  'body-sm': 'text-body-sm',
  caption: 'text-caption uppercase tracking-caption',
  label: 'text-label uppercase tracking-label',
  'label-sm': 'text-label-sm uppercase tracking-label-sm',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  muted: 'text-text-muted',
  inverse: 'text-text-inverse',
  gold: 'text-gold-base',
  success: 'text-semantic-success-base',
  error: 'text-semantic-error-base',
  warning: 'text-semantic-warning-base',
  info: 'text-semantic-info-base',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      color = 'primary',
      as: Tag = 'p',
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <Tag
        ref={ref}
        className={cn(variantClasses[variant], colorClasses[color], className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Text.displayName = 'Text';
