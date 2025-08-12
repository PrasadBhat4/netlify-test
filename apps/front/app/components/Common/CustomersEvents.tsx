import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiCustomer } from '@/app/lib/types';
import { formatString } from '@/app/lib/utils';
import Container from './Container';

interface Props {
  data: StrapiCustomer;
  className?: string;
}

const Customers = ({ data }: Readonly<Props>) => (
  <Container className='flex flex-col items-center'>
    <h2
      className='font-medium text-center font-heading text-heading-sm-sm text-neutral-900 dark:text-neutral-0'
      dangerouslySetInnerHTML={{
        __html: formatString(data?.Title, 2, data?.Title?.length, 'color'),
      }}
    />
    <div
      className={`flex flex-wrap items-center justify-center mt-5 ${
        data.Grayscale ? 'grayscale' : ''
      } max-w-[31.25rem] md:max-w-[46.25rem] lg:max-w-full w-full`}>
      {data?.Customers?.map((item: any) => (
        <div
          className='flex dark:hidden items-center my-3 gap-x-4 basis-1/3 md:basis-1/6 min-h-10 max-h-10 md:min-h-20 md:max-h-20 lg:min-h-[8.75rem] lg:max-h-[8.75rem]'
          key={item?.id}>
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={145}
            height={60}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='hidden object-contain object-center m-auto lg:block'
          />
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={102}
            height={42}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='hidden object-contain object-center m-auto md:max-lg:block'
          />
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={97}
            height={40}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='object-contain object-center m-auto md:hidden'
          />
        </div>
      ))}
      {data?.CustomersDark?.map((item: any) => (
        <div
          className='hidden dark:flex items-center my-3 gap-x-4 basis-1/3 md:basis-1/6 min-h-10 max-h-10 md:min-h-20 md:max-h-20 lg:min-h-[8.75rem] lg:max-h-[8.75rem]'
          key={item?.id}>
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={145}
            height={60}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='hidden object-contain object-center m-auto lg:block'
          />
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={102}
            height={42}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='hidden object-contain object-center m-auto md:max-lg:block'
          />
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={97}
            height={40}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='object-contain object-center m-auto md:hidden'
          />
        </div>
      ))}
    </div>
  </Container>
);

export default Customers;
