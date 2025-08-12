import StrapiImage from '@/app/components/Common/StrapiImage';
import { formatString } from '@/app/lib/utils';
import Tooltip from './Tooltip';

interface Props {
  data: any;
  className?: string;
}

const Customers = ({ data = {} }: Readonly<Props>) => {
  return (
    <div className='flex flex-col items-center'>
      <h2
        className='font-medium text-center font-heading text-heading-sm-sm text-neutral-900 dark:text-neutral-0'
        dangerouslySetInnerHTML={{
          __html: formatString(data.Title, 2, data.Title.length, 'color'),
        }}
      />
      <div
        className={`flex flex-wrap items-center justify-center mt-5 ${
          data?.Grayscale ? 'grayscale brightness-50' : ''
        } max-w-[31.25rem] md:max-w-[46.25rem] lg:max-w-full`}>
        <div
          className={`flex-wrap  items-center justify-center flex  ${
            data?.CustomersDark?.length > 0 ? 'dark:hidden' : ''
          } ${data?.Customers?.length > 7 ? '' : 'md:gap-x-10 lg:md:gap-x-10'} ${
            data?.Customers?.length > 7 ? '' : 'md:flex-nowrap lg:flex-nowrap'
          }`}>
          {data?.Customers.map((item: any) => (
            <div
              className='flex relative items-center my-3 gap-x-4 basis-1/3 md:basis-1/6 min-h-10 max-h-10 md:min-h-20 md:max-h-20 lg:min-h-[8.75rem] lg:max-h-[8.75rem]'
              key={item.id}>
              <StrapiImage
                src={item?.Image?.data?.attributes?.url}
                width={145}
                height={60}
                alt={item?.Image?.data?.attributes?.alternativeText}
                className='hidden object-contain object-center m-auto peer lg:block'
              />
              <StrapiImage
                src={item?.Image?.data?.attributes?.url}
                width={102}
                height={42}
                alt={item?.Image?.data?.attributes?.alternativeText}
                className='hidden object-contain object-center m-auto peer md:max-lg:block'
              />
              <StrapiImage
                src={item?.Image?.data?.attributes?.url}
                width={97}
                height={40}
                alt={item?.Image?.data?.attributes?.alternativeText}
                className='object-contain object-center m-auto peer md:hidden'
              />
              <Tooltip text={item.Text} />
            </div>
          ))}
        </div>
        {data?.CustomersDark?.length > 0 && (
          <div
            className={`hidden  dark:flex flex-wrap items-center justify-center ${
              data?.CustomersDark?.length > 7 ? '' : 'md:gap-x-10 lg:md:gap-x-10'
            } ${data?.CustomersDark?.length > 7 ? '' : 'md:flex-nowrap lg:flex-nowrap'}`}>
            {data?.CustomersDark?.map((item: any) => (
              <div
                className='flex relative items-center my-3 gap-x-4 basis-1/3 md:basis-1/6 min-h-10 max-h-10 md:min-h-20 md:max-h-20 lg:min-h-[8.75rem] lg:max-h-[8.75rem]'
                key={item.id}>
                <StrapiImage
                  src={item?.Image?.data?.attributes?.url}
                  width={145}
                  height={60}
                  alt={item?.Image?.data?.attributes?.alternativeText}
                  className='hidden object-contain object-center m-auto peer lg:block'
                />
                <StrapiImage
                  src={item?.Image?.data?.attributes?.url}
                  width={102}
                  height={42}
                  alt={item?.Image?.data?.attributes?.alternativeText}
                  className='hidden object-contain object-center m-auto peer md:max-lg:block'
                />
                <StrapiImage
                  src={item?.Image?.data?.attributes?.url}
                  width={97}
                  height={40}
                  alt={item?.Image?.data?.attributes?.alternativeText}
                  className='object-contain object-center m-auto peer md:hidden'
                />
                <Tooltip text={item.Text} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
