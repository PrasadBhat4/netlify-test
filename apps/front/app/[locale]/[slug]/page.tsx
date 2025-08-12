import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/Solutions';
import SimpleHero from '@/app/components/Common/Heroes/SimpleHero';
import GetStarted from '@/app/components/Home/GetStarted';
import Contact from '@/app/components/Common/Contact';
import Security from '@/app/components/TrustCenter/Security';
import HowItWorks from '@/app/components/Home/HowItWorks';
import PrivacyPolicy from '@/app/components/TrustCenter/PrivacyPolicy';
import TrustCenter from '@/app/components/Common/TrustCenter';
import MarkdownCard from '@/app/components/Common/MarkdownCard';
import CustomFeatures from '@/app/components/Home/Features/CustomFeatures';
import { parseMetadata } from '@/app/lib/utils';
import HsEmbededCalendar from '@/app/components/Common/HsEmbededCalendar';
import Plans from '@/app/components/Common/Plans';
import Stats from '@/app/components/Home/Stats';
import Testimonials from '@/app/components/Common/Testimonials';
import Customers from '@/app/components/Common/CustomersEvents';
import FeaturesSlider from '@/app/components/Enterprise/FeatureSlider';
import HeroCardlist from '@/app/components/Enterprise/HeroCardList';
import HeroEnterpriseWithVideo from '@/app/components/Common/Heroes/EnterpriseWithVideo';
import FaqPricing from '@/app/components/Pricing/Faq';
import Faq from '@/app/components/Solution/Faq';
import FeatureGrid from '@/app/components/Common/Features/FeatureGrid';
import { routing } from '@/i18n/routing';
import { getStrapiDataForStaticPages, getCollectionPageMetadata } from '@/app/actions/getStrapiDataForStaticPages';

interface SolutionsPageParams {
  locale: string;
  slug: string;
}

const BodyComponents: Record<string, React.ComponentType<{ data: any }>> = {
  'layout.hero': Hero,
  'layout.custom-features-section': CustomFeatures,
  'layout.get-started': GetStarted,
  'layout.contact-us-section': Contact,
  'layout.alternated-content': Security,
  'layout.how-it-works-section': HowItWorks,
  'layout.trust-section': TrustCenter,
  'layout.privacy-policy-section': PrivacyPolicy,
  'layout.markdown-card-section': ({ data }: { data: any }) => {
    return (
      <div className='flex justify-center'>
        <MarkdownCard data={data} />
      </div>
    );
  },
  'layout.simple-hero': SimpleHero,
  'layout.hs-embeded-calendar': HsEmbededCalendar,
  'layout.metrics-section': Stats,
  'layout.plans-section': Plans,
  'layout.testimonials': ({ data }: { data: any }) => {
    return <Testimonials data={data} />;
  },
  'layout.customers-section': ({ data }: { data: any }) => {
    return (
      <div className='my-10 space-y-16 md:space-y-30 lg:space-y-38'>
        <Customers data={data} />
      </div>
    );
  },
  'layout.collapsible-boxes-section': FeaturesSlider,
  'layout.hero-cards-section': ({ data }: { data: any }) => {
    return <HeroCardlist data={data.Cards} className='mx-auto w-full lg:p-0 lg:max-w-[69.75rem] xl:max-w-[87.25rem]' />;
  },
  'layout.enterprise-hero-with-video': HeroEnterpriseWithVideo,
  'layout.faq': ({ data }: { data: any }) => {
    if (data.SplitIntoTwoHalves) return <FaqPricing data={data} />;
    return <Faq data={data} />;
  },
  'layout.feature-grid-section': ({ data }: { data: any }) => {
    return <FeatureGrid data={data} />;
  },
};

export async function generateStaticParams() {
  const locales = routing?.locales || ['en', 'ja'];
  const staticParams = await Promise.all(
    locales.map(async locale => {
      const strapiData = await getStrapiDataForStaticPages(locale, 'solutions', undefined);
      return (strapiData.data || []).map((page: { attributes: { slug: string } }) => ({
        locale,
        slug: page.attributes?.slug,
      }));
    })
  );
  return staticParams.flat();
}

export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const pageMetadata = await getCollectionPageMetadata('solutions', params.slug, params.locale);
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const SolutionsPage = async ({ params }: { params: SolutionsPageParams }) => {
  const { slug, locale } = params;
  const strapiData = await getStrapiDataForStaticPages(locale, 'solutions', slug);
  if (!strapiData?.data?.[0]) notFound();

  const sections = strapiData?.data?.[0]?.attributes?.Sections;
  return (
    <div className='pb-[40px]'>
      {sections?.map((section: { id: string; __component: string }) => {
        // eslint-disable-next-line no-underscore-dangle
        const Component = BodyComponents[section.__component];
        if (!Component) return null;
        return (
          <div key={section.id} className='my-16 first:mt-0 last:mb-0'>
            <Component data={section} />
          </div>
        );
      })}
    </div>
  );
};

export default SolutionsPage;
