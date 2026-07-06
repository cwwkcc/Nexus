import type { AdministrationHeroData } from '@nexus/contracts';
import { Hero } from '@nexus/ui';

export default function AdministrationHero({ data }: { data: AdministrationHeroData }) {
  return (
    <Hero
      variant="subpage"
      heading={data.title}
      subheading={data.subtitle}
      eyebrow={data.eyebrow}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Administration' }]}
    />
  );
}
