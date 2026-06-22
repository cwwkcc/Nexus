import { Hero } from '@nexus/ui';
import { useTranslations } from 'next-intl';

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
