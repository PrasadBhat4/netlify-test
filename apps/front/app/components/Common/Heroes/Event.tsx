import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col lg:flex-row items-center md:items-end lg:items-center xl:items-end justify-between px-6 py-16 md:p-20 lg:px-[7.0625rem] lg:py-[8.125rem] xl:p-20 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
      <div className='flex flex-col items-center md:items-start lg:max-w-[45rem] xl:max-w-[45.6875rem]'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
        {data.Title && (
          <h1 className='mt-6 font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl text-neutral-900 dark:text-neutral-0'>
            {data.Title}
          </h1>
        )}
        {data.Description && (
          <p className='mt-6 font-medium text-center lg:mt-4 xl:mt-6 font-heading md:text-start text-heading-sm-sm lg:text-heading-sm text-neutral-900 dark:text-neutral-0'>
            {data.Description}
          </p>
        )}
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 lg:mt-0'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={264}
            height={380}
            className='hidden object-cover xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={192}
            height={255}
            className='object-cover xl:hidden'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
