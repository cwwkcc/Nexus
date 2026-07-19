import type { HeroData } from '@nexus/contracts';
import { Hero } from '@nexus/ui';

export default function FacilitiesHero({ hero }: { hero: HeroData }) {
  return <Hero variant="subpage" heading={hero.title} subheading={hero.subtitle} eyebrow={hero.eyebrow} breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Facilities' }]} />;
}
