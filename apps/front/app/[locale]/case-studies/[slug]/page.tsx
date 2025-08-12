import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { parseMetadata } from '@/app/lib/utils';
import { routing } from '@/i18n/routing';
import { getStrapiDataForStaticPages, getCollectionPageMetadata } from '@/app/actions/getStrapiDataForStaticPages';
import Home from '@/app/components/CaseStudy/Internal/CaseHome';
import Features from '@/app/components/CaseStudy/Internal/Features';
import CaseLayout from '@/app/components/CaseStudy/Internal/CaseLayout';
import Container from '@/app/components/Common/Container';
import GetStarted from '@/app/components/CaseStudy/GetStarted';

interface CaseStudyPageParams {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const locales = routing?.locales || ['en', 'ja'];
  const staticParams = await Promise.all(
    locales.map(async locale => {
      const strapiData = await getStrapiDataForStaticPages(locale, 'cases', undefined);
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
  const pageMetadata = await getCollectionPageMetadata('cases', params.slug, params.locale);
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const CaseStudy = async ({ params }: { params: CaseStudyPageParams }) => {
  const { slug, locale } = params;
  const strapiData = await getStrapiDataForStaticPages(locale, 'cases', slug);
  if (!strapiData?.data?.[0]) notFound();
  const home = strapiData?.data?.[0]?.attributes?.CaseHome;
  const caseSummary = strapiData?.data?.[0]?.attributes?.CaseSummary;
  const features = strapiData?.data?.[0]?.attributes?.Features;
  const Socials = strapiData?.data?.[0]?.attributes?.Socials;
  const ContactBanner = strapiData?.data?.[0]?.attributes?.ContactBanner;
  const sections = strapiData?.data?.[0]?.attributes?.Sections;

  return (
    <Container className='md:space-y-16 my-12 md:my-20'>
      {home && <Home data={home} />}
      {features && <Features data={features} />}
      {sections && (
        <CaseLayout
          caseSummary={caseSummary}
          sections={sections}
          metadata={{ socials: Socials, title: home?.CaseTitle, slug }}
        />
      )}
      <GetStarted className='md:pt-12' data={ContactBanner} />
    </Container>
  );
};

export default CaseStudy;
