'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useTransform } from 'framer-motion';
import { OrbitalPanel, useOrbit, useMouseParallax } from '@nexus/ui';
import { carouselPanels } from '@/data/home';

const ORBIT_RADIUS = 340;
const PANEL_WIDTH = 200;
const PANEL_HEIGHT = 260;

export default function HomePage() {
  const t = useTranslations('home.hero');

  const angle = useOrbit({ speed: 0.018 });
  const { springX, springY, handleMouseMove, handleMouseLeave } =
    useMouseParallax();

  const crestX = useTransform(springX, [-1, 1], [-8, 8]);
  const crestY = useTransform(springY, [-1, 1], [-8, 8]);
  const ghostX = useTransform(springX, [-1, 1], [12, -12]);
  const ghostY = useTransform(springY, [-1, 1], [6, -6]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      document.documentElement.style.setProperty(
        '--scroll-warmth',
        String(Math.round(progress * 20)),
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <section
        className="relative min-h-screen bg-green flex flex-col items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.35)_100%)] pointer-events-none z-10" />

        <motion.div
          className="absolute font-display font-bold text-white/[0.04] pointer-events-none whitespace-nowrap select-none"
          style={{
            fontSize: 'clamp(22vw, 34vw, 480px)',
            letterSpacing: '-0.06em',
            x: ghostX,
            y: ghostY,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: 'easeOut', delay: 0.5 }}
        >
          1873
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative"
            style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 0.76 }}
          >
            {carouselPanels.map((panel, i) => (
              <OrbitalPanel
                key={panel.id}
                index={i}
                total={carouselPanels.length}
                angle={angle}
                panel={panel}
                orbitRadius={ORBIT_RADIUS}
                panelWidth={PANEL_WIDTH}
                panelHeight={PANEL_HEIGHT}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 flex flex-col items-center text-center px-8">
          <motion.div
            className="relative mb-8 flex-shrink-0"
            style={{ x: crestX, y: crestY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <motion.div
              className="absolute rounded-full border border-gold/20"
              style={{ inset: -48 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute rounded-full border border-gold/10"
              style={{ inset: -28 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative w-28 h-28 rounded-full bg-green-light border border-gold/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(201,151,58,0.15),transparent_70%)]" />
              <span className="font-body text-gold/60 text-[0.6rem] tracking-[0.2em] uppercase text-center leading-relaxed px-2">
                Crest
                <br />
                Coming
                <br />
                Soon
              </span>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-gold/15 to-transparent"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-2xl scale-150 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <p className="font-body text-[0.7rem] font-light tracking-[0.3em] uppercase text-gold/70 mb-4">
              {t('eyebrow')}
            </p>
            <h1
              className="font-display font-semibold text-white leading-[1.05] tracking-tight mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '-0.025em',
              }}
            >
              C.W.W. Kannangara
              <br />
              <span className="font-light italic text-gold-light">
                Central College
              </span>
            </h1>
            <p className="font-body font-light text-white/50 text-[0.9rem] tracking-[0.12em] uppercase mb-10">
              {t('tagline')}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          >
            <motion.a
              href="#explore"
              className="px-8 py-3.5 bg-gold text-text-dark font-body font-normal text-[0.85rem] tracking-[0.12em] uppercase hover:bg-gold-light transition-colors duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('ctaExplore')}
            </motion.a>
            <motion.a
              href="/admissions"
              className="px-8 py-3.5 border border-white/25 text-white/80 font-body font-normal text-[0.85rem] tracking-[0.12em] uppercase hover:border-white/50 hover:text-white transition-colors duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('ctaAdmissions')}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-white/30">
            {t('scrollHint')}
          </span>
          <div className="flex flex-col items-center gap-[4px]">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.span
                key={i}
                className="block w-px h-[7px] bg-gold/40"
                animate={{ opacity: [0.2, 1, 0.2], scaleY: [1, 1.5, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
