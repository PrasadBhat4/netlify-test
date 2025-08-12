import StrapiImage from '@/app/components/Common/StrapiImage';
import Bullets from '@/app/components/Common/Bullets';

interface Props {
  data: any;
}

const Hero = ({ data = {} }: Readonly<Props>) => (
  <div className='flex flex-col md:max-lg:justify-between md:max-lg:gap-x-12 px-8 py-6 md:py-16 md:px-14 lg:p-20 w-full lg:max-w-[34.125rem] xl:max-w-[51.75rem] bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
    {data?.Image?.data?.attributes?.url && (
      <div>
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='hero background'
          width={120}
          height={120}
          className='hidden object-cover md:block'
        />
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='hero background'
          width={80}
          height={80}
          className='object-cover md:hidden'
        />
      </div>
    )}
    <div className='mt-6'>
      {data?.Title && <h1 className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg'>{data?.Title}</h1>}
      {data?.Description && <p className='mt-6 text-body-lg-sm lg:text-body-lg'>{data?.Description}</p>}
      {data?.ListTitle && (
        <h3 className='mt-12 font-bold font-heading text-subtitle text-aqua-500'>{data?.ListTitle}</h3>
      )}
      {data?.Bullets && <Bullets items={data?.Bullets} className='mt-6 space-y-4 font-semibold' />}
    </div>
  </div>
);

export default Hero;
