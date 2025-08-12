import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';
import Hero from '@/app/components/Common/Heroes/StartupProgram';
import Stats from '@/app/components/Home/Stats';
import Customers from '@/app/components/Common/Customers';
import FormContainer from '@/app/components/Common/Form/components/FormContainer';
import FormSidebar from '@/app/components/Common/Form/components/FormSidebar';
import Form from '@/app/components/Common/Form/StartupProgram';
import Contact from '@/app/components/Common/Contact';
import Container from '@/app/components/Common/Container';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('startup-program');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const StartupProgramPage = async () => {
  const strapiData = await getStrapiData('startup-program');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const stats = strapiData?.data?.attributes?.Stats;
  const customers = strapiData?.data?.attributes?.Customers;
  const sidebar = strapiData?.data?.attributes?.FormSideSection;
  const form = strapiData?.data?.attributes?.Form;
  const success = strapiData?.data?.attributes?.Success;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-12 lg:space-y-38'>
      {hero && <Hero data={hero} />}

      {stats && <Stats data={stats} className='mt-0' />}
      {customers && <Customers data={customers} />}
      <Container className='flex flex-col gap-8 lg:flex-row lg:justify-between lg:p-0 lg:max-w-[79.75rem] xl:max-w-[97.25rem]'>
        <FormSidebar
          title={sidebar?.Title}
          description={sidebar?.Description}
          listTitle={sidebar?.ListTitle}
          bullets={sidebar?.Bullets}
          titleClassName='max-w-[25rem]'
          highlightedTitle
          className='flex flex-col px-8 py-12 md:py-16 md:px-14 lg:p-20 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden lg:max-w-[50%]'
        />
        {form && (
          <FormContainer className='p-6 md:p-12 rounded-[2rem] md:rounded-[5rem]'>
            <Form data={form} success={success} />
          </FormContainer>
        )}
      </Container>
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default StartupProgramPage;
