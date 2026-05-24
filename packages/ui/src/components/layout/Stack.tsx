// packages/ui/src/components/layout/Stack.tsx
import { clsx } from 'clsx';

type StackAlign = 'start' | 'center' | 'end' | 'stretch';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type StackAs = 'div' | 'nav' | 'section' | 'ul';

const spacingMap: Record<StackSpacing, string> = {
  0: 'gap-0',
  1: 'gap-space-1',
  2: 'gap-space-2',
  3: 'gap-space-3',
  4: 'gap-space-4',
  5: 'gap-space-5',
  6: 'gap-space-6',
  8: 'gap-space-8',
  10: 'gap-space-10',
  12: 'gap-space-12',
};

const alignMap: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

interface VStackProps {
  children: React.ReactNode;
  spacing?: StackSpacing;
  align?: StackAlign;
  className?: string;
  as?: StackAs;
}

export function VStack({
  children,
  spacing = 4,
  align = 'stretch',
  as: Tag = 'div',
  className,
}: VStackProps) {
  return (
    <Tag
      className={clsx(
        'flex flex-col',
        spacingMap[spacing],
        alignMap[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface HStackProps {
  children: React.ReactNode;
  spacing?: StackSpacing;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  as?: StackAs;
}

export function HStack({
  children,
  spacing = 4,
  align = 'center',
  justify = 'start',
  wrap = false,
  as: Tag = 'div',
  className,
}: HStackProps) {
  return (
    <Tag
      className={clsx(
        'flex',
        spacingMap[spacing],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
