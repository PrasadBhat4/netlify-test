import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col lg:flex-row items-center md:items-end lg:items-center xl:items-end justify-between px-6 py-16 md:p-20 lg:p-30 xl:p-20 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
      <div className='flex flex-col items-center md:items-start lg:max-xl:max-w-[29rem]'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
        {data?.Title && (
          <h1 className='mt-6 font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl'>
            {data?.Title}
          </h1>
        )}
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 lg:mt-0'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={200}
            height={200}
            className='hidden object-cover md:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={180}
            height={180}
            className='object-cover min-h-[11.25rem] md:hidden'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
