import { useEffect, useRef, useState } from 'react';

type UseOrbitOptions = {
  speed?: number; // degrees per ms
  paused?: boolean;
};

export function useOrbit({
  speed = 0.018,
  paused = false,
}: UseOrbitOptions = {}) {
  const [angle, setAngle] = useState(0);
  const lastTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = (time: number) => {
      if (lastTime.current !== null && !paused) {
        const delta = time - lastTime.current;
        setAngle((prev) => prev + speed * delta);
      }
      lastTime.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, paused]);

  return angle;
}
