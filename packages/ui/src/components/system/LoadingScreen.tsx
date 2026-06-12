'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { SchoolLogo } from '../icons/brand/SchoolLogo';

export interface LoadingScreenProps {
  /** Control visibility externally — fade out when content is ready */
  visible?: boolean;
  /** Called after the exit animation completes */
  onExited?: () => void;
}

export function LoadingScreen({
  visible = true,
  onExited,
}: LoadingScreenProps) {
  const [exitComplete, setExitComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!visible && exitComplete) {
      onExited?.();
      setExitComplete(false);
    }
  }, [visible, exitComplete, onExited]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-green-base flex items-center justify-center"
          onAnimationComplete={(definition) => {
            if (definition === 'exit') setExitComplete(true);
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Outer glow pulse */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-radial-gold"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.3, scale: 1 }
                  : {
                      opacity: [0.4, 1, 0.4],
                      scale: [0.95, 1.05, 0.95],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Crest with shine overlay */}
            <div className="relative">
              <SchoolLogo variant="crest-only" size="lg" />

              {/* Shine sweep */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
                  aria-hidden="true"
                  initial={{ x: '-200%', opacity: 0 }}
                  animate={{
                    x: ['-200%', '200%'],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.6,
                    times: [0, 0.2, 1],
                  }}
                  style={{
                    width: '40%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(232,184,75,0.5), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
