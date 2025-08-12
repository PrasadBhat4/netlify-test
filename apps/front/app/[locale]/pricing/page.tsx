import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import Hero from '@/app/components/Common/Heroes/Pricing';
import Plans from '@/app/components/Common/Plans';
import OpenSource from '@/app/components/Pricing/OpenSource';
import Faq from '@/app/components/Pricing/Faq';
import Contact from '@/app/components/Common/Contact';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('pricing');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const PricingPage = async () => {
  const strapiData = await getStrapiData('pricing');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const plans = strapiData?.data?.attributes?.Plans;
  const faqs = strapiData?.data?.attributes?.Faqs;
  const openSourceProject = strapiData?.data?.attributes?.OpenSourceProject;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {plans && <Plans data={plans} />}
      {faqs && <Faq data={faqs} />}
      {openSourceProject && <OpenSource data={openSourceProject} />}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default PricingPage;
