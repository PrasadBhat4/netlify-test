import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/Home';
import Stats from '@/app/components/Home/Stats';
import Customers from '@/app/components/Common/Customers';
import Features from '@/app/components/Home/Features';
import HowItWorks from '@/app/components/Home/HowItWorks';
import TrustCenter from '@/app/components/Common/TrustCenter';
import GetStarted from '@/app/components/Home/GetStarted';
import Testimonials from '@/app/components/Common/Testimonials';
import Contact from '@/app/components/Common/Contact';
import { getCollectionPageMetadata } from '@/app/actions/getStrapiDataForStaticPages';
import { parseMetadata } from '@/app/lib/utils';
import { getBootstrapData } from '@/utils/ide/getBootstrapData';
import { getStrapiDataForStaticPages } from '../actions/getStrapiDataForStaticPages';
import VariantTracker from '@/app/components/VariantTracker';

interface HomePageParams {
  locale: string;
}

export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const bootstrapData = await getBootstrapData();
  const homePageAbTest = (bootstrapData?.featureFlags as Record<string, any>)?.['home-page-ab-testing'] || 'control';

  const variant = homePageAbTest === 'home-page2' ? 'b' : 'a';

  const pageMetadata = await getCollectionPageMetadata('homepages', variant, params.locale);
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const HomePage = async ({ params }: { params: HomePageParams }) => {
  const { locale } = params;

  const bootstrapData = await getBootstrapData();
  const homePageAbTest = (bootstrapData?.featureFlags as Record<string, any>)?.['home-page-ab-testing'] || 'control';

  let variant = 'a';
  if (homePageAbTest === 'home-page2') {
    variant = 'b';
  }

  const strapiData = await getStrapiDataForStaticPages(locale, 'homepages', variant);

  if (!strapiData?.data?.[0]) {
    notFound();
  }
  const attributes = strapiData?.data[0]?.attributes || {};
  const hero = attributes?.Hero;
  const stats = attributes?.Stats;
  const customers = attributes?.Customers;
  const features = attributes?.Features;
  const howItWorks = attributes?.HowItWorks;
  const trustCenter = attributes?.Trust;
  const getStarted = attributes?.GetStarted;
  const testimonials = attributes?.Testimonials;
  const contact = attributes?.Contact;
  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-20'>
      <VariantTracker variant={variant} page='home' />
      {hero && <Hero data={hero} variant={variant} />}
      {stats && <Stats data={stats} />}
      <div>{customers && <Customers data={customers} />}</div>
      <div className='space-y-20 !mt-20'>
        <h1 className='flex justify-center  self-center font-bold font-heading text-heading-sm md:text-heading-lg-sm'>
          AI Code Reviews
        </h1>
        {features && <Features data={features} />}
      </div>
      {howItWorks && <HowItWorks data={howItWorks} />}
      {trustCenter && <TrustCenter data={trustCenter} />}
      {getStarted && <GetStarted data={getStarted} />}
      {testimonials && <Testimonials data={testimonials} />}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default HomePage;
