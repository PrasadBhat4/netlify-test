import Link from 'next/link';
import { twMerge as tm } from 'tailwind-merge';
import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  card: any;
  index: number;
  withWhiteBg?: boolean;
  withColoredShadow?: boolean;
  className?: string;
}

const Card = ({ card, index, withWhiteBg = false, withColoredShadow = false, className = '' }: Readonly<Props>) => {
  const coloredShadowClass = withColoredShadow ? 'hover:shadow-trust-card' : '';
  const withBgClass = withWhiteBg
    ? 'bg-neutral-0 dark:bg-neutral-800 border border-cream-600 dark:border-neutral-800'
    : '';

  return (
    <Link
      href={card?.Button?.Url}
      target={card?.Button?.isExternal ? '_blank' : '_self'}
      className='block w-full xl:min-w-[42.875rem]'>
      <div
        className={tm(
          'group flex flex-col justify-between md:max-lg:justify-start md:max-lg:gap-x-6 p-6 md:py-8 md:pt-5 lg:pt-8 xl:p-10 w-full md:max-w-[23.3rem] lg:max-w-[34.125rem] xl:max-w-[42.875rem] rounded-[1.25rem] cursor-pointer',
          withBgClass,
          coloredShadowClass,
          index > 1 && 'cursor-default',
          className
        )}>
        {card?.Icon?.data && (
          <StrapiImage
            src={card?.Icon?.data?.attributes?.url}
            alt={card?.Icon?.data?.attributes?.alternativeText || 'card image'}
            width={52}
            height={52}
            className='max-h-[3.25rem] max-w-[3.25rem]'
          />
        )}
        <div
          className={`flex items-start ${index > 1 ? 'flex-col' : 'flex-row'} justify-between mt-3 md:max-lg:h-full`}>
          <div className='flex flex-col'>
            {card?.Title && (
              <h2 className='font-bold font-heading text-heading-sm-sm lg:text-heading-sm'>{card?.Title}</h2>
            )}
            {card?.Description && (
              <p className='mt-3 text-body-md-sm lg:text-body-md min-h-[4.5rem]'>{card?.Description}</p>
            )}
          </div>
          {card?.Button?.Url && (
            <div className={`inline-flex cursor-pointer ${index > 1 ? 'mr-auto mt-6' : 'ml-auto mt-auto'}`}>
              {index > 1 && <span className='font-bold font-heading text-button peer'>{card?.Button?.Text}</span>}
              {card?.Button?.Url.includes('mailto') ? (
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className={`${
                    index > 1
                      ? 'w-6 h-6 text-orange-500 ml-4 peer-hover:text-neutral-900 dark:peer-hover:text-neutral-0'
                      : 'w-6 h-6 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-0'
                  }`}>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M4 5C3.44772 5 3 5.44772 3 6V6.45063L11.5032 11.854C11.6522 11.9468 11.8244 11.996 12 11.996C12.1756 11.996 12.3478 11.9468 12.4968 11.854C12.4976 11.8535 12.4983 11.853 12.4991 11.8526L21 6.45063V6C21 5.44771 20.5523 5 20 5H4ZM23 6.98317V6C23 4.34315 21.6569 3 20 3H4C2.34315 3 1 4.34315 1 6V6.98313C0.999832 6.99375 0.999832 7.00437 1 7.01499V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V7.01495C23.0002 7.00436 23.0002 6.99377 23 6.98317ZM21 8.82027L13.5609 13.5474C13.0931 13.8406 12.5521 13.996 12 13.996C11.4479 13.996 10.9069 13.8405 10.4391 13.5474L10.4337 13.544L3 8.82027V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V8.82027Z'
                    fill='currentColor'
                  />
                </svg>
              ) : (
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className={`${
                    index > 1
                      ? 'w-6 h-6 text-orange-500 ml-4 peer-hover:text-neutral-900 dark:peer-hover:text-neutral-0'
                      : 'w-6 h-6 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-0'
                  } ${index === 3 ? '-rotate-45' : 'rotate-0'}`}>
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
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
