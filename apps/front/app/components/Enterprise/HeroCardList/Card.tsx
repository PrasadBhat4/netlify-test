import Link from 'next/link';
import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  card: {
    Icon: { data: { attributes: { url: string; alternativeText: string } } };
    Title: string;
    Button: { Text: string; isExternal: boolean; id: string; Url: string };
  };
  className?: string;
}

const Card = ({ card, className }: Readonly<Props>) => {
  if (!card) return null;
  if (!card.Button) return null;

  return (
    <Link className={className} href={card.Button?.Url} target={card?.Button?.isExternal ? '_blank' : '_self'}>
      <div className='group flex flex-col justify-between md:max-lg:justify-start md:max-lg:gap-x-6 p-6 md:py-8 md:pt-5 lg:pt-8 xl:p-10 w-full min-w-full md:min-w-[15.0625rem] lg:min-w-[22.25rem] xl:min-w-[28.0625rem] min-h-[10.75rem] md:max-lg:min-h-[17.25rem] lg:min-h-[13.75rem] xl:min-h-[14.75rem]  bg-neutral-0 dark:bg-neutral-900 border border-cream-600 dark:border-neutral-800 rounded-[1.25rem] cursor-pointer hover:shadow-trust-card'>
        <StrapiImage
          src={card?.Icon?.data?.attributes?.url}
          alt={card?.Icon?.data?.attributes?.alternativeText}
          width={80}
          height={80}
          className='max-h-[5rem] max-w-[5rem]'
        />
        <div className='flex justify-between items-start md:max-lg:flex-col md:max-lg:items-end md:max-lg:h-full'>
          <p className='mt-3 font-bold font-heading text-subtitle-sm lg:text-subtitle max-w-[18.5625rem] min-h-16'>
            {card?.Title}
          </p>
          <div className='inline-block mt-auto'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='inline-block mt-auto w-8 h-8 text-neutral-400 dark:text-neutral-400 group-hover:text-neutral-400 group-hover:dark:text-neutral-0'>
              <path
                d='M20.2896 11.7569C16.0056 11.7569 12.5327 8.28404 12.5327 4'
                stroke='currentColor'
                strokeWidth='1.55139'
              />
              <path
                d='M20.2896 11.757C16.0056 11.757 12.5327 15.2299 12.5327 19.5139'
                stroke='currentColor'
                strokeWidth='1.55139'
              />
              <path d='M17.9625 11.7568L4 11.7568' stroke='currentColor' strokeWidth='1.55139' />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
