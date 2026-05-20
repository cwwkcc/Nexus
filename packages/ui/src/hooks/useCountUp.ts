import { useEffect, useRef, useState } from 'react';
export function useCountUp(
  target: number,
  duration = 1800,
  threshold = 0.3,
): { count: number; ref: React.RefObject<HTMLElement | null> } {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const steps = 60;
          const stepDuration = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            // Ease out: slow down as we approach target
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (step >= steps) {
              setCount(target);
              clearInterval(timer);
            }
          }, stepDuration);
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return { count, ref };
}
