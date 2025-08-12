import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import ShapeImage from '@/app/components/Common/ShapeImage';
import { StrapiGetStarted } from '@/app/lib/types';
import { formatString } from '@/app/lib/utils';

interface Props {
  data: StrapiGetStarted;
}

const GetStarted = ({ data }: Readonly<Props>) => (
  <Container>
    <div
      className='
      relative
      flex flex-col
      gap-y-10 lg:gap-y-[3.25rem] xl:gap-y-16
      px-4 py-10 md:px-8 md:pt-20 md:pb-[3.25rem] lg:p-[3.25rem] lg:pt-20 lg:pb-[3.375rem] xl:p-16 xl:pt-[6.25rem]
     bg-neutral-900 
      rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[5rem] xl:rounded-[5.5rem]
    '>
      <div className='absolute -z-10 right-[3.7rem] top-[-3.7rem] md:right-[6.5rem] md:top-[-5.5rem] lg:right-[10.5rem] lg:top-[-7.5rem] md:max-w-[4.1875rem] md:max-h-[8.5rem] lg:max-w-[5.625rem] lg:max-h-[11.4375rem]'>
        <ShapeImage shape='halfmoon-1' h={183} w={90} className='hidden w-full h-full rotate-90 lg:block' />
        <ShapeImage shape='halfmoon-1' h={136} w={67} className='hidden w-full h-full rotate-90 md:max-lg:block' />
        <ShapeImage shape='halfmoon-1' h={87} w={43} className='w-full h-full rotate-90 md:hidden' />
      </div>
      <h2
        className='px-6 text-center font-bold font-heading text-heading-sm-sm md:text-heading-lg-sm lg:text-heading-md  text-neutral-0  md:px-11 lg:px-16 xl:px-14'
        dangerouslySetInnerHTML={{
          __html: formatString(data.Title, 'last', undefined, 'color'),
        }}
      />

      {data.Image?.data?.attributes?.url && (
        <>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={1552}
            height={723}
            className='hidden object-cover h-full xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={1236}
            height={576}
            className='hidden object-cover h-full lg:max-xl:block'
          />
          <StrapiImage
            src={data?.ImageSM?.data?.attributes?.url}
            alt='get started bg'
            width={705}
            height={329}
            className='hidden object-cover h-full md:max-lg:block'
          />
          <StrapiImage
            src={data?.ImageSM?.data?.attributes?.url}
            alt='get started bg'
            width={313}
            height={146}
            className='object-cover md:hidden'
          />
        </>
      )}
    </div>
  </Container>
);

export default GetStarted;
