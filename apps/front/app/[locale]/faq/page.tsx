import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/Faq';
import Faq from '@/app/components/Faq';
import Contact from '@/app/components/Common/Contact';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('faq');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const FaqPage = async () => {
  const strapiData = await getStrapiData('faq');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const faqs = strapiData?.data?.attributes?.Faqs;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {faqs && <Faq data={faqs} />}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default FaqPage;
