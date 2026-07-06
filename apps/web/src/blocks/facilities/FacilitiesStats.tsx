import type { FacilitiesStatsData } from '@nexus/contracts';
import { StatsStrip } from '@nexus/ui';

export default function FacilitiesStats({ stats }: { stats: FacilitiesStatsData }) {
  return (
    <StatsStrip stats={stats.stats} className="md:grid-cols-2 lg:grid-cols-4" />
  );
}
