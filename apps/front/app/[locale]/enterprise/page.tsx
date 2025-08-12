import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/Enterprise';
import HeroCardList from '@/app/components/Enterprise/HeroCardList';
import Stats from '@/app/components/Home/Stats';
import Customers from '@/app/components/Common/Customers';
import FeaturesSlider from '@/app/components/Enterprise/FeatureSlider';
import TrustCenter from '@/app/components/Common/TrustCenter';
import Security from '@/app/components/TrustCenter/Security';
import Platform from '@/app/components/Enterprise/Platform';
import Impact from '@/app/components/Enterprise/Impact';
import GetStarted from '@/app/components/Enterprise/GetStarted';
import Plans from '@/app/components/Common/Plans';
import Contact from '@/app/components/Common/Contact';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('enterprise');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const EnterprisePage = async () => {
  const strapiData = await getStrapiData('enterprise');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const heroCards = strapiData?.data?.attributes?.HeroCards;
  const stats = strapiData?.data?.attributes?.Stats;
  const customers = strapiData?.data?.attributes?.Customers;
  const features = strapiData?.data?.attributes?.Features;
  const security = strapiData?.data?.attributes?.Security;
  const platform = strapiData?.data?.attributes?.Platform;
  const getStarted = strapiData?.data?.attributes?.GetStarted;
  const secureDevelopment = strapiData?.data?.attributes?.SecureDevelopment;
  const impact = strapiData?.data?.attributes?.Impact;
  const plans = strapiData?.data?.attributes?.Plans;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {heroCards && (
        <HeroCardList data={heroCards} className='mx-auto w-full lg:p-0 lg:max-w-[69.75rem] xl:max-w-[87.25rem]' />
      )}
      <div>
        {customers && <Customers data={customers} />}
        {stats && <Stats data={stats} className='mt-20' />}
      </div>
      {features && <FeaturesSlider data={features} />}
      {security && <Security data={security} />}
      {platform && <Platform data={platform} />}
      {getStarted && <GetStarted data={getStarted} />}
      {secureDevelopment && <TrustCenter data={secureDevelopment} />}
      {impact && <Impact data={impact} />}
      {plans && (
        <Plans
          data={plans}
          className='mx-auto w-full lg:p-0 lg:max-w-[69.75rem] xl:max-w-[87.25rem] !mt-32 md:!mt-60 lg:!mt-[19rem]'
        />
      )}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default EnterprisePage;
