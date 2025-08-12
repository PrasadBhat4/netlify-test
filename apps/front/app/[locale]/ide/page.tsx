import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Extension/Hero';
import HowItWorks from '@/app/components/Extension/HowItWorks';
import Contact from '@/app/components/Common/Contact';
import { parseMetadata } from '@/app/lib/utils';
import Stats from '@/app/components/Home/Stats';
import TrustCenter from '@/app/components/Common/TrustCenter';
import Plans from '@/app/components/Common/Plans';
import Features from '@/app/components/Home/Features';
import Customers from '@/app/components/Common/Customers';
import OpenSource from '@/app/components/Pricing/OpenSource';
import Faq from '@/app/components/Pricing/Faq';
import GetStarted from '@/app/components/Home/GetStarted';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Container from '@/app/components/Common/Container';
import Architecture from '@/app/components/Extension/Features/Architecture';
import Benifits from '@/app/components/Extension/Features/Features';
import { getStrapiDataForStaticPages, getCollectionPageMetadata } from '@/app/actions/getStrapiDataForStaticPages';
import { getBootstrapData } from '@/utils/ide/getBootstrapData';
import VariantTracker from '@/app/components/VariantTracker';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface IdePageParams {
  locale: string;
}

export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const pageMetadata = await getCollectionPageMetadata('ides', 'a', params.locale);
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const IdePage = async ({ params }: { params: IdePageParams }) => {
  const { locale } = params;

  const bootstrapData = await getBootstrapData();
  const abTestingFlag = bootstrapData?.featureFlags?.['ide-page-ab-testing'] || 'control';

  let variant = 'a';
  if (abTestingFlag === 'ide-b') {
    variant = 'b';
  }

  const strapiData = await getStrapiDataForStaticPages(locale, 'ides', variant);

  if (!strapiData?.data?.[0]) notFound();

  const attributes = strapiData.data[0]?.attributes;
  const hero = attributes?.Hero;
  const features = attributes?.Features;
  const howItWorks = attributes?.HowItWorks;
  const contact = attributes?.Contact;
  const stats = attributes?.Stats;
  const customers = attributes?.Customers;
  const trustCenter = attributes?.Trust;
  const openSourceProject = attributes?.OpenSourceProject;
  const plans = attributes?.Plans;
  const faqs = attributes?.Faqs;
  const Benefits = attributes?.BenefitsLayout;
  const SectionTitle = attributes?.SectionTitle;
  const SectionDescription = attributes?.SectionDescription;
  const getStarted = attributes?.GetStarted;
  const architecture = attributes?.Architecture;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38 mb-10'>
      <VariantTracker variant={variant} page='ide' />
      {hero && <Hero data={hero} variant={variant} />}
      {stats && <Stats data={stats} />}
      {customers && <Customers data={customers} className='md:hidden' />}
      {(SectionTitle || SectionDescription) && (
        <Container>
          <InnerContainer className='lg:max-xl:max-w-[68.25rem]'>
            {SectionTitle && (
              <h2 className='flex justify-center text-center !-mt-8 !-mb-8 font-bold font-heading text-heading-sm md:text-heading-md lg:text-heading-lg'>
                {SectionTitle}
              </h2>
            )}
            {SectionDescription && (
              <p className='flex justify-center text-center  !mt-12 !-mb-10 md:text-heading-h4 text-subtitle-sm'>
                {SectionDescription}
              </p>
            )}
          </InnerContainer>
        </Container>
      )}
      {Benefits && <Benifits data={Benefits} />}
      {features && <Features data={features} />}
      {architecture && <Architecture data={architecture} />}
      {contact && <Contact data={contact} />}
      {howItWorks && <HowItWorks data={howItWorks} />}
      {trustCenter && <TrustCenter data={trustCenter} />}
      {openSourceProject && <OpenSource data={openSourceProject} />}
      {plans && <Plans data={plans} />}
      {getStarted && <GetStarted data={getStarted} />}
      {faqs && <Faq data={faqs} />}
    </div>
  );
};

export default IdePage;
