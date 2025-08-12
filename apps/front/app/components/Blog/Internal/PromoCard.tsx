import { twMerge as tm } from 'tailwind-merge';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import { StrapiPromoCard } from '@/app/lib/types';

const PromoCard = ({ data, className = '' }: { data: StrapiPromoCard; className?: string }) => {
  return (
    <div
      className={tm(
        'w-full p-6 bg-cream-400 dark:bg-neutral-900 rounded-[1.25rem] font-heading text-neutral-900',
        className
      )}>
      <div className='flex items-center gap-3'>
        {data?.Image && (
          <div className='w-[20%]'>
            <StrapiImage
              src={data?.Image?.data?.attributes?.url}
              alt='hero background'
              width={44}
              height={44}
              className='object-cover'
            />
          </div>
        )}

        {data?.Title && (
          <div className='w-[80%]'>
            <h3 className='text-body-lg-xs  font-bold text-neutral-900 dark:text-neutral-0'>{data?.Title}</h3>
          </div>
        )}
      </div>

      <div className='space-y-3 mt-4'>
        {data?.Description1 && (
          <p className='text-xs  font-[400] text-neutral-900 dark:text-neutral-0'>{data?.Description1}</p>
        )}

        {data?.Description2 && <p className=' font-[600] text-neutral-900 dark:text-neutral-0'>{data?.Description2}</p>}
      </div>

      {data?.Button && (
        <div className='mt-4 '>
          <Button
            text={data.Button.Text}
            variant='secondary'
            href={data.Button.Url}
            isExternal={data.Button.isExternal}
            className='w-full md:w-auto py-2 h-12 !text-[14px]'
          />
        </div>
      )}
    </div>
  );
};

export default PromoCard;
