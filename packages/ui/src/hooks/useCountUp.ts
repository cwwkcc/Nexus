import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type EasingFunction = (t: number) => number;

export interface UseCountUpOptions {
  /** Duration of the animation in milliseconds (default: 1800) */
  duration?: number;
  /** Intersection Observer threshold (0–1) to start counting when element appears (default: 0.3) */
  threshold?: number;
  /** Easing function (default: easeOutCubic) */
  easing?: EasingFunction;
  /** Start counting automatically when element is visible (default: true) */
  startOnVisible?: boolean;
  /** Animation delay in milliseconds (default: 0) */
  delay?: number;
  /** Prefix for formatted output (e.g., "$") */
  prefix?: string;
  /** Suffix for formatted output (e.g., "+") */
  suffix?: string;
  /** Decimal places to round to (default: 0) */
  decimals?: number;
  /** Separator for thousands (default: ",") */
  separator?: string;
  /** Custom formatter function – overrides prefix/suffix/separator/decimals */
  formatter?: (value: number) => string;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export interface UseCountUpReturn {
  /** Current animated count */
  count: number;
  /** Formatted count using options (prefix, suffix, etc.) */
  formattedCount: string;
  /** Ref to attach to the element that triggers counting when visible */
  ref: React.RefObject<HTMLElement | null>;
  /** Manually start counting (ignores startOnVisible) */
  start: () => void;
  /** Reset count to 0 and stop animation */
  reset: () => void;
  /** Pause the animation */
  pause: () => void;
  /** Resume the animation */
  resume: () => void;
  /** Whether the animation is currently running */
  isAnimating: boolean;
  /** Whether the count‑up has completed */
  isComplete: boolean;
}

// -----------------------------------------------------------------------------
// Easing functions (matching design system tokens)
// -----------------------------------------------------------------------------

export const easings = {
  /** smooth start, fast middle, slow end – matches `ease-out` token */
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  /** slow start, fast end – matches `ease-in-out` token */
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  /** very slow start and end – ceremonial feel */
  easeOutQuint: (t: number): number => 1 - Math.pow(1 - t, 5),
  /** linear (no easing) */
  linear: (t: number): number => t,
};

// -----------------------------------------------------------------------------
// Helper: number formatting
// -----------------------------------------------------------------------------

const defaultFormatter = (
  value: number,
  options: {
    decimals: number;
    separator: string;
    prefix: string;
    suffix: string;
  },
): string => {
  const parts = value.toFixed(options.decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, options.separator);
  return `${options.prefix}${parts.join('.')}${options.suffix}`;
};

// -----------------------------------------------------------------------------
// Main hook
// -----------------------------------------------------------------------------

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {},
): UseCountUpReturn {
  const {
    duration = 1800,
    threshold = 0.3,
    easing = easings.easeOutCubic,
    startOnVisible = true,
    delay = 0,
    prefix = '',
    suffix = '',
    decimals = 0,
    separator = ',',
    formatter,
    onComplete,
  } = options;

  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const firedRef = useRef(false); // for IntersectionObserver trigger

  // Formatted output
  const formattedCount = useMemo(() => {
    if (formatter) return formatter(count);
    return defaultFormatter(count, { decimals, separator, prefix, suffix });
  }, [count, formatter, decimals, separator, prefix, suffix]);

  // Core animation function using requestAnimationFrame
  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        if (delay > 0 && !startedRef.current) {
          // Wait for delay before starting
          animationRef.current = requestAnimationFrame(() => {
            startTimeRef.current = performance.now();
            animationRef.current = requestAnimationFrame(animate);
          });
          return;
        }
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      if (progress < 1) {
        const easedProgress = easing(progress);
        const nextCount = Math.round(easedProgress * target);
        setCount(nextCount);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setCount(target);
        setIsAnimating(false);
        setIsComplete(true);
        if (onComplete) onComplete();
        cancelAnimationFrame(animationRef.current!);
        animationRef.current = null;
        startTimeRef.current = null;
      }
    },
    [target, duration, easing, delay, onComplete],
  );

  // Start counting (manual)
  const start = useCallback(() => {
    if (isAnimating || isComplete) return;
    // Reset state if starting again after complete
    if (isComplete) {
      setCount(0);
      setIsComplete(false);
    }
    setIsAnimating(true);
    startedRef.current = true;
    startTimeRef.current = null; // will be set in first animation frame
    animationRef.current = requestAnimationFrame(animate);
  }, [animate, isAnimating, isComplete]);

  // Reset to 0 and stop
  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
    setIsComplete(false);
    setCount(0);
    startTimeRef.current = null;
    startedRef.current = false;
    firedRef.current = false; // allow re‑trigger on visibility again
  }, []);

  // Pause animation
  const pause = useCallback(() => {
    if (!isAnimating || !animationRef.current) return;
    cancelAnimationFrame(animationRef.current);
    pausedTimeRef.current = performance.now();
    setIsAnimating(false);
  }, [isAnimating]);

  // Resume animation
  const resume = useCallback(() => {
    if (isAnimating || isComplete) return;
    if (pausedTimeRef.current !== null && startTimeRef.current !== null) {
      const pauseDuration = performance.now() - pausedTimeRef.current;
      startTimeRef.current += pauseDuration;
      pausedTimeRef.current = null;
    }
    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(animate);
  }, [animate, isAnimating, isComplete]);

  // Intersection Observer for automatic start on visibility
  useEffect(() => {
    if (!startOnVisible) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setCount(target);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current && !isComplete) {
          firedRef.current = true;
          start();
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnVisible, threshold, start, isComplete, target, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return {
    count,
    formattedCount,
    ref,
    start,
    reset,
    pause,
    resume,
    isAnimating,
    isComplete,
  };
}
