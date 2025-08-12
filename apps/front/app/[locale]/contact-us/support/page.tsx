import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/app/components/Common/Container';
import Hero from '@/app/components/Common/Heroes/Contact/Support';
import FormContainer from '@/app/components/Common/Form/components/FormContainer';
import Form from '@/app/components/Common/Form/Support';
import ShapeImage from '@/app/components/Common/ShapeImage';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('support');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const SalesPage = async () => {
  const strapiData = await getStrapiData('support');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const form = strapiData?.data?.attributes?.Form;
  const success = strapiData?.data?.attributes?.Success;

  return (
    <Container className='flex relative flex-col gap-16 my-16 lg:flex-row md:gap-12 lg:gap-6 md:max-lg:my-12 lg:mt-20 xl:mt-38'>
      {hero && <Hero data={hero} />}
      {form && (
        <FormContainer>
          <Form data={form} success={success} />
        </FormContainer>
      )}
      <div className='hidden relative -left-14 md:max-lg:block'>
        <ShapeImage shape='double-halfmoon1' h={144} w={141} />
      </div>
    </Container>
  );
};

export default SalesPage;
