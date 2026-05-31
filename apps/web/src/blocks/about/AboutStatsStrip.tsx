import { StatsStrip, StatItem } from '@nexus/ui';
import { useTranslations } from 'next-intl';

export default function AboutStatsStrip() {
  const t = useTranslations('about');
  const stats = t.raw('stats')
    ? Object.values(t.raw('stats') as Record<string, StatItem>)
    : [];
  return <StatsStrip stats={stats} />;
}
