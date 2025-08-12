import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/TrustCenter';
import FormContainer from '@/app/components/Common/Form/components/FormContainer';
import Form from '@/app/components/Common/Form/GDPR';
import Container from '@/app/components/Common/Container';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import FormSidebar from '@/app/components/Common/Form/components/FormSidebar';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('trust-center-gdpr');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const TrustCenterGDPRPage = async () => {
  const strapiData = await getStrapiData('trust-center-gdpr');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const sidebar = strapiData?.data?.attributes?.FormSideSection;
  const form = strapiData?.data?.attributes?.Form;
  const success = strapiData?.data?.attributes?.Success;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      <Container className='flex flex-col gap-[4.5rem] lg:flex-row lg:justify-between lg:p-0 lg:max-w-[69.75rem] xl:max-w-[87.25rem] !mb-16 md:!mb-30 lg:!mb-38'>
        <FormSidebar
          title={sidebar?.Title}
          titleClassName='text-heading-sm-sm lg:text-heading-sm'
          description={sidebar?.Description}
          descriptionClassName='text-body-md-sm md:text-body-md mt-4'
          listTitle={sidebar?.ListTitle}
          bullets={sidebar?.Bullets}
          bulletsClassName='mt-32'
          className='lg:max-w-[20rem] xl:max-w-[31.4375rem]'
        />
        {form && (
          <FormContainer className='p-6 md:p-12 !rounded-[1.25rem]'>
            <Form data={form} success={success} />
          </FormContainer>
        )}
      </Container>
    </div>
  );
};

export default TrustCenterGDPRPage;
