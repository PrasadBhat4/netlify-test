import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import Hero from '@/app/components/Common/Heroes/AboutUs';
import Intro from '@/app/components/AboutUs/Intro';
import Team from '@/app/components/AboutUs/Team';
import JoinUs from '@/app/components/AboutUs/JoinUs';
import Contact from '@/app/components/Common/Contact';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('about-us');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const AboutUsPage = async () => {
  const strapiData = await getStrapiData('about-us');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const intro1 = strapiData?.data?.attributes?.Intro1;
  const intro2 = strapiData?.data?.attributes?.Intro2;
  const intro3 = strapiData?.data?.attributes?.Intro3;
  const intro = { intro1, intro2, intro3 };
  const team = strapiData?.data?.attributes?.Team;
  const advisors = strapiData?.data?.attributes?.Advisors;
  const members = { team, advisors };
  const joinUs = strapiData?.data?.attributes?.JoinUs;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {intro && <Intro data={intro} />}
      {members && <Team data={members} />}
      {joinUs && <JoinUs data={joinUs} />}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default AboutUsPage;
