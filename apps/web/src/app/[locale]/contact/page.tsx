import ContactCTA from '../../../blocks/contact/ContactCTA';
import ContactHero from '../../../blocks/contact/ContactHero';
import ContactInfoSection from '../../../blocks/contact/ContactInfoSection';
import {
  getContactPageContent,
  type ContactPageContent,
} from '../../../server/content';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const content: ContactPageContent = await getContactPageContent(
    locale as 'en' | 'si' | 'ta',
  );

  return (
    <>
      <ContactHero data={content.hero} />
      <ContactInfoSection data={content.info} />
      <ContactCTA data={content.cta} />
    </>
  );
}
