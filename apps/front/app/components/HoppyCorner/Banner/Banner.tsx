import { twMerge as tm } from 'tailwind-merge';
import Button from '@/app/components/Common/Button';
import { BannerProps } from '@/app/lib/types';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Form from '@/app/components/Blog/Internal/Form';

const BannerCard = ({ data, className = '' }: BannerProps) => {
  return (
    <div
      className={tm(
        'px-6 bg-cream-400  dark:bg-neutral-900 rounded-[1.25rem] font-heading text-neutral-900  w-full mx-auto max-w-[69rem]',
        className
      )}>
      <div className='flex flex-col md:flex-row  md:gap-6 lg:gap-16 items-center'>
        {data?.Image && data?.ImagePositionLeft && (
          <div className='max-w-[25%]'>
            <StrapiImage
              src={data?.Image?.data?.attributes?.url}
              alt={data?.Image?.data?.attributes?.alternativeText || 'Hoppy Image '}
              height={250}
              width={250}
              className='object-cover hidden md:flex !my-4'
            />
          </div>
        )}
        <div className='flex-1 gap-6 flex flex-col py-5'>
          {data?.Title && (
            <h3 className='text-subtitle-sm dark:text-neutral-100 md:text-heading-md font-bold !m-0 '>{data?.Title}</h3>
          )}
          {data?.Description && (
            <p className='text-body-md  md:text-heading-h4 dark:text-neutral-100 pb-1'>{data?.Description}</p>
          )}
          {data?.email && <Form data={data?.email} className='md:w-auto w-full' />}
          {data?.Button && (
            <Button
              text={data?.Button?.Text}
              variant='secondary'
              href={data?.Button?.Url}
              isExternal={data?.Button?.isExternal}
              className='w-full md:w-auto no-underline py-2 !h-12'
            />
          )}
        </div>
        {data?.Image && !data.ImagePositionLeft && (
          <div className='max-w-[25%]'>
            <StrapiImage
              src={data?.Image?.data?.attributes?.url}
              alt={data?.Image?.data?.attributes?.alternativeText || 'Hoppy Image '}
              height={250}
              width={250}
              className='object-cover hidden md:flex !my-4'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCard;
