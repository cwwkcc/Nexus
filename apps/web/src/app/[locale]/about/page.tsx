'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FadeIn, StatItem } from '@nexus/ui';
import { milestones, crestSymbols, values, stats } from '@/data/about';

export default function AboutPage() {
  const t = useTranslations('about');
  const [activeSymbol, setActiveSymbol] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-linked background warmth
  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(
        window.scrollY / (document.body.scrollHeight - window.innerHeight),
        1,
      );
      document.documentElement.style.setProperty(
        '--scroll-warmth',
        String(Math.round(progress * 20)),
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timeline drag-to-scroll
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeave = () => {
      isDown = false;
    };
    const onUp = () => {
      isDown = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5;
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <main
      className="overflow-x-hidden"
      style={{
        backgroundColor:
          'hsl(38, 47%, calc(94% - calc(var(--scroll-warmth) * 0.25%)))',
      }}
    >
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-green flex flex-col items-center justify-center overflow-hidden px-8 py-24">
        {/* 1873 ghost */}
        <motion.div
          className="absolute font-display font-bold text-white/[0.035] pointer-events-none whitespace-nowrap select-none"
          style={{
            fontSize: 'clamp(20vw, 32vw, 420px)',
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            letterSpacing: '-0.06em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        >
          1873
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p className="font-body text-[0.75rem] font-light tracking-[0.28em] uppercase text-gold/80 mb-5">
            {t('hero.eyebrow')}
          </p>
          <h1
            className="font-display font-semibold text-white leading-none tracking-tight mb-6"
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {t('hero.title')}
            <br />
            <em
              className="text-gold-light"
              style={{ fontStyle: 'italic', fontWeight: 300 }}
            >
              {t('hero.titleEm')}
            </em>
          </h1>
          <p className="font-body font-light text-white/55 leading-relaxed max-w-md mx-auto">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[5px]">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.span
              key={i}
              className="block w-px h-2 bg-gold/45"
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
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="bg-text-dark py-14 px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-8">
          {stats.map((stat, i) => (
            <>
              <StatItem
                key={stat.id}
                target={stat.target}
                suffix={stat.suffix}
                label={t(`stats.${stat.id}`)}
              />
              {i < stats.length - 1 && (
                <div
                  key={`div-${i}`}
                  className="w-px h-11 bg-white/10 flex-shrink-0 hidden sm:block"
                />
              )}
            </>
          ))}
        </div>
      </section>

      {/* ── 2. The Story ────────────────────────────────────────── */}
      <section className="py-32 px-8 bg-base">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24 items-start">
              <div className="md:sticky md:top-20">
                <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold mb-4">
                  {t('story.eyebrow')}
                </span>
                <h2
                  className="font-display font-medium text-green leading-[1.15] tracking-tight"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
                >
                  {t('story.heading')}
                  <br />
                  <em className="text-gold">{t('story.headingEm')}</em>
                </h2>
              </div>
              <div>
                <p className="font-body font-light text-text-muted leading-[1.9] mb-6 text-[1.05rem]">
                  {t('story.p1')}
                </p>
                <p className="font-body font-light text-text-muted leading-[1.9] mb-6 text-[1.05rem]">
                  {t('story.p2')}
                </p>
                <p className="font-body font-light text-text-muted leading-[1.9] mb-10 text-[1.05rem]">
                  {t('story.p3')}
                </p>
                <blockquote className="pl-6 border-l-2 border-gold">
                  <p className="font-display italic font-normal text-green leading-[1.65] mb-3 text-[1.25rem]">
                    &ldquo;{t('story.quote')}&rdquo;
                  </p>
                  <cite className="font-body font-light text-text-muted text-[0.75rem] tracking-[0.18em] uppercase not-italic">
                    {t('story.quoteAuthor')}
                  </cite>
                </blockquote>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. Dr. Kannangara ───────────────────────────────────── */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-16 md:gap-24 items-start">
            <FadeIn>
              <div className="border border-border bg-surface-deep p-5 pb-4">
                <div className="relative bg-border-light h-[340px] overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/dr-kannangara.jpg"
                    alt={t('kannangara.portraitCaption')}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-display font-light text-border tracking-wider text-[1.8rem]">
                    {t('kannangara.portraitDates')}
                  </div>
                </div>
                <div className="mt-3 font-body text-[0.82rem] text-text-muted text-center leading-relaxed">
                  {t('kannangara.portraitCaption')}
                  <br />
                  <em className="text-gold" style={{ fontStyle: 'italic' }}>
                    {t('kannangara.portraitCaptionEm')}
                  </em>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold mb-3">
                {t('kannangara.eyebrow')}
              </span>
              <h2
                className="font-display font-medium text-green leading-[1.15] tracking-tight mb-2"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {t('kannangara.heading1')}
                <br />
                {t('kannangara.heading2')}
              </h2>
              <p className="font-body font-light text-[0.75rem] tracking-[0.18em] uppercase text-gold mb-8">
                {t('kannangara.role')}
              </p>
              <p className="font-body font-light text-text-muted leading-[1.9] mb-5 text-[1.02rem]">
                {t('kannangara.p1')}
              </p>
              <p className="font-body font-light text-text-muted leading-[1.9] mb-5 text-[1.02rem]">
                {t('kannangara.p2')}
              </p>
              <p className="font-body font-light text-text-muted leading-[1.9] text-[1.02rem]">
                {t('kannangara.p3')}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 4. Timeline ─────────────────────────────────────────── */}
      <section className="py-32 bg-base overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 mb-10">
          <FadeIn>
            <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold mb-3 text-center">
              {t('timeline.eyebrow')}
            </span>
            <h2
              className="font-display font-medium text-green text-center tracking-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {t('timeline.heading')}
            </h2>
          </FadeIn>
          <motion.p
            className="font-body font-light text-[0.75rem] tracking-[0.15em] uppercase text-border text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {t('timeline.hint')}
          </motion.p>
        </div>

        <div
          ref={timelineRef}
          className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none pb-12"
          style={
            {
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            } as React.CSSProperties
          }
        >
          <div className="flex items-start w-max px-16 pt-16 pb-8 relative">
            <div
              className="absolute h-px bg-border"
              style={{ top: 'calc(4rem + 10px)', left: '4rem', right: '4rem' }}
            />
            {milestones.map((m, i) => (
              <motion.div
                key={m.id}
                className="relative flex-shrink-0 w-[260px] pr-8"
                style={{ paddingTop: i % 2 === 0 ? '3rem' : '5.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="absolute top-0 left-0 font-display font-semibold text-gold leading-none tracking-tight text-[2rem]">
                  {m.year}
                </div>
                <motion.div
                  className="absolute w-[11px] h-[11px] rounded-full bg-gold border-[3px] border-base outline outline-1 outline-gold z-10"
                  style={{
                    top:
                      i % 2 === 0 ? 'calc(3rem - 5px)' : 'calc(5.5rem - 5px)',
                    left: 0,
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 + 0.3 }}
                />
                <h3 className="font-heading font-normal text-green text-[1rem] leading-[1.3] mb-2">
                  {t(`timeline.milestones.${m.id}.title`)}
                </h3>
                <p className="font-body font-light text-text-muted text-[0.85rem] leading-[1.75]">
                  {t(`timeline.milestones.${m.id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Vision, Mission, Values ──────────────────────────── */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          {/* Motto */}
          <FadeIn className="text-center mb-16">
            <div className="font-display italic text-green/30 text-[clamp(1.5rem,3vw,2.5rem)] mb-2">
              {t('vmv.motto')}
            </div>
            <div className="font-body font-light text-[0.75rem] tracking-[0.25em] uppercase text-gold">
              {t('vmv.mottoTranslation')}
            </div>
          </FadeIn>

          {/* Vision + Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border mb-0.5">
            <FadeIn className="p-14 bg-base hover:bg-surface-deep transition-colors duration-300">
              <div className="text-gold text-[1.4rem] mb-6">◈</div>
              <h3 className="font-display font-medium text-green text-[1.7rem] tracking-tight mb-5">
                {t('vmv.visionEyebrow')}
              </h3>
              <p className="font-body font-light text-text-muted leading-[1.85]">
                {t('vmv.visionText')}
              </p>
            </FadeIn>
            <FadeIn
              delay={120}
              className="p-14 bg-base hover:bg-surface-deep transition-colors duration-300 border-t md:border-t-0 md:border-l border-border"
            >
              <div className="text-gold text-[1.4rem] mb-6">◇</div>
              <h3 className="font-display font-medium text-green text-[1.7rem] tracking-tight mb-5">
                {t('vmv.missionEyebrow')}
              </h3>
              <p className="font-body font-light text-text-muted leading-[1.85]">
                {t('vmv.missionText')}
              </p>
            </FadeIn>
          </div>

          {/* Three Pillars */}
          <FadeIn className="mt-16 mb-16">
            <div className="border border-border bg-base p-12 text-center">
              <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold mb-8">
                {t('vmv.pillars.heading')}
              </span>
              <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
                {(['truth', 'courage', 'discipline'] as const).map(
                  (pillar, i) => (
                    <motion.div
                      key={pillar}
                      className="text-center"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                    >
                      <div className="font-display font-medium text-green text-[clamp(1.8rem,3vw,2.5rem)] tracking-tight">
                        {t(`vmv.pillars.${pillar}`)}
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </FadeIn>

          {/* Core Values */}
          <FadeIn>
            <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold text-center mb-6">
              {t('vmv.valuesEyebrow')}
            </span>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border-light">
            {values.map((v, i) => (
              <FadeIn key={v.id} delay={i * 100}>
                <div className="group p-10 bg-base border-r border-border-light last:border-r-0 h-full cursor-default hover:bg-green transition-colors duration-300">
                  <div className="font-display font-semibold text-[3rem] text-border leading-none tracking-tighter mb-4 group-hover:text-white/10 transition-colors duration-300">
                    0{i + 1}
                  </div>
                  <div className="font-display italic text-green text-[1.25rem] mb-1 group-hover:text-white/80 transition-colors duration-300">
                    {v.latin}
                  </div>
                  <div className="font-body font-light text-[0.7rem] tracking-[0.22em] uppercase text-gold mb-4 group-hover:text-gold/70 transition-colors duration-300">
                    {t(`vmv.values.${v.id}.english`)}
                  </div>
                  <p className="font-body font-light text-text-muted text-[0.88rem] leading-[1.75] group-hover:text-white/60 transition-colors duration-300">
                    {t(`vmv.values.${v.id}.desc`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Crest Explained ──────────────────────────────────── */}
      <section className="py-32 px-8 bg-base">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold text-center mb-3">
              {t('crest.eyebrow')}
            </span>
            <h2
              className="font-display font-medium text-green text-center tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {t('crest.heading')}
            </h2>
            <p className="font-body font-light text-text-muted text-center max-w-xl mx-auto leading-[1.85] mb-14">
              {t('crest.intro')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20 items-start">
            <FadeIn>
              <div className="relative flex items-center justify-center p-8 bg-surface border border-border">
                {/* Replace with actual crest SVG when ready */}
                <img
                  src="/images/crest.svg"
                  alt="KCC School Crest"
                  className="w-full max-w-[220px] h-auto relative z-10"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,58,0.08),transparent_70%)] pointer-events-none" />
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="border border-border overflow-hidden">
                {crestSymbols.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSymbol(i)}
                    className={`w-full flex items-center gap-4 px-6 py-5 text-left border-b border-border-light last:border-b-0 transition-colors duration-200 ${
                      activeSymbol === i
                        ? 'bg-green'
                        : 'bg-base hover:bg-surface'
                    }`}
                  >
                    <span
                      className={`font-display font-semibold text-[1.1rem] w-7 flex-shrink-0 transition-colors duration-200 ${
                        activeSymbol === i ? 'text-gold/60' : 'text-border'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-body text-[0.88rem] flex-1 leading-snug transition-colors duration-200 ${
                        activeSymbol === i ? 'text-white/90' : 'text-text-dark'
                      }`}
                    >
                      {t(`crest.symbols.${s.id}.name`)}
                    </span>
                    <motion.span
                      className={`text-[0.85rem] flex-shrink-0 ${activeSymbol === i ? 'text-gold-light' : 'text-border'}`}
                      animate={{ x: activeSymbol === i ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </button>
                ))}

                <motion.div
                  key={activeSymbol}
                  className="p-8 bg-surface border-t border-border min-h-[160px]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display font-medium text-green text-[1.5rem] tracking-tight mb-3">
                    {t(`crest.symbols.${crestSymbols[activeSymbol].id}.name`)}
                  </h3>
                  <p className="font-body font-light text-text-muted leading-[1.85]">
                    {t(
                      `crest.symbols.${crestSymbols[activeSymbol].id}.meaning`,
                    )}
                  </p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 7. School Anthem ────────────────────────────────────── */}
      <section className="py-32 px-8 bg-green relative overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] font-serif text-white/[0.025] pointer-events-none leading-none select-none"
          style={{ fontSize: '45vw' }}
        >
          ♩
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-24 items-center">
            <FadeIn>
              <span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold/75 mb-3">
                {t('anthem.eyebrow')}
              </span>
              <h2
                className="font-display font-medium text-white leading-[1.2] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {t('anthem.heading')}
              </h2>
              <p className="font-body font-light text-white/55 leading-[1.85] mb-5">
                {t('anthem.p1')}
              </p>
              <p className="font-body font-light text-white/55 leading-[1.85]">
                {t('anthem.p2')}
              </p>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="border border-white/10 bg-white/5 p-10 flex flex-col items-center gap-8">
                <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                  {[0, 0.6, 1.2].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-gold/30"
                      style={{ inset: `${i * 16}%` }}
                      animate={{ opacity: [0.25, 0.8, 0.25] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                  <motion.span
                    className="relative z-10 text-gold-light text-[2.8rem] font-serif"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ♩
                  </motion.span>
                </div>

                <div className="text-center">
                  <div className="font-display font-medium text-white text-[1.2rem] mb-1">
                    {t('anthem.playerTitle')}
                  </div>
                  <div className="font-body font-light text-white/40 text-[0.75rem] tracking-[0.12em]">
                    {t('anthem.playerSubtitle')}
                  </div>
                </div>

                {/* Replace src with actual audio file when ready */}
                <audio
                  controls
                  className="w-full opacity-70"
                  src="/audio/anthem.mp3"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
