'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '../../utilities/cn';
import { Container } from '../layout/Container';

interface TimeLeftProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeftProps {
  const difference = +target - +new Date();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

type CountdownTimerSize = 'small' | 'medium' | 'large';

const sizeMap: Record<CountdownTimerSize, string> = {
  small: 'text-h3',
  medium: 'text-h2',
  large: 'text-h1',
};

interface CountdownTimerProps {
  targetDate: Date | string;
  size?: CountdownTimerSize;
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({
  targetDate,
  size = 'medium',
  onComplete,
  className,
}: CountdownTimerProps) {
  const target =
    typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

  const [timeLeft, setTimeLeft] = useState<TimeLeftProps>(() =>
    calculateTimeLeft(target),
  );

  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isComplete) return;

    intervalRef.current = setInterval(() => {
      const updated = calculateTimeLeft(target);

      setTimeLeft(updated);

      if (
        updated.days === 0 &&
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        setIsComplete(true);
        onComplete?.();

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [target, onComplete, isComplete]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <Container
      size="full"
      padding="none"
      className={cn('flex flex-wrap justify-center gap-space-4', className)}
      aria-live="polite"
      aria-label="Countdown timer"
    >
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="flex h-size-24 w-size-24 items-center justify-center rounded-lg border border-border-light bg-surface-elevated">
            <span
              className={cn(
                'tabular-nums font-body text-gold-base',
                sizeMap[size],
              )}
            >
              {unit.value.toString().padStart(2, '0')}
            </span>
          </div>

          <span className="mt-space-2 block font-body text-caption uppercase text-text-muted">
            {unit.label}
          </span>
        </div>
      ))}
    </Container>
  );
}

CountdownTimer.displayName = 'CountdownTimer';
