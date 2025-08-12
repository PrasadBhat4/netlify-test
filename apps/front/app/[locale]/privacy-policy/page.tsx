import Markdown from 'markdown-to-jsx';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import Contact from '@/app/components/Common/Contact';
import Container from '@/app/components/Common/Container';
import Hero from '@/app/components/Common/Heroes/TermsOfService';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('privacy-policy');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const PrivacyPolicyPage = async () => {
  const strapiData = await getStrapiData('privacy-policy');

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

export default PrivacyPolicyPage;
