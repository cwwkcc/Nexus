'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export interface CountdownTimerProps {
  targetDate: Date | string;
  onComplete?: () => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const difference = +target - +new Date();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function CountdownTimer({
  targetDate,
  onComplete,
  className,
}: CountdownTimerProps) {
  const target =
    typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(target),
  );
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
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
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target, onComplete, isComplete]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className={clsx('flex gap-4 justify-center', className)}>
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-surface-elevated border border-border-light rounded-lg px-4 py-3 min-w-[70px]">
            <span className="font-display text-3xl font-semibold text-gold-base">
              {unit.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="font-body text-caption uppercase text-text-muted mt-2 block">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
