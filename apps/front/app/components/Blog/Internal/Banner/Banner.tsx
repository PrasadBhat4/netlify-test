import { twMerge as tm } from 'tailwind-merge';
import Button from '@/app/components/Common/Button';
import { BannerProps } from '@/app/lib/types';
import Form from '../Form';
import StrapiImage from '@/app/components/Common/StrapiImage';

const BannerCard = ({ data, className = '' }: BannerProps) => {
  return (
    <div
      className={tm(
        'px-6 bg-cream-400  dark:bg-neutral-900 rounded-[1.25rem] font-heading text-neutral-900  w-full mx-auto',
        className
      )}>
      <div className='flex  md:flex-row  gap-6 lg:gap-16 items-center'>
        {data?.Image && data.ImagePositionLeft && (
          <div className='max-w-[25%]'>
            <StrapiImage
              src={data?.Image?.data?.attributes?.url}
              alt='hero background'
              height={250}
              width={250}
              className='object-cover hidden md:flex !my-4'
            />
          </div>
        )}

        <div className='flex-1 space-y-4 py-5'>
          <h2 className='text-subtitle-sm md:text-subtitle-sm font-bold !m-0'>{data?.Title}</h2>
          {data?.Description && (
            <p className='text-body-md text-balance md:text-body-md dark:text-neutral-100 '>{data?.Description}</p>
          )}

          {data?.email && (
            <div className=''>
              <Form data={data?.email} className='md:w-auto w-full' />
            </div>
          )}
          {data?.Button && (
            <div className=''>
              <Button
                text={data?.Button?.Text}
                variant='secondary'
                href={data?.Button?.Url}
                isExternal={data?.Button?.isExternal}
                className='w-full md:w-auto no-underline py-2 !h-12'
              />
            </div>
          )}
        </div>
        {data?.Image && !data.ImagePositionLeft && (
          <div className='w-[20%]'>
            <StrapiImage
              src={data?.Image?.data?.attributes?.url}
              alt='hero background'
              height={180}
              width={100}
              className='object-cover hidden md:flex !my-4'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCard;
