// packages/ui/src/components/sections/AdmissionsProcessSteps.tsx
'use client';

import { clsx } from 'clsx';

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  timeframe?: string;
}

export interface AdmissionsProcessStepsProps {
  steps: ProcessStep[];
  activeStep?: number;
  className?: string;
}

export function AdmissionsProcessSteps({
  steps,
  activeStep,
  className,
}: AdmissionsProcessStepsProps) {
  return (
    <div className={clsx('relative', className)}>
      {/* Desktop line connector */}
      <div className="absolute top-10 left-0 right-0 h-0.5 bg-border-light hidden md:block" />

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, _idx) => {
          const isActive = activeStep === step.step;
          const isCompleted =
            activeStep !== undefined && step.step < activeStep;
          const isUpcoming = activeStep !== undefined && step.step > activeStep;

          return (
            <div key={step.step} className="relative text-center">
              {/* Step number circle */}
              <div
                className={clsx(
                  'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-2 relative z-10 bg-surface-elevated transition-all',
                  isCompleted && 'border-green-base bg-green-base',
                  isActive && 'border-gold-base',
                  isUpcoming && 'border-border-default',
                )}
              >
                {isCompleted ? (
                  <span className="text-2xl text-white">✓</span>
                ) : (
                  <span
                    className={clsx(
                      'font-display text-2xl font-semibold',
                      isActive ? 'text-gold-base' : 'text-text-muted',
                    )}
                  >
                    {step.step}
                  </span>
                )}
              </div>

              {/* Content */}
              <h3
                className={clsx(
                  'font-display text-h3 mb-2',
                  isActive && 'text-gold-base',
                )}
              >
                {step.title}
              </h3>
              <p className="font-body text-body-sm text-text-muted mb-2">
                {step.description}
              </p>
              {step.timeframe && (
                <p className="font-body text-caption uppercase tracking-wide text-green-base">
                  {step.timeframe}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
