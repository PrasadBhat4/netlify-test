import Link from 'next/link';
import { twMerge as tm } from 'tailwind-merge';
import { ARROW_POSITION, ARROW_ROTATION } from '@/app/lib/constants';
import { ArrowPositionType, ArrowRotationType } from '@/app/lib/types';

interface Props {
  text: string;
  href: string;
  download?: string;
  variant?: 'primary' | 'secondary' | 'buttonLink';
  isExternal?: boolean;
  arrowPosition?: ArrowPositionType;
  arrowRotation?: ArrowRotationType;
  noScroll?: boolean;
  className?: string;
  overrideTextSize?: boolean;
  onClick?: () => void;
}

const primaryClass = `
    bg-orange-500 text-neutral-0 
    hover:bg-gradient-to-r from-orange-500 to-pink-500
    focus:bg-pink-600 
    focus:outline-pink-600 
    focus:outline-offset-4 
    active:bg-aqua-500 
    disabled:bg-neutral-100 
    disabled:text-neutral-400 
    disabled:pointer-events-none
  `;
const primaryIconClass = `
    text-neutral-900
    group-hover:text-neutral-0
    group-focus:text-neutral-0
    group-focus:text-neutral-0
    group-active:text-neutral-0
    group-disabled:text-neutral-400
  `;
const secondaryClass = `
    bg-transparent border-2 border-orange-500 
    dark:text-neutral-0
    hover:border-pink-600 
    dark:hover:border-pink-500 
    focus:text-pink-600 
    dark:focus:text-pink-500 
    focus:border-pink-600 
    dark:focus:border-pink-500 
    focus:outline-orange-400 
    focus:outline-offset-4 
    active:border-aqua-500 
    active:text-neutral-900 
    dark:active:text-neutral-0 
    disabled:border-neutral-400
    dark:disabled:border-neutral-200
    disabled:text-neutral-400 
    dark:disabled:text-neutral-200 
    disabled:pointer-events-none
  `;
const secondaryIconClass = `
    text-orange-500 
    dark:text-neutral-0
    group-hover:text-neutral-900 
    dark:group-hover:text-neutral-0 
    group-focus:text-pink-600 
    group-active:text-neutral-900 
    dark:group-active:text-neutral-0 
    group-disabled:text-neutral-400
    dark:group-disabled:text-neutral-200
  `;
const buttonLinkClass = `
    h-auto
    p-0
    text-neutral-900
    dark:text-neutral-0
    hover:text-pink-600  
    focus:text-neutral-900 
    dark:focus:text-neutral-0 
    focus:outline-orange-500 
    active:bg-transparent
    active:text-aqua-500
    disabled:text-neutral-400
    dark:disabled:text-neutral-200
  `;
const buttonLinkIconClass = `
    text-orange-500
    group-hover:text-pink-600  
    group-focus:text-neutral-900 
    dark:group-focus:text-neutral-0 
    group-focus:border-orange-500 
    group-active:text-aqua-500
    disabled:text-neutral-200
    dark:disabled:text-neutral-400
  `;

const currentClass = {
  primary: primaryClass,
  secondary: secondaryClass,
  buttonLink: buttonLinkClass,
};
const currentIconClass = {
  primary: primaryIconClass,
  secondary: secondaryIconClass,
  buttonLink: buttonLinkIconClass,
};

const Button = ({
  text,
  href,
  download,
  isExternal,
  variant = 'primary',
  arrowPosition,
  arrowRotation = 'right',
  noScroll = false,
  className = '',
  overrideTextSize = false,
  onClick,
}: Readonly<Props>) => {
  const baseClass = `group inline-flex items-center justify-center h-16 px-8 py-5 rounded-full cursor-pointer gap-x-5 ${
    overrideTextSize ? 'text-button' : '!text-button'
  } font-heading font-bold`;
  const currentMergedClass = tm(baseClass, currentClass[variant], className);
  const isAbsoluteUrl = /^(https?:\/\/|www\.)/.test(href);
  const getTarget = () => {
    if (isExternal) return '_blank';
    if (isAbsoluteUrl) return '_parent';
    return '_self';
  };

  return (
    <Link
      href={href}
      download={download}
      target={getTarget()}
      className={currentMergedClass}
      scroll={!noScroll}
      prefetch={false}
      onClick={onClick}>
      {arrowPosition === ARROW_POSITION.left && (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-6 h-6 ${currentIconClass[variant]} ${ARROW_ROTATION[arrowRotation]}`}>
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
      {text}
      {arrowPosition === ARROW_POSITION.right && (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-6 h-6 ${currentIconClass[variant]} ${ARROW_ROTATION[arrowRotation]}`}>
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
    </Link>
  );
};

export default Button;
