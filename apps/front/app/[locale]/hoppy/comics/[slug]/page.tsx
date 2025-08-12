import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { parseMetadata } from '@/app/lib/utils';
import { routing } from '@/i18n/routing';
import { getStrapiDataForStaticPages, getCollectionPageMetadata } from '@/app/actions/getStrapiDataForStaticPages';
// import PdfPreview from '@/app/components/Blog/PdfPreview';
import Hero from '@/app/components/HoppyCorner/Comic/Hero';
import BannerWrapper from '@/app/components/HoppyCorner/Banner/BannerWrapper';

const PdfPreview = dynamic(() => import('../../../../components/Blog/PdfPreview'), {
  ssr: false,
});

interface ComicPageParams {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const locales = routing?.locales || ['en', 'ja'];
  const staticParams = await Promise.all(
    locales.map(async locale => {
      const strapiData = await getStrapiDataForStaticPages(locale, 'comics', undefined);
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
  const pageMetadata = await getCollectionPageMetadata('comics', params.slug, params.locale);
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const ComicPage = async ({ params }: { params: ComicPageParams }) => {
  const { slug, locale } = params;
  const strapiData = await getStrapiDataForStaticPages(locale, 'comics', slug);
  if (!strapiData?.data?.[0]) notFound();
  const PdfUrl = strapiData?.data?.[0]?.attributes?.Pdf?.data?.attributes?.url;
  const heroData = strapiData?.data?.[0]?.attributes;
  const Banner = strapiData?.data?.[0]?.attributes?.Banner;
  const socials = strapiData?.data?.[0]?.attributes?.Socials;
  const socialLinks =
    socials?.length > 0 &&
    socials?.map((social: { Url: string }) => {
      return {
        ...social,
        Url: `${social.Url}${process.env.NEXT_PUBLIC_BASE_URL}/hoppy/comics/${slug}&text=${heroData?.title}&utm_source=hoppy_comic&utm_medium=web&utm_campaign=social_share_hoppy_comic`,
      };
    });
  return (
    <div className=' flex my-14 md:mt-0 md:mb-20  flex-col gap-10 md:gap-24'>
      {heroData && <Hero data={heroData} Socials={socialLinks} />}
      {PdfUrl && (
        <div className='mx-6 md:mx-0  max-h-[30rem]'>
          <PdfPreview PdfUrl={PdfUrl} />
        </div>
      )}
      {Banner && <BannerWrapper data={Banner} />}
    </div>
  );
};

export default ComicPage;
