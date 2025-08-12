import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/app/components/Common/Container';
import Hero from '@/app/components/Common/Heroes/Partnership';
import FormContainer from '@/app/components/Common/Form/components/FormContainer';
import Form from '@/app/components/Common/Form/Partnership';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('partnership');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const PartnershipPage = async () => {
  const strapiData = await getStrapiData('partnership');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const form = strapiData?.data?.attributes?.Form;
  const success = strapiData?.data?.attributes?.Success;

  return (
    <Container className='relative flex flex-col gap-16 my-16 lg:flex-row md:gap-12 lg:gap-6 md:max-lg:my-12 lg:mt-20 xl:my-38'>
      {hero && <Hero data={hero} />}
      {form && (
        <FormContainer>
          <Form data={form} success={success} />
        </FormContainer>
      )}
    </Container>
  );
};

export default PartnershipPage;
