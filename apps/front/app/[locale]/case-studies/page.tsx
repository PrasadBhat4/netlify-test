import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import { getCookieLocale } from '@/i18n/locale';
import CaseStudyClient from '@/app/components/CaseStudy/CaseStudyClient';
import { getStrapiDataForStaticPages } from '@/app/actions/getStrapiDataForStaticPages';
import GetStarted from '@/app/components/CaseStudy/GetStarted';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('case-study');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const CaseStudyPage = async () => {
  const caseStudyTitle = await getStrapiData('case-study');
  const locale = await getCookieLocale();
  const casesData = await getStrapiDataForStaticPages(locale, 'cases');
  if (!casesData?.data?.[0]) notFound();

  const caseHomes = casesData?.data;
  const heroTexts = caseStudyTitle?.data?.attributes;
  const getStarted = caseStudyTitle?.data?.attributes?.ContactBanner;
  const categories = caseStudyTitle?.data?.attributes?.categories;
  const stats = caseStudyTitle?.data?.attributes?.Stats;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38 my-12 md:my-20'>
      <CaseStudyClient heroTexts={heroTexts} categories={categories} stats={stats} initialPosts={caseHomes} />
      <GetStarted data={getStarted} />
    </div>
  );
};

export default CaseStudyPage;
