import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col md:flex-row items-center xl:items-end justify-between px-6 py-16 md:p-20 lg:p-30 xl:p-20 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
      <div className='flex flex-col-reverse items-center md:items-start lg:max-xl:max-w-[29rem]'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} className='mt-6' /> : null}
        {data?.Title && (
          <h1 className='font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl'>
            {data?.Title}
          </h1>
        )}
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 lg:mt-0'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={120}
            height={120}
            className='hidden object-cover min-h-30 md:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={160}
            height={160}
            className='object-cover min-h-[10rem] md:hidden'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
