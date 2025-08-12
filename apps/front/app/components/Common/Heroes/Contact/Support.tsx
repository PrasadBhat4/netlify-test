import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  data: any;
}

const Hero = ({ data = {} }: Readonly<Props>) => (
  <div className='flex flex-col md:max-lg:flex-row md:max-lg:justify-between md:max-lg:gap-x-12 px-8 py-12 md:py-16 md:px-14 lg:p-20 lg:max-w-[34.125rem] xl:max-w-[51.75rem] bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
    {data?.Image?.data?.attributes?.url && (
      <div>
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='hero background'
          width={120}
          height={120}
          className='hidden object-cover min-w-30 md:block'
          priority
        />
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='hero background'
          width={80}
          height={80}
          className='object-cover min-w-20 md:hidden'
          priority
        />
      </div>
    )}
    <div className='mt-6 md:mt-0 lg:mt-16'>
      {data?.Title && <h1 className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg'>{data?.Title}</h1>}
      {data?.Description && <p className='mt-6 text-body-lg-sm lg:text-body-lg'>{data?.Description} </p>}
    </div>
  </div>
);

export default Hero;
