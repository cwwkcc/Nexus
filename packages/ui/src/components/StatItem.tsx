'use client';

import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

type Props = {
  target: number;
  suffix?: string;
  label: string;
};

export function StatItem({ target, suffix = '', label }: Props) {
  const { ref, inView } = useInView(0.5);
  const count = useCountUp(target, inView);

  return (
    <div ref={ref} className="flex-1 min-w-[110px] text-center">
      <div className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold text-gold-light leading-none tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-body text-[0.7rem] font-light tracking-[0.18em] uppercase text-white/40 mt-2">
        {label}
      </div>
    </div>
  );
}
