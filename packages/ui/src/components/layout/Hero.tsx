'use client';

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

import { cn } from '../../utilities/cn';
import { NavLink } from '../navigation/NavLink';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroVariant = 'homepage' | 'subpage' | 'minimal';

export interface HeroProps {
  variant?: HeroVariant;
  heading: string;
  subheading?: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string; // optional video background (MP4)
  videoPosterSrc?: string; // poster image for video
  breadcrumb?: { label: string; href?: string }[];
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
  /** Enable parallax effect on background image (default: false) */
  parallax?: boolean;
  /** Overlay opacity (0–1) – defaults are set per variant */
  overlayOpacity?: number;
  className?: string;
  onLoad?: () => void;
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

const ScrollIndicator = () => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div aria-hidden="true" className="absolute bottom-space-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-space-1p5 cursor-default z-10" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
      <div className="w-px h-8 bg-gold-base/40" />
      <motion.div animate={prefersReduced ? {} : { y: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="text-gold-base">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

// ─── Breadcrumb Component ─────────────────────────────────────────────────────

const HeroBreadcrumb = ({ items }: { items: HeroProps['breadcrumb'] }) => {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-space-5">
      <ol className="flex flex-wrap items-center gap-space-2 list-none p-0 m-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-space-2">
              {item.href && !isLast ? (
                <NavLink href={item.href} className="font-body text-caption uppercase tracking-caption text-text-inverse/60 hover:text-gold-base transition-colors duration-fast">
                  {item.label}
                </NavLink>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={cn('font-body text-caption uppercase tracking-caption', isLast ? 'text-gold-base' : 'text-text-inverse/60')}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-text-inverse/30 text-xs">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// ─── Main Hero Component ──────────────────────────────────────────────────────

export function Hero({ variant = 'homepage', heading, subheading, eyebrow, imageSrc, imageAlt = '', videoSrc, videoPosterSrc, breadcrumb, showScrollIndicator = true, children, parallax = false, overlayOpacity, className, onLoad }: HeroProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Parallax scroll effect (only if enabled and not reduced motion)
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, (value) => (parallax && !prefersReduced ? value * 0.5 : 0));

  // Variant-specific styles (using design tokens via Tailwind)
  const heightClass = {
    homepage: 'h-screen min-h-[640px]',
    subpage: 'h-[65vh] min-h-[380px]',
    minimal: 'h-[36vh] min-h-[220px]',
  }[variant];

  const contentPadding = variant === 'homepage' ? 'text-center' : 'text-left';
  const maxWidthClass = variant === 'homepage' ? 'max-w-prose' : 'max-w-content';

  // Overlay gradient – mapped from design system tokens
  const getOverlayGradient = () => {
    if (overlayOpacity !== undefined) {
      return `linear-gradient(to bottom, rgba(28,26,22,${overlayOpacity * 0.8}), rgba(26,74,46,${overlayOpacity}))`;
    }
    const gradients: Record<HeroVariant, string> = {
      homepage: 'linear-gradient(to bottom, rgba(28,26,22,0.55), rgba(26,74,46,0.72), rgba(28,26,22,0.82))',
      subpage: 'linear-gradient(to bottom, rgba(28,26,22,0.5), rgba(26,74,46,0.78))',
      minimal: 'rgba(26,74,46,0.88)',
    };
    return gradients[variant];
  };

  // Framer Motion variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Handle load completion
  useEffect(() => {
    if ((!imageSrc || isImageLoaded) && (!videoSrc || isVideoLoaded)) {
      onLoad?.();
    }
  }, [isImageLoaded, isVideoLoaded, imageSrc, videoSrc, onLoad]);

  return (
    <section ref={heroRef} className={cn('relative flex items-center overflow-hidden bg-green-base', heightClass, className)} aria-label={eyebrow || 'Hero section'}>
      {/* Background media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoSrc ? (
          <video autoPlay loop muted playsInline poster={videoPosterSrc} className="absolute inset-0 w-full h-full object-cover" onLoadedData={() => setIsVideoLoaded(true)}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <motion.div style={parallax && !prefersReduced ? { y: yOffset } : undefined} className="w-full h-full">
            <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover" onLoadingComplete={() => setIsImageLoaded(true)} sizes="100vw" />
          </motion.div>
        ) : null}

        {/* Ken Burns animation for homepage images (only if not video) */}
        {!videoSrc && variant === 'homepage' && !prefersReduced && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.06] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: getOverlayGradient() }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-wide mx-auto px-space-6 md:px-space-8 lg:px-space-10">
        <motion.div className={cn('mx-auto', contentPadding, maxWidthClass)} variants={containerVariants} initial="hidden" animate="visible">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.div variants={itemVariants}>
              <HeroBreadcrumb items={breadcrumb} />
            </motion.div>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <motion.p variants={itemVariants} className="font-body text-eyebrow uppercase tracking-eyebrow text-gold-base mb-space-4">
              {eyebrow}
            </motion.p>
          )}

          {/* Heading */}
          <motion.div variants={itemVariants}>
            <Heading level="h1" color="inverse" className={cn('font-display font-medium leading-[1.05] tracking-[-0.01em]', variant === 'homepage' && 'text-[clamp(2.8rem,6vw,5.5rem)]', variant === 'subpage' && 'text-[clamp(2rem,4vw,3.5rem)]', variant === 'minimal' && 'text-[clamp(1.6rem,3vw,2.5rem)]')}>
              {heading}
            </Heading>
          </motion.div>

          {/* Subheading */}
          {subheading && (
            <motion.div variants={itemVariants}>
              <Text variant="body" color="inverse" className={cn('mt-space-5 text-[clamp(1rem,1.5vw,1.2rem)] text-text-inverse/75', variant === 'homepage' && 'mx-auto max-w-prose')}>
                {subheading}
              </Text>
            </motion.div>
          )}

          {/* Children (CTAs, etc.) */}
          {children && <motion.div>{children}</motion.div>}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {variant === 'homepage' && showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}
