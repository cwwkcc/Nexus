'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms/Button';

export interface AudioPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  lyrics?: string;
  lyricsSinhala?: string;
  className?: string;
}

export function AudioPlayer({
  src,
  title,
  subtitle,
  lyrics,
  lyricsSinhala,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={clsx(
        'bg-surface-elevated border border-border-light rounded-lg overflow-hidden',
        className,
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Waveform visualization (simplified animated bars) */}
      <div className="bg-surface-deep p-6 flex items-center justify-center gap-1 h-32">
        {Array.from({ length: 40 }).map((_, i) => {
          const isActive = isPlaying && (currentTime / duration) * 40 > i;
          return (
            <div
              key={i}
              className="w-1.5 bg-gold-base rounded-full transition-all duration-150"
              style={{
                height: `${20 + Math.sin(i * 0.5) * 15}px`,
                opacity: isActive ? 0.8 : 0.3,
                animation: isPlaying
                  ? `waveform-pulse ${0.8 + i * 0.03}s ease-in-out infinite`
                  : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-h3">{title}</h3>
            {subtitle && (
              <p className="font-body text-body-sm text-text-muted">
                {subtitle}
              </p>
            )}
          </div>
          <Button
            onClick={togglePlay}
            variant="primary"
            size="lg"
            className="rounded-full w-14 h-14 p-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            )}
          </Button>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-border-light rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-base"
          />
          <div className="flex justify-between mt-2">
            <span className="font-body text-caption text-text-muted">
              {formatTime(currentTime)}
            </span>
            <span className="font-body text-caption text-text-muted">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Lyrics */}
        {(lyrics || lyricsSinhala) && (
          <div className="mt-6 pt-6 border-t border-border-light">
            <p className="font-body text-label uppercase tracking-wider text-gold-base mb-3">
              Lyrics
            </p>
            {lyrics && (
              <p className="font-body text-body-sm text-text-primary whitespace-pre-line">
                {lyrics}
              </p>
            )}
            {lyricsSinhala && (
              <p
                className="font-sinhala text-body text-text-primary mt-3 whitespace-pre-line"
                style={{ fontSize: '1.12rem', lineHeight: 1.8 }}
              >
                {lyricsSinhala}
              </p>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes waveform-pulse {
          0%, 100% { transform: scaleY(1); opacity: 0.3; }
          50% { transform: scaleY(1.5); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
