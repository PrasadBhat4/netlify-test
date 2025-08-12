import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col lg:flex-row items-center md:items-end lg:items-start xl:items-end justify-between px-6 py-14 md:p-20 lg:px-30 lg:pl-[7.0625rem] lg:py-30 bg-cream-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
      <div className='flex flex-col items-center md:items-start lg:max-w-[45rem] xl:max-w-[45.6875rem]'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
        {data.Title && (
          <h1 className='max-w-[38.25rem] mt-6 font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl'>
            {data.Title}
          </h1>
        )}
        {data?.Image?.data?.attributes?.url && (
          <div className='mt-6 md:hidden'>
            <StrapiImage
              src={data?.Image?.data?.attributes?.url}
              alt='hero background'
              width={255}
              height={198}
              className='object-cover'
            />
          </div>
        )}
        {data.BackedBy && (
          <p className='mt-10 font-semibold text-center md:mt-7 lg:mt-14 md:text-start text-body-md-sm lg:text-body-md'>
            {data.BackedBy}
          </p>
        )}
        <div className='flex flex-col gap-10 items-center mt-6 md:flex-row md:gap-16 md:mt-10'>
          {data?.BackedByImages?.data?.map((image: any) => (
            <StrapiImage
              src={image?.attributes?.url}
              alt='backed'
              width={129}
              height={56}
              className='w-fit h-fit max-h-14 max-w-[8.0625rem] dark:hidden'
              key={image.id}
            />
          ))}
          {data?.BackedByImagesDark?.data?.map((image: any) => (
            <StrapiImage
              src={image?.attributes?.url}
              alt='backed'
              width={129}
              height={56}
              className='hidden dark:block w-fit h-fit max-h-14 max-w-[8.0625rem]'
              key={image.id}
            />
          ))}
        </div>
      </div>
      {data?.Image?.data?.attributes?.url && (
        <div className='mt-6 md:mt-16 lg:mt-0'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={580}
            height={450}
            className='hidden object-cover xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={424}
            height={318}
            className='hidden object-cover lg:max-xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={340}
            height={264}
            className='hidden object-cover md:max-lg:block'
          />
        </div>
      )}
    </div>
  </Container>
);

export default Hero;
