'use client';
import { motion, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { cn } from '../../utilities/cn';
import { Button } from '../atoms/Button';
import { Icon } from '../icons/Icon';
import { Container } from '../layout/Container';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

interface AudioPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  lyrics?: string;
  lyricsSinhala?: string;
  className?: string;
  downloadLabel?: string;
  rewindLabel?: string;
  forwardLabel?: string;
  seekLabel?: string;
}

export function AudioPlayer({ src, title, subtitle, lyrics, lyricsSinhala, className, downloadLabel = 'Download Track', rewindLabel = 'Rewind 10 Seconds', forwardLabel = 'Forward 10 Seconds', seekLabel = 'Seek progress bar' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Audio Lifecycle & Event Sync Setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);

    // Sync React state directly with DOM audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Reset state completely when track ends
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 2. AudioContext Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initAudioVisualizer = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContext =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof window.AudioContext;
          }
        ).webkitAudioContext;
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;

      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  };

  // 3. Playback Controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (!audioContextRef.current) initAudioVisualizer();
      if (audioContextRef.current?.state === 'suspended') audioContextRef.current.resume();

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Safely handle play() Promise — swallow AbortError from rapid toggle/autoplay policy
        audioRef.current.play().catch((error) => {
          console.warn('Playback was prevented:', error);
        });
      }
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // New Feature: Forward 10s
  const handleForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration, audioRef.current.currentTime + 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useAnimationFrame(() => {
    const bars = barsRef.current;

    if (isPlaying && analyserRef.current && dataArrayRef.current) {
      // @ts-expect-error TypeScript DOM mismatch correctly typed
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      const barCount = bars.length;
      const center = (barCount - 1) / 2;
      const binCount = dataArrayRef.current.length;

      bars.forEach((bar, i) => {
        if (!bar || !dataArrayRef.current) return;

        // Map distance-from-center -> frequency bin, so bass (low bins,
        // usually the loudest) drives the middle bars and higher
        // frequencies fan out toward the edges.
        const normalizedDistance = Math.abs(i - center) / center;
        const dataIndex = Math.min(binCount - 1, Math.floor(normalizedDistance * (binCount - 1)));

        const value = dataArrayRef.current[dataIndex];
        const height = 20 + (value / 255) * 60;
        bar.style.height = `${height}px`;
        bar.style.opacity = `${0.3 + (value / 255) * 0.7}`;
      });
    } else if (!isPlaying) {
      bars.forEach((bar) => {
        if (bar) {
          bar.style.height = '20px';
          bar.style.opacity = '0.3';
        }
      });
    }
  });

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Guard against duration being 0/NaN/Infinity before metadata loads,
  // and clamp so float drift at track-end can't push the dot/fill past 100%.
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const progressPercentage = safeDuration > 0 ? Math.min(100, Math.max(0, (currentTime / safeDuration) * 100)) : 0;

  return (
    <Container className={cn('bg-surface-base border border-border-light rounded-md overflow-hidden shadow-elevation-2', className)}>
      <audio ref={audioRef} src={src} preload="metadata" crossOrigin="anonymous" />

      {/* Visualizer Header */}
      <Container className="bg-surface-active rounded-md border border-border-light flex items-center justify-center gap-space-1 h-size-40 pb-space-6 px-space-6">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            className="w-size-1p5 bg-gold-base rounded-full transition-colors duration-fast "
          />
        ))}
      </Container>

      {/* Main Controls Section */}
      <Container className="p-space-6">
        <div className="flex items-center justify-between mb-space-6">
          <div className="flex-1 pr-space-4">
            <Heading level="h3" className="mb-space-1">
              {title}
            </Heading>
            {subtitle && (
              <Text variant="body-sm" color="muted">
                {subtitle}
              </Text>
            )}
          </div>

          <div className="flex items-center gap-space-2">
            <a href={src} download={title} className="p-space-3 text-text-muted hover:text-gold-base transition-colors rounded-full hover:bg-surface-deep" aria-label={downloadLabel}>
              <Icon name="download" size="sm" />
            </a>

            <button onClick={handleRewind} className="p-space-3 text-text-muted hover:text-gold-base transition-colors rounded-full hover:bg-surface-deep" aria-label={rewindLabel}>
              <Icon name="rewind" size="sm" />
            </button>

            <Button onClick={togglePlay} variant="primary" size="icon-xl" className="rounded-full shadow-elevation-1 transition-transform hover:scale-105 active:scale-95 !w-14 !h-14" aria-label={isPlaying ? 'Pause' : 'Play'}>
              <Icon name={isPlaying ? 'pause' : 'play'} size="md" />
            </Button>

            <button onClick={handleForward} className="p-space-3 text-text-muted hover:text-gold-base transition-colors rounded-full hover:bg-surface-deep" aria-label={forwardLabel}>
              <Icon name="fast-forward" size="sm" />
            </button>
          </div>
        </div>

        {/* Progress Bar Scrubbing UI */}
        <Container className="mb-space-4">
          <div className="relative w-full flex items-center h-size-6 group">
            <div className="absolute w-full h-size-1p5 bg-border-light rounded-full overflow-hidden pointer-events-none">
              <div className="h-full bg-gold-base transition-all duration-instant ease-out" style={{ width: `${progressPercentage}%` }} />
            </div>

            <input type="range" min={0} max={safeDuration} step="0.1" value={currentTime} onChange={handleSeek} className="absolute w-full h-full opacity-0 cursor-pointer z-10" aria-label={seekLabel} />

            <motion.div className="absolute top-1/2 -translate-y-1/2 h-size-3 w-size-3 bg-gold-base rounded-full shadow-elevation-1 z-0 pointer-events-none group-hover:scale-150 transition-transform" style={{ left: `calc(${progressPercentage}% - 6px)` }} />
          </div>

          <div className="flex justify-between mt-space-1 px-1">
            <Text variant="caption" color="muted">
              {formatTime(currentTime)}
            </Text>
            <Text variant="caption" color="muted">
              {formatTime(duration)}
            </Text>
          </div>
        </Container>

        {/* Lyrics Section */}
        {(lyrics || lyricsSinhala) && (
          <Container className="mt-space-4 flex flex-col items-center">
            <button onClick={() => setShowLyrics(!showLyrics)} className="text-gold-base uppercase tracking-label text-label-sm font-label py-space-2 px-space-4 rounded-full hover:bg-gold-glow transition-colors flex items-center gap-space-2">
              {showLyrics ? 'Hide Lyrics' : 'View Lyrics'}
              <motion.span animate={{ rotate: showLyrics ? 180 : 0 }} className="inline-flex">
                <Icon name="chevron-down" size="xs" />
              </motion.span>
            </button>

            <AnimatePresence>
              {showLyrics && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden w-full">
                  <Container className="border-t border-border-light mt-space-4 ">
                    {lyrics && (
                      <Text variant="body" color="primary" className="whitespace-pre-line mb-space-4">
                        {lyrics}
                      </Text>
                    )}
                    {lyricsSinhala && (
                      <Text color="primary" className="font-sinhala-body text-sinhala-body whitespace-pre-line">
                        {lyricsSinhala}
                      </Text>
                    )}
                  </Container>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        )}
      </Container>
    </Container>
  );
}
