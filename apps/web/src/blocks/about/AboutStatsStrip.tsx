import type { AboutStatsData } from '@nexus/contracts';
import { StatsStrip } from '@nexus/ui';

export default function AboutStatsStrip({ stats }: { stats: AboutStatsData }) {
  return (
    <StatsStrip stats={stats.stats} className="md:grid-cols-2 lg:grid-cols-4" />
  );
}
