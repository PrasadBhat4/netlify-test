import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col lg:flex-row items-center md:items-end lg:items-center xl:items-end justify-between px-6 pt-16 pb-0 md:p-20 lg:p-30 xl:p-20 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
      <div className='flex flex-col items-center md:items-start lg:max-xl:max-w-[29rem]'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
        {data.Title && (
          <h1 className='mt-6 font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl'>
            {data.Title}
          </h1>
        )}
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 lg:mt-0'>
          <Image
            src={data?.Image?.data?.attributes?.url || ''}
            alt='hero background'
            width={430}
            height={345}
            loading='eager'
            className='object-cover w-[253px] h-[201px] md:w-[430px] md:h-[318px] xl:w-[417px] xl:h-[345px] min-h-[12.5625rem] md:min-h-0'
            sizes='(max-width: 767px) 253px, (max-width: 1279px) 430px, 417px'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
