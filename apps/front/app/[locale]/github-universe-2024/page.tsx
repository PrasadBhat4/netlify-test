/* eslint-disable no-irregular-whitespace */
import { Metadata, ResolvingMetadata } from 'next';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import Hero from '@/app/components/Common/Heroes/Event';
import Contact from '@/app/components/Common/Contact';
import EventMainCard from '@/app/components/Event/EventMainCard';
import EmbededCalendar from '@/app/components/Event/EmbededCalendar';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('gh-event-page');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const EventPage = async () => {
  const strapiData = await getStrapiData('gh-event-page');

  if (strapiData?.data === null) return null;
  const hero = strapiData?.data?.attributes?.Hero;
  const eventCard = strapiData?.data?.attributes?.EventCard;
  const calendarTitle = strapiData?.data?.attributes?.CalendarTitle;
  const calendarDescription = strapiData?.data?.attributes?.CalendarDescription;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      <Hero data={hero} />
      <EventMainCard data={eventCard} index={0} />
      <EmbededCalendar title={calendarTitle} description={calendarDescription} />
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default EventPage;
