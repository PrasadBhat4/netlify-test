import { ComponentProps } from 'react';
import Link from 'next/link';

interface Props extends ComponentProps<'a'> {
  text: string;
  href: string;
  download?: string;
  isExternal?: boolean;
  withChevron?: boolean;
  isOpen?: boolean;
  isParent?: boolean;
  className?: string;
}

const LinkComponent = ({
  text,
  href,
  download,
  isExternal,
  withChevron = false,
  isOpen = false,
  isParent = false,
  className = '',
  ...props
}: Props) => {
  return (
    <Link
      href={href ?? '#'}
      {...(download ? { download } : {})}
      target={isExternal ? '_blank' : '_self'}
      className={`peer inline-flex items-center rounded-full gap-x-1 w-fit text-body-md md:text-body-md-sm text-neutral-900 dark:text-neutral-0 hover:text-pink-700 dark:hover:text-pink-700 focus:text-orange-500 focus:outline-orange-500 dark:focus:text-orange-500 dark:focus:outline-orange-500 focus:outline-offset-4 active:text-aqua-500 dark:active:text-aqua-500 transition-colors duration-300 ease-in-out ${className}`}
      scroll={!isParent}
      {...props}>
      {text}

      {withChevron && (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-4 h-4  peer-hover:text-pink-700 peer-focus:text-pink-600 peer-active:text-aqua-500 ${
            isOpen ? '-rotate-180' : ''
          } transition-rotate duration-300 ease-in-out`}>
          <path
            d='M6 9L12 15L18 9'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </Link>
  );
};
export default LinkComponent;
