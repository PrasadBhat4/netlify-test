import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import Hero from '@/app/components/Common/Heroes/BrandGuidelines';
import CardList from '@/app/components/BrandGuidelines/CardList';
import LogoList from '@/app/components/BrandGuidelines/LogoList';
import ColorPaletteList from '@/app/components/BrandGuidelines/ColorPaletteList';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('brand-guideline');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const BrandGuidelinesPage = async () => {
  const strapiData = await getStrapiData('brand-guideline');
  if (strapiData?.data === null) notFound();
  const hero = strapiData?.data?.attributes?.Hero;
  const cards = strapiData?.data?.attributes?.AssetLayout?.AssetCard;
  const titleSection = strapiData?.data?.attributes?.TitleSection;
  const logos = strapiData?.data?.attributes?.LogoLayout;
  const colorPalette = strapiData?.data?.attributes?.ColorPalette;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {cards && <CardList cards={cards} titleSection={titleSection} />}
      {logos && <LogoList logos={logos} />}
      {colorPalette && <ColorPaletteList colorPalette={colorPalette} />}
    </div>
  );
};

export default BrandGuidelinesPage;
