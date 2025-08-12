import { Metadata, ResolvingMetadata } from 'next';
import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/TermsOfService';
import Contact from '@/app/components/Common/Contact';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import Container from '@/app/components/Common/Container';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('terms-of-service');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const TermsOfServicePage = async () => {
  const strapiData = await getStrapiData('terms-of-service');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const content = strapiData?.data?.attributes?.Content;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='mb-10 space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {content && (
        <Container className='flex justify-center'>
          <div className='w-full lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
            <Markdown className='markdown-tos'>{content}</Markdown>
          </div>
        </Container>
      )}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default TermsOfServicePage;
