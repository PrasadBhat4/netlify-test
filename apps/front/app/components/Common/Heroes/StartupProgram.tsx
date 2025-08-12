import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col lg:flex-row items-center md:items-end lg:items-center xl:items-end justify-between px-6 py-16 md:p-20 lg:pl-[7.125rem] lg:pr-30 lg:py-30 xl:px-30 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
      <div className='flex flex-col items-center md:items-start lg:max-w-[47.875rem] xl:max-w-[77.875rem]'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
        {data.Title && (
          <h1 className='mt-6 font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl'>
            {data.Title}
          </h1>
        )}
        {data.Description && (
          <h2 className='mt-6 text-center md:text-start text-body-xl-sm md:text-subtitle'>{data.Description}</h2>
        )}
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 lg:mt-0'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={200}
            height={318}
            className='hidden object-cover lg:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={164}
            height={248}
            className='object-cover lg:hidden'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
