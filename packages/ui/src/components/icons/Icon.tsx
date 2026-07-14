// packages/ui/src/components/icons/Icon.tsx
import { forwardRef } from 'react';

import { iconRegistry, type IconName } from './registry';
import { cn } from '../../utilities/cn';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Name of the icon from the registry */
  name: IconName;
  /** Size token – maps to your design system sizes */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Stroke width – Lucide default is 2, but you can override */
  strokeWidth?: number;
  /** Additional className (for colour, etc.) */
  className?: string;
}

const sizeMap = {
  xs: 'w-icon-sm h-icon-sm', // 16px
  sm: 'w-icon-md h-icon-md', // 20px
  md: 'w-icon-lg h-icon-lg', // 24px
  lg: 'w-icon-xl h-icon-xl', // 32px
  xl: 'w-size-12 h-size-12', // 48px
} as const;

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, size = 'md', strokeWidth = 2, className, ...rest }, ref) => {
  const LucideIcon = iconRegistry[name];
  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon ref={ref} strokeWidth={strokeWidth} className={cn(sizeMap[size], className)} {...rest} />;
});

Icon.displayName = 'Icon';
