// packages/ui/src/components/layout/Container.tsx
import { clsx } from 'clsx';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  padding?: ContainerPadding;
  as?: 'div' | 'section' | 'article';
  className?: string;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-prose', // 65ch for readability
  md: 'max-w-content', // 1160px
  lg: 'max-w-wide', // 1440px
  full: 'max-w-none',
};

const paddingMap: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-space-4 sm:px-space-6',
  md: 'px-space-6 md:px-space-8 lg:px-space-10',
  lg: 'px-space-8 md:px-space-12 lg:px-space-16',
};

export function Container({
  children,
  size = 'md',
  padding = 'md',
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag
      className={clsx(
        'mx-auto w-full',
        sizeMap[size],
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
