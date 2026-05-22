'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export interface AmbientEmbersProps {
  count?: number;
  className?: string;
}

interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function AmbientEmbers({ count = 20, className }: AmbientEmbersProps) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const newEmbers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 6,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
    }));
    setEmbers(newEmbers);
  }, [count]);

  return (
    <div
      className={clsx(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className,
      )}
    >
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full bg-gold-base/40"
          style={{
            left: `${ember.x}%`,
            top: `${ember.y}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            animation: `kcc-ember-rise ${ember.duration}s ease-in-out infinite`,
            animationDelay: `${ember.delay}s`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes kcc-ember-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
