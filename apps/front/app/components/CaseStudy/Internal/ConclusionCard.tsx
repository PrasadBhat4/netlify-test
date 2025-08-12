import Image from 'next/image';
import { ConclusionProps } from '@/app/lib/types';

interface ConclusionCardProps {
  conclusion: ConclusionProps;
  isFirst: boolean;
}

const ConclusionCard = ({ conclusion, isFirst }: ConclusionCardProps) => {
  return (
    <div className='relative max-w-[24rem] md:max-w-[23rem] overflow-hidden rounded-2xl'>
      <div
        className={`p-6 py-8 font-bold text-body-md text-white ${
          isFirst
            ? 'bg-neutral-900 dark:bg-neutral-0 dark:text-neutral-900 text-neutral-0'
            : 'bg-gradient-to-r from-orange-500 to-pink-500'
        }`}>
        <p className='text-heading-h4 font-medium text-center'>{conclusion?.Title}</p>
      </div>
      <div
        className={`border-l border-r border-b rounded-b-2xl px-6 py-6 ${
          isFirst ? 'dark:border-neutral-0 border-neutral-900' : 'border-orange-500'
        }`}>
        <ul className='space-y-3'>
          {conclusion?.Bullets?.map(bullet => (
            <li key={bullet?.id} className='flex items-start gap-3'>
              {isFirst ? (
                <span className='mt-0.5 text-body-lg-xs'>•</span>
              ) : (
                <Image src='/images/icons/check.svg' alt='Arrow right' width={24} height={24} />
              )}
              <span className='text-gray-700 dark:text-neutral-300 text-body-lg-xs'>{bullet?.Text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConclusionCard;
