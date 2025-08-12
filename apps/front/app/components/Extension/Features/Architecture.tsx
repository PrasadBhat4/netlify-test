import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import { StrapiGetStarted } from '@/app/lib/types';

interface Props {
  data: StrapiGetStarted;
}

const Architecture = ({ data }: Readonly<Props>) => (
  <Container>
    {data?.Title && (
      <h2 className='px-6 text-center font-bold font-heading text-heading-sm-sm md:text-heading-lg-sm lg:text-heading-md dark:text-neutral-0 text-black md:px-11 lg:px-16 xl:px-14 mb-9'>
        {data.Title}
      </h2>
    )}

    {data?.Image?.data?.attributes?.url && (
      <div
        className={`${
          data?.ImageDark?.data ? 'dark:hidden' : ''
        } rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[5rem] xl:rounded-[5.5rem] flex justify-center items-center`}>
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
          width={413}
          height={146}
          className='object-cover md:hidden'
        />
      </div>
    )}
    {data?.ImageDark?.data?.attributes?.url && (
      <div className='hidden dark:flex dark:justify-center dark:items-center'>
        <StrapiImage
          src={data?.ImageDark?.data?.attributes?.url}
          alt='get started bg'
          width={1552}
          height={723}
          className='hidden object-cover h-full xl:block'
        />
        <StrapiImage
          src={data?.ImageDark?.data?.attributes?.url}
          alt='get started bg'
          width={1236}
          height={576}
          className='hidden object-cover h-full lg:max-xl:block'
        />
        <StrapiImage
          src={data?.ImageDarkSM?.data?.attributes?.url}
          alt='get started bg'
          width={705}
          height={329}
          className='hidden object-cover h-full md:max-lg:block'
        />
        <StrapiImage
          src={data?.ImageDarkSM?.data?.attributes?.url}
          alt='get started bg'
          width={313}
          height={146}
          className='object-cover md:hidden'
        />
      </div>
    )}
  </Container>
);

export default Architecture;
