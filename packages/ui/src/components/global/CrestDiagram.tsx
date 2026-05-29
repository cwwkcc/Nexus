'use client';

import { useState } from 'react';
import { cn } from '../../utilities/cn';

import { EyebrowLabel } from '../typography/EyebrowLabel';
import { Text } from '../typography/Text';
import { SchoolLogo } from '../logos/SchoolLogo';
import { Container } from '../layout/Container';

// ─── Types ────────────────────────────────────────────────────────────────────

type HotspotPosition =
  | 'top-right'
  | 'bottom-right'
  | 'top-left'
  | 'bottom-left';

interface CrestSymbol {
  id: string;
  name: string;
  meaning: string;
  position: HotspotPosition;
}

interface CrestDiagramProps {
  symbols: CrestSymbol[];
  className?: string;
}

// ─── Layout config ────────────────────────────────────────────────────────────

const DOT_POSITIONS: Record<HotspotPosition, string> = {
  'top-right': 'top-[10%] -right-[7px]',
  'bottom-right': 'bottom-[20%] -right-[7px]',
  'top-left': 'top-[20%] -left-[7px]',
  'bottom-left': 'bottom-[10%] -left-[7px]',
};

const LABEL_POSITIONS: Record<HotspotPosition, string> = {
  'top-right': 'top-[7%] right-[4%]',
  'bottom-right': 'bottom-[7%] right-[4%]',
  'top-left': 'top-[3%] left-[4%] ',
  'bottom-left': 'bottom-[12%] left-[4%]',
};

const LINE_POINTS: Record<HotspotPosition, string> = {
  'top-right': '390,110  390,162 311,162',
  'top-left': '60,80   60,175  170,175',
  'bottom-right': '390,320 390,245 310,245',
  'bottom-left': '90,300  90,258  170,258',
};

export function CrestDiagram({ symbols, className }: CrestDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  return (
    <Container
      size="full"
      padding="lg"
      className={cn(
        'relative select-none bg-surface-base h-size-200 ',
        className,
      )}
    >
      {/* ── Center crest card ────────────────────────────────────────────── */}

      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'rounded-md bg-surface-elevated border-border-md border-solid border-border-light shadow-elevation-3 ',
        )}
      >
        <SchoolLogo size="xl" />
        {/* Hotspot dots on card edges */}
        {symbols.map((symbol) => {
          const isActive = activeId === symbol.id;
          return (
            <div
              key={symbol.id}
              aria-label={`Highlight ${symbol.name}`}
              className={cn(
                'absolute z-overlay',
                DOT_POSITIONS[symbol.position],
                'w-size-5 h-size-5 rounded-full cursor-pointer',
                'border border-solid transition-all duration-fast',
                isActive
                  ? 'bg-gold-base border-gold-base shadow-elevation-3'
                  : 'bg-surface-base border-border-default hover:border-gold-base',
              )}
            ></div>
          );
        })}
      </div>
      {/* SVG connector lines */}
      <svg
        viewBox="0 0 480 420"
        className="absolute top-space-0 left-space-0 w-full h-full pointer-events-none z-base"
        aria-hidden
      >
        {Array.from({ length: 49 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 10}
            y1="0"
            x2={i * 10}
            y2="420"
            stroke="#ddd"
            strokeWidth="0.5"
          />
        ))}

        {Array.from({ length: 43 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 10}
            x2="480"
            y2={i * 10}
            stroke="#ddd"
            strokeWidth="0.5"
          />
        ))}

        {symbols.map((symbol) => {
          const isActive = activeId === symbol.id;
          return (
            <polyline
              key={symbol.id}
              points={LINE_POINTS[symbol.position]}
              fill="none"
              stroke={isActive ? 'var(--color-gold-base)' : 'currentColor'}
              strokeWidth="1"
              strokeDasharray={isActive ? '0' : '4 3'}
              style={{ transition: 'stroke 0.2s, stroke-dasharray 0.2s' }}
              className="text-green-base"
            />
          );
        })}
      </svg>
      {/* ── Label blocks ────────────────────────────────────────────────── */}
      {symbols.map((symbol) => {
        const isActive = activeId === symbol.id;
        const isDimmed = activeId !== null && !isActive;

        return (
          <div
            key={symbol.id}
            onClick={() => toggle(symbol.id)}
            aria-pressed={isActive}
            aria-label={symbol.name}
            className={cn(
              'absolute max-w-size-72 text-left cursor-pointer',
              'bg-green-base border border-border-md rounded-md p-space-2',
              'transition-opacity duration-fast z-dropdown',
              isDimmed ? 'opacity-50' : 'opacity-80',
              LABEL_POSITIONS[symbol.position],
            )}
          >
            <EyebrowLabel
              className={cn(
                'z-overlay',
                'transition-colors duration-fast block',
                isActive ? 'text-gold-base' : 'text-text-muted',
              )}
            >
              {symbol.name}
            </EyebrowLabel>
            <Text
              variant="body-sm"
              color={isActive ? 'gold' : 'muted'}
              className="mt-space-1 normal-case tracking-normal"
            >
              {symbol.meaning}
            </Text>
          </div>
        );
      })}
    </Container>
  );
}
