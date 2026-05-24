import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Axis = 'horizontal' | 'vertical';
type DividerAccentVariant = 'gold-accent' | 'gold-accent-short' | 'muted';

interface DividerProps {
  accentVariant?: DividerAccentVariant;
  axis?: Axis;
  className?: string;
}

const axisStyles: Record<Axis, string> = {
  horizontal: 'w-size-full h-size-0p5',
  vertical: 'h-size-full w-size-0p5',
};

const colorStyles: Record<DividerAccentVariant, string> = {
  'gold-accent': 'bg-gold-base',
  'gold-accent-short': 'bg-gold-base w-size-20 mx-auto',
  muted: 'bg-border-light',
};

const marginStyles: Record<Axis, string> = {
  horizontal: 'my-space-4',
  vertical: 'mx-space-4',
};

export function Divider({
  axis = 'horizontal',
  accentVariant = 'muted',
  className,
}: DividerProps) {
  const AxisStyles =
    axis === 'horizontal' ? axisStyles.horizontal : axisStyles.vertical;

  return (
    <div
      className={twMerge(
        clsx(
          'border-none rounded-full',
          AxisStyles,
          colorStyles[accentVariant],
          marginStyles[axis],
          className,
        ),
      )}
      role="separator"
      aria-orientation={axis}
    />
  );
}
