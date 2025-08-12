import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import { formatString } from '@/app/lib/utils';

interface Props {
  data: any;
}

const Platform = ({ data = {} }: Readonly<Props>) => (
  <Container>
    <div className='flex flex-col items-center'>
      <h2
        className='font-bold text-center font-heading text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0 mb-[3.25rem] md:mb-16 lg:mb-[4.5rem]'
        dangerouslySetInnerHTML={{
          __html: formatString(data?.Title, 'last', undefined, 'color'),
        }}
      />

      <div>
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='get started bg'
          width={974}
          height={404}
          className='hidden object-cover h-full lg:block dark:hidden'
        />
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt='get started bg'
          width={772}
          height={320}
          className='hidden object-cover h-full md:max-lg:block dark:hidden'
        />
        <StrapiImage
          src={data?.ImageSM?.data?.attributes?.url}
          alt='get started bg'
          width={772}
          height={343}
          className='object-cover md:hidden dark:hidden'
        />
      </div>
      <div>
        <StrapiImage
          src={data?.ImageDark?.data?.attributes?.url}
          alt='get started bg'
          width={974}
          height={404}
          className='hidden object-cover h-full dark:lg:block'
        />
        <StrapiImage
          src={data?.ImageDark?.data?.attributes?.url}
          alt='get started bg'
          width={772}
          height={320}
          className='hidden object-cover h-full dark:md:max-lg:block'
        />
        <StrapiImage
          src={data?.ImageSMDark?.data?.attributes?.url}
          alt='get started bg'
          width={772}
          height={343}
          className='hidden object-cover dark:block md:hidden dark:md:hidden'
        />
      </div>
    </div>
  </Container>
);

export default Platform;
