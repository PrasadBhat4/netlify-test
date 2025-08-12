import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/HoppyCorner/Hero/Hero';
import { parseMetadata } from '@/app/lib/utils';
import { getStrapiData, getPageMetadata } from '@/app/actions/getStrapiData';
import Quote from '@/app/components/HoppyCorner/Quote/Quote';
import Comic from '@/app/components/HoppyCorner/Comic/Comic';
import Creatives from '@/app/components/HoppyCorner/Creatives/Creatives';
import BannerWrapper from '@/app/components/HoppyCorner/Banner/BannerWrapper';
import { hoppyversionsCollection } from '@/app/lib/queries';
import { Creatives as ICreatives } from '@/app/lib/types';

const BodyComponents: Record<string, React.ComponentType<{ data: any }>> = {
  'components.hoppy-hero': Hero,
  'layout.hoppy-mood': Quote,
  'layout.hoppy-comic-section': Comic,
  'layout.hoppy-fan-creatives': Creatives,
  'components.hoppy-banner': BannerWrapper,
};

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('hoppy-corner');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const HoppyCorner = async () => {
  const strapiData = await getStrapiData('hoppy-corner');
  const creativesStrapiData = await getStrapiData('hoppyversions', undefined, true, hoppyversionsCollection);
  const creativesData =
    creativesStrapiData?.data?.map((item: { id: number; attributes: ICreatives }) => ({
      id: item?.id,
      ...item?.attributes,
    })) ?? [];
  if (strapiData?.data === null) notFound();
  const sections = strapiData?.data?.attributes?.Sections;
  return (
    <div>
      {sections?.map((section: { id: string; __component: string }) => {
        // eslint-disable-next-line no-underscore-dangle
        const Component = BodyComponents[section.__component];
        if (!Component) return null;
        const mergedData =
          // eslint-disable-next-line no-underscore-dangle
          section.__component === 'layout.hoppy-fan-creatives' || section.__component === 'layout.hoppy-mood'
            ? { ...section, Creatives: creativesData }
            : section;

        return (
          <div key={section.id} className='my-20 first:mt-6 md:my-24 md:first:mt-6 '>
            <Component data={mergedData} />
          </div>
        );
      })}
    </div>
  );
};

export default HoppyCorner;
