import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/Contact/HelpDesk';
import CardList from '@/app/components/HelpDesk/CardList';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('help-desk');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const HelpDeskPage = async () => {
  const strapiData = await getStrapiData('help-desk');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const cardList = strapiData?.data?.attributes?.Cards;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {cardList && <CardList data={cardList} className='w-full lg:p-0 lg:max-w-[69.75rem] xl:max-w-[87.25rem]' />}
      <div />
    </div>
  );
};

export default HelpDeskPage;
