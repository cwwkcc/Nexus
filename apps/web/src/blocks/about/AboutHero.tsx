import { useTranslations } from 'next-intl';
import { Hero } from '@nexus/ui';

export default function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <Hero
      variant="subpage"
      heading={t('title')}
      subheading={t('subtitle')}
      eyebrow={t('eyebrow')}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
    />
  );
}
