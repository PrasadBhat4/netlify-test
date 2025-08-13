import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import Contact from '@/app/components/Common/Contact';
import Hero from '@/app/components/Common/Heroes/Customers';
import CaseStudies from '@/app/components/Customers/CaseStudies';
import Customers from '@/app/components/Customers/Customers';
import Impact from '@/app/components/Enterprise/Impact';
import Testimonials from '@/app/components/Common/Testimonials';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    const pageMetadata = await getPageMetadata('customer');
    const parentMetadata = await parent;
    return parseMetadata({ pageMetadata, parentMetadata });
  } catch (error) {
    // Fallback metadata when Strapi fails
    const parentMetadata = await parent;
    return parseMetadata({
      pageMetadata: {
        title: 'Our Customers | CodeRabbit',
        description:
          'Discover how leading teams use CodeRabbit AI to transform their code review process with intelligent, context-aware feedback.',
        og_title: 'Our Customers | CodeRabbit',
        og_description:
          'Discover how leading teams use CodeRabbit AI to transform their code review process with intelligent, context-aware feedback.',
        og_url: 'https://www.coderabbit.ai/customers',
        twitter_title: 'Our Customers | CodeRabbit',
        twitter_description:
          'Discover how leading teams use CodeRabbit AI to transform their code review process with intelligent, context-aware feedback.',
      } as any,
      parentMetadata,
    });
  }
}

const CustomersPage = async () => {
  const strapiData = await getStrapiData('customer');

  if (!strapiData?.data || !strapiData?.data?.attributes) {
    return notFound();
  }

  const hero = strapiData?.data?.attributes?.Hero;
  const cases = strapiData?.data?.attributes?.Cases;
  const customers = {
    Title: strapiData?.data?.attributes?.Title,
    Images: strapiData?.data?.attributes?.Images,
    ImagesDark: strapiData?.data?.attributes?.ImagesDark,
    Grayscale: strapiData?.data?.attributes?.Grayscale,
  };
  const impact = strapiData?.data?.attributes?.Impact;
  const testimonials = strapiData?.data?.attributes?.Testimonials;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {cases && <CaseStudies data={cases} />}
      {customers && <Customers data={customers} />}
      {impact && <Impact data={impact} />}
      <div className='!mt-32 md:!mt-60 lg:!mt-[10rem]'>{testimonials && <Testimonials data={testimonials} />}</div>
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default CustomersPage;
