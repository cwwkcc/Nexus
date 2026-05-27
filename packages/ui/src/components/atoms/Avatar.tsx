// packages/ui/src/components/atoms/Avatar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '../../utilities/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarVariant = 'green' | 'gold' | 'muted';
interface AvatarProps {
  src?: string | null;
  name: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  className?: string;
  onError?: () => void;
}

const sizeMap = {
  xs: 'w-size-6 h-size-6 text-xs',
  sm: 'w-size-8 h-size-8 text-xs',
  md: 'w-size-12 h-size-12 text-sm',
  lg: 'w-size-16 h-size-16 text-base',
  xl: 'w-size-24 h-size-24 text-lg',
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
        className={cn(
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
      className={cn(
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
