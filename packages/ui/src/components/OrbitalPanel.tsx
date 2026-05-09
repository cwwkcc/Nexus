'use client';

import { motion } from 'framer-motion';

type Panel = {
  id: string;
  image: string;
};

type Props = {
  index: number;
  total: number;
  angle: number;
  panel: Panel;
  orbitRadius?: number;
  panelWidth?: number;
  panelHeight?: number;
};

export function OrbitalPanel({
  index,
  total,
  angle,
  panel,
  orbitRadius = 340,
  panelWidth = 200,
  panelHeight = 260,
}: Props) {
  const baseAngle = (index / total) * 360;
  const currentAngle = baseAngle + angle;
  const rad = (currentAngle * Math.PI) / 180;

  const x = Math.cos(rad) * orbitRadius;
  const y = Math.sin(rad) * (orbitRadius * 0.38);

  const depth = Math.sin(rad);
  const scale = 0.72 + (depth + 1) * 0.14;
  const opacity = 0.35 + (depth + 1) * 0.32;
  const zIndex = Math.round((depth + 1) * 10);

  return (
    <motion.div
      className="absolute"
      style={{
        width: panelWidth,
        height: panelHeight,
        x: x - panelWidth / 2,
        y: y - panelHeight / 2,
        scale,
        opacity,
        zIndex,
      }}
    >
      <div className="w-full h-full bg-white/[0.06] border border-white/10 backdrop-blur-sm overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

        {/* Placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
            <span className="text-gold/50 text-lg">+</span>
          </div>
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-white/25 text-center">
            Add Photo
          </span>
        </div>

        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
