import Link from 'next/link';
import { twMerge as tm } from 'tailwind-merge';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import { CaseSummaryProps } from '@/app/lib/types';

const CaseSummary = ({ data, className }: { data: CaseSummaryProps; className?: string }) => {
  return (
    <div className={tm('space-y-6  bg-neutral-0 dark:bg-neutral-900 rounded-[1.5rem] p-6 max-w-[24rem]', className)}>
      <div className='flex items-center '>
        {data?.Logo?.data && (
          <StrapiImage
            src={data?.Logo?.data?.attributes?.url}
            alt={`${data?.Name} logo`}
            width={148}
            height={60}
            className='dark:hidden object-contain'
          />
        )}
        {data?.LogoDark?.data && (
          <StrapiImage
            src={data?.LogoDark?.data?.attributes?.url}
            alt={`${data?.Name} logo`}
            width={148}
            height={60}
            className='hidden dark:block object-contain'
          />
        )}
      </div>
      <div>
        {data?.Name && <h3 className='font-bold '>{data?.Name}</h3>}
        {data?.Location && <p>{data?.Location}</p>}
        {data?.WebAddress && (
          <Link href={data?.WebAddress} className=' underline text-aqua-500 font-semibold'>
            {data?.WebAddress}
          </Link>
        )}
      </div>
      <div className='space-y-3'>
        {data?.Pointers?.map(pointer => (
          <div key={pointer?.id} className='space-y-2'>
            {pointer?.Heading && <h4 className='font-semibold '>{pointer?.Heading}</h4>}
            {pointer?.Description && <p className='leading-relaxed'>{pointer?.Description}</p>}
          </div>
        ))}
      </div>

      {data?.Button && (
        <Button
          className='mt-4 md:inline-flex md:mt-0 !h-14 text-orange-500'
          text={data?.Button?.Text}
          variant='secondary'
          href={data?.Button?.Url}
          isExternal={data?.Button?.isExternal}
          arrowPosition='right'
        />
      )}
    </div>
  );
};

export default CaseSummary;
