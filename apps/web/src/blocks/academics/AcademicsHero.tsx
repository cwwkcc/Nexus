import type { HeroData } from '@nexus/contracts';
import { Hero } from '@nexus/ui';

export default function AcademicsHero({ data }: { data: HeroData }) {
  return <Hero variant="subpage" heading={data.title} subheading={data.subtitle} eyebrow={data.eyebrow} breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academics' }]} />;
}
