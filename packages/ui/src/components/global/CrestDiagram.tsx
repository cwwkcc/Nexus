'use client';

import { useState } from 'react';
import { cn } from '../../utilities/cn';
import { EyebrowLabel } from '../typography/EyebrowLabel';
import { Text } from '../typography/Text';
import { SchoolLogo } from '../logos/SchoolLogo';
import { SvgDebugGrid } from '../dev/SvgDebugGrid';

// ─── Types ────────────────────────────────────────────────────────────────────

type HotspotPosition =
  | 'top-right'
  | 'bottom-right'
  | 'top-left'
  | 'bottom-left';

export interface CrestSymbol {
  id: string;
  name: string;
  meaning: string;
  position: HotspotPosition;
}

export interface CrestDiagramProps {
  symbols: CrestSymbol[];
  /** Show SvgDebugGrid overlay — dev only */
  debug?: boolean;
  className?: string;
}

// ─── Layout config ─────────────────────────────────────────────────────────────
//
// All coordinates are in the SVG viewBox (0 0 480 420).
// The container uses aspect-[480/420] + w-full so the two
// coordinate systems (CSS % and SVG viewBox) scale together.
//
// CSS percentage ↔ SVG unit:
//   x% = svgX / 480 * 100
//   y% = svgY / 420 * 100
//
// SchoolLogo size="xl" = 240px + m-space-2 (8px) margin → ~256px card.
// Card center in SVG coords: (240, 210).
// Card edges (approx): left=112, right=368, top=82, bottom=338.
// Dots sit 7px outside each edge — accounted for in LINE_POINTS.

// Dot positions are relative to the card div (percentage of card size).
const DOT_POSITIONS: Record<HotspotPosition, string> = {
  'top-right': 'top-[15%] -right-[7px]',
  'bottom-right': 'bottom-[15%] -right-[7px]',
  'top-left': 'top-[15%] -left-[7px]',
  'bottom-left': 'bottom-[15%] -left-[7px]',
};

// Label positions are % of the outer container.
const LABEL_POSITIONS: Record<HotspotPosition, string> = {
  'top-right': 'top-[7%] right-[4%] text-left',
  'bottom-right': 'bottom-[7%] right-[4%] text-left',
  'top-left': 'top-[3%] left-[4%] text-left',
  'bottom-left': 'bottom-[12%] left-[4%] text-left',
};

// SVG polyline points: label anchor → right-angle bend → card edge dot.
const LINE_POINTS: Record<HotspotPosition, string> = {
  'top-right': '390,52   390,162  318,162',
  'top-left': '60,26    60,175   162,175',
  'bottom-right': '390,338  390,258  318,258',
  'bottom-left': '90,302   90,258   162,258',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CrestDiagram({
  symbols,
  debug = false,
  className,
}: CrestDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  return (
    <div
      className={cn(
        // aspect-[480/420] + w-full keeps the SVG viewBox and CSS %
        // positions in sync at every container width
        'relative select-none w-full aspect-[480/420]',
        className,
      )}
    >
      {/* ── SVG: connector lines + optional debug grid ──────────────────── */}
      <svg
        viewBox="0 0 480 420"
        // preserveAspectRatio="none" fills the container exactly so SVG
        // coords map linearly to container pixels — required for alignment
        preserveAspectRatio="none"
        className="absolute top-space-0 left-space-0 w-full h-full pointer-events-none z-base"
        aria-hidden
      >
        <SvgDebugGrid
          width={480}
          height={420}
          step={10}
          majorEvery={5}
          showLabels
          show={debug}
        />

        {symbols.map((symbol) => {
          const isActive = activeId === symbol.id;
          return (
            <polyline
              key={symbol.id}
              points={LINE_POINTS[symbol.position]}
              fill="none"
              stroke={
                isActive
                  ? 'var(--color-gold-base)'
                  : 'var(--color-border-default)'
              }
              strokeWidth="1.5"
              strokeDasharray={isActive ? '0' : '4 3'}
              style={{ transition: 'stroke 0.25s, stroke-dasharray 0.25s' }}
            />
          );
        })}
      </svg>

      {/* ── Center crest card ────────────────────────────────────────────── */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-raised',
          'rounded-md bg-surface-elevated',
          'border-border-sm border-solid border-border-light',
          'shadow-elevation-3',
        )}
      >
        <SchoolLogo variant="crest-only" size="xl" />

        {/* Hotspot dots — sit on the card edges, toggle the active symbol */}
        {symbols.map((symbol) => {
          const isActive = activeId === symbol.id;
          return (
            <button
              key={symbol.id}
              onClick={() => toggle(symbol.id)}
              aria-pressed={isActive}
              aria-label={`Highlight ${symbol.name}`}
              className={cn(
                'absolute z-overlay cursor-pointer',
                DOT_POSITIONS[symbol.position],
                'w-size-5 h-size-5 rounded-full',
                'border-border-sm border-solid transition-all duration-fast',
                isActive
                  ? 'bg-gold-base border-gold-base shadow-elevation-3'
                  : 'bg-surface-base border-border-default hover:border-gold-base',
              )}
            />
          );
        })}
      </div>

      {/* ── Label blocks ─────────────────────────────────────────────────── */}
      {symbols.map((symbol) => {
        const isActive = activeId === symbol.id;
        const isDimmed = activeId !== null && !isActive;

        return (
          <button
            key={symbol.id}
            onClick={() => toggle(symbol.id)}
            aria-pressed={isActive}
            aria-label={symbol.name}
            className={cn(
              // max-w-[28%] scales with container so labels
              // never crowd the center card at any width
              'absolute max-w-[28%] text-left cursor-pointer',
              'bg-surface-elevated',
              'border-border-sm border-solid border-border-light',
              'rounded-md p-space-2',
              'transition-opacity duration-fast z-dropdown',
              isDimmed ? 'opacity-30' : 'opacity-100',
              LABEL_POSITIONS[symbol.position],
            )}
          >
            <EyebrowLabel
              className={cn(
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
          </button>
        );
      })}
    </div>
  );
}
