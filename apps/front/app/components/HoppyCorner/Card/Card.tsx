import { twMerge as tm } from 'tailwind-merge';
import Image from 'next/image';
import ActionButton from '@/app/components/Common/ActionButton';
import { Creatives, StrapiButton } from '@/app/lib/types';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Links from '@/app/components/Footer/Socials';

interface Props {
  data: Creatives;
  className?: string;
  Button?: StrapiButton;
  handleClick?: () => void;
  Socials?: StrapiButton[];
}
const Card = ({ data, className = '', handleClick, Button, Socials }: Readonly<Props>) => {
  return (
    <div
      className={tm(
        'p-7  md:px-16 group relative  bg-cream-400 max-w-[50rem]  dark:bg-neutral-900 rounded-[1.25rem] font-heading text-neutral-900  w-full m-auto ',
        className
      )}>
      <div className='flex flex-col-reverse md:flex-row  gap-6  items-center '>
        <div className=' space-y-4'>
          {data?.Slogan && (
            <p className='text-body-md md:text-body-xl text-center md:text-start font-[500] max-w-[25rem] text-balance dark:text-neutral-0 '>
              {data?.Slogan}
            </p>
          )}
          {Button && (
            <ActionButton
              text={Button?.Text}
              variant='secondary'
              className='w-full md:w-auto no-underline py-2 !h-12 '
              handleClick={handleClick}
              reloadIconPosition='right'
            />
          )}
        </div>
        {data?.CreativeImage?.data && (
          <StrapiImage
            src={data?.CreativeImage?.data?.attributes?.url}
            alt={data?.CreativeImage?.data?.attributes?.alternativeText || 'Hoppy Variant'}
            height={250}
            width={160}
            className='object-cover h-[17.4rem] w-fit'
          />
        )}
      </div>
      {Socials && Socials.length > 0 && (
        <div
          role='button'
          tabIndex={0}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
          className='absolute top-3 md:top-8 flex flex-col right-4 md:right-7   gap-2  translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10'>
          <Links links={Socials} className='w-7 h-7' />
        </div>
      )}
      <div className='absolute top-2 md:top-7 flex flex-col right-4 md:right-7   gap-2 opacity-100 translate-y-2 group-hover:opacity-0 group-hover:translate-y-0 transition-all duration-300 ease-in-out '>
        <Image src='/images/shapes/share.png' alt='joinus circle' height={24} width={24} className='dark:invert' />
      </div>
    </div>
  );
};

export default Card;
