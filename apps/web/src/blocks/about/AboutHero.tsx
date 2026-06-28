import { Hero } from '@nexus/ui';
import type { AboutHeroData } from '@nexus/contracts';

export default function AboutHero({ hero }: { hero: AboutHeroData }) {
  return (
    <Hero
      variant="subpage"
      heading={hero.title}
      subheading={hero.subtitle}
      eyebrow={hero.eyebrow}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
    />
  );
}
