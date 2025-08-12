import StrapiImage from '@/app/components/Common/StrapiImage';
import Bullets from '@/app/components/Common/Bullets';

interface Props {
  data: any;
  className?: string;
}

const Hero = ({ data = {}, className = '' }: Readonly<Props>) => (
  <div
    className={`flex flex-col md:max-lg:flex-row md:max-lg:justify-between md:max-lg:gap-x-12 px-8 py-12 md:py-16 md:px-14 lg:p-20 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden ${className}`}>
    {data?.Image?.data?.attributes?.url && (
      <div>
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='hero background'
          width={120}
          height={120}
          className='hidden object-cover min-w-30 md:block'
        />
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='hero background'
          width={80}
          height={80}
          className='object-cover min-w-20 md:hidden'
        />
      </div>
    )}
    <div className='mt-6 md:mt-0 lg:mt-16'>
      {data?.Title && <h1 className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg'>{data?.Title}</h1>}
      {data?.Bullets && <Bullets items={data?.Bullets} className='mt-6 space-y-4 font-semibold' />}
    </div>
  </div>
);

export default Hero;
