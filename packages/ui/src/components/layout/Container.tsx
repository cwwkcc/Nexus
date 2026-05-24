// packages/ui/src/components/layout/Container.tsx
import { clsx } from 'clsx';

type ContainerSize = 'sm' | 'md' | 'lg' | 'full';
type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';
type ContainerAs = 'div' | 'section' | 'article';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  padding?: ContainerPadding;
  as?: ContainerAs;
  className?: string;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-prose',
  md: 'max-w-content',
  lg: 'max-w-wide',
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
