import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiHero } from '@/app/lib/types';
import { formatString } from '@/app/lib/utils';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col lg:flex-row items-center md:items-end lg:items-end xl:items-end justify-between  bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden'>
      <div className='flex flex-col items-center lg:items-start lg:max-w-[55rem] xl:max-w-[55.6875rem] md:py-20 md:pl-28 px-6 py-16'>
        {data.Title && (
          <h1
            className=' font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-md lg:text-heading-xl-sm max-h-[15.2rem] overflow-hidden'
            dangerouslySetInnerHTML={{
              __html: formatString(data.Title, 0, 0, 'color-bold'),
            }}
          />
        )}
        {data.Description && (
          <h2 className='mt-6  text-center lg:mt-4 xl:mt-6  md:text-start text-heading-h4 '>{data.Description}</h2>
        )}
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 lg:mt-0'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt={data?.Image?.data?.attributes?.alternativeText || 'Brand Guidelines Hero Image'}
            width={264}
            height={380}
            className='hidden object-cover md:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt={data?.Image?.data?.attributes?.alternativeText || 'Brand Guidelines Hero Image'}
            width={192}
            height={235}
            className='object-cover md:hidden'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
