import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import ComicPage from '@/app/components/HoppyCorner/Comic/ComicPage';
import { comicsCollection } from '@/app/lib/queries';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('comics-landing');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const Comics = async () => {
  const strapiData = await getStrapiData('comics', undefined, true, comicsCollection);
  const strapiDataForComic = await getStrapiData('comics-landing');
  if (strapiData?.data === null) notFound();
  const comics = strapiData?.data;
  const Title = strapiDataForComic?.data?.attributes?.ComicPageTitle || '';
  return (
    <div className='space-y-16 my-14 md:my-6 md:space-y-30 lg:space-y-38'>
      <ComicPage data={comics} ComicPageTitle={Title} />
    </div>
  );
};

export default Comics;
