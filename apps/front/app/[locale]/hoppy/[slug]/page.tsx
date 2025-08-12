import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { parseMetadata } from '@/app/lib/utils';
import { routing } from '@/i18n/routing';
import { getStrapiDataForStaticPages, getCollectionPageMetadata } from '@/app/actions/getStrapiDataForStaticPages';
import CreativeCard from '@/app/components/HoppyCorner/Card/CreativeCard';

interface ComicPageParams {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const locales = routing?.locales || ['en', 'ja'];
  const staticParams = await Promise.all(
    locales.map(async locale => {
      const strapiData = await getStrapiDataForStaticPages(locale, 'hoppyversions', undefined);
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
  const pageMetadata = await getCollectionPageMetadata('hoppyversions', params.slug, params.locale);
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const ComicPage = async ({ params }: { params: ComicPageParams }) => {
  const { slug, locale } = params;
  const strapiData = await getStrapiDataForStaticPages(locale, 'hoppyversions', slug);
  if (!strapiData?.data?.[0]) notFound();
  const VariantData = strapiData?.data?.[0]?.attributes;

  return (
    <div className=' mx-auto  mb-20 mt-10'>
      <CreativeCard post={VariantData} />
    </div>
  );
};

export default ComicPage;
