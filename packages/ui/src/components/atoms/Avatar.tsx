// packages/ui/src/components/atoms/Avatar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

export interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'green' | 'gold' | 'muted';
  className?: string;
  onError?: () => void;
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-lg',
};

const variantMap = {
  green: 'bg-green-base text-text-inverse',
  gold: 'bg-gold-base text-green-base',
  muted: 'bg-surface-deep text-text-muted',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  variant = 'green',
  className,
  onError,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <div
        className={clsx(
          'relative rounded-full overflow-hidden flex-shrink-0',
          sizeMap[size],
          className,
        )}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-display font-medium flex-shrink-0',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
      aria-label={`Avatar for ${name}`}
    >
      {getInitials(name)}
    </div>
  );
}
