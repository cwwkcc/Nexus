// components/atoms/InlineHelpText.tsx
import { clsx } from 'clsx';

type Tone = 'default' | 'success' | 'error';

type Props = {
  id?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
};

const tones: Record<Tone, string> = {
  default: 'text-text-muted',
  success: 'text-success-base',
  error: 'text-error-base',
};

export function InlineHelpText({
  id,
  tone = 'default',
  children,
  className,
}: Props) {
  return (
    <p
      id={id}
      className={clsx('font-body text-caption', tones[tone], className)}
    >
      {children}
    </p>
  );
}

InlineHelpText.displayName = 'InlineHelpText';
