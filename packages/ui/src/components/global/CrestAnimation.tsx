'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { SchoolLogo } from '../logos/SchoolLogo';

export interface CrestAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  animateOnMount?: boolean;
  onComplete?: () => void;
  className?: string;
}

const sizeMap = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
};

export function CrestAnimation({
  size = 'md',
  animateOnMount = true,
  onComplete,
  className,
}: CrestAnimationProps) {
  const [phase, setPhase] = useState<
    'idle' | 'drawing' | 'flooding' | 'pulsing'
  >('idle');

  useEffect(() => {
    if (!animateOnMount) {
      setPhase('pulsing');
      return;
    }
    setPhase('drawing');
    const drawingTimer = setTimeout(() => setPhase('flooding'), 1200);
    const floodingTimer = setTimeout(() => {
      setPhase('pulsing');
      onComplete?.();
    }, 1800);
    return () => {
      clearTimeout(drawingTimer);
      clearTimeout(floodingTimer);
    };
  }, [animateOnMount, onComplete]);

  return (
    <div className={clsx('relative', sizeMap[size], className)}>
      {/* Base crest */}
      <SchoolLogo
        variant="crest-only"
        size={size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'xl'}
        className="w-full h-full"
      />

      {/* Animation overlays */}
      {phase === 'drawing' && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 border-2 border-gold-base rounded-full"
            style={{
              clipPath: 'polygon(0 0, 0 0, 0 100%, 100% 100%, 100% 0)',
              animation: 'kcc-crest-draw 1.2s ease-in-out forwards',
            }}
          />
        </div>
      )}

      {phase === 'flooding' && (
        <div
          className="absolute inset-0 bg-gold-base/20 rounded-full"
          style={{ animation: 'kcc-crest-flood 0.6s ease-out forwards' }}
        />
      )}

      {phase === 'pulsing' && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: 'kcc-crest-pulse 3s ease-in-out infinite',
            boxShadow: '0 0 0 0 rgba(201,151,58,0)',
          }}
        />
      )}

      <style>{`
        @keyframes kcc-crest-draw {
          0% { clip-path: polygon(0 0, 0 0, 0 100%, 100% 100%, 100% 0); }
          100% { clip-path: polygon(0 0, 100% 0, 0 100%, 100% 100%, 100% 0); }
        }
        @keyframes kcc-crest-flood {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        @keyframes kcc-crest-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,151,58,0); }
          50% { box-shadow: 0 0 0 12px rgba(201,151,58,0.2); }
        }
      `}</style>
    </div>
  );
}
