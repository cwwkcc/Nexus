import type { ContactHeroData } from '@nexus/contracts';
import { Hero } from '@nexus/ui';

export default function ContactHero({ data }: { data: ContactHeroData }) {
  return (
    <Hero
      variant="subpage"
      heading={data.title}
      subheading={data.subtitle}
      eyebrow={data.eyebrow}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
    />
  );
}
