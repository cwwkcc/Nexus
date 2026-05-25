// packages/ui/src/components/layout/Grid.tsx

import { cn } from '../../utilities/cn';

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridAs = 'div' | 'ul';

const columnsMap: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

const gapMap: Record<GridGap, string> = {
  0: 'gap-0',
  1: 'gap-space-1',
  2: 'gap-space-2',
  3: 'gap-space-3',
  4: 'gap-space-4',
  5: 'gap-space-5',
  6: 'gap-space-6',
  7: 'gap-space-7',
  8: 'gap-space-8',
  9: 'gap-space-9',
  10: 'gap-space-10',
  11: 'gap-space-11',
  12: 'gap-space-12',
};

export interface GridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  as?: GridAs;
  className?: string;
}

export function Grid({
  children,
  columns = 3,
  gap = 6,
  as: Tag = 'div',
  className,
}: GridProps) {
  return (
    <Tag className={cn('grid', columnsMap[columns], gapMap[gap], className)}>
      {children}
    </Tag>
  );
}

export interface GridItemProps {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

export function GridItem({ children, colSpan, className }: GridItemProps) {
  const spanClass = colSpan
    ? `col-span-${colSpan} md:col-span-${Math.min(colSpan, 6)}`
    : '';
  return <div className={cn(spanClass, className)}>{children}</div>;
}
