import { twMerge as tm } from 'tailwind-merge';
import { ARROW_POSITION, ARROW_ROTATION, RELOAD_ICON_POSITION } from '@/app/lib/constants';
import { ArrowPositionType, ArrowRotationType } from '@/app/lib/types';

interface Props {
  text: string;
  variant?: 'primary' | 'secondary' | 'buttonLink';
  arrowPosition?: ArrowPositionType;
  arrowRotation?: ArrowRotationType;
  reloadIconPosition?: ArrowPositionType;
  className?: string;
  overrideTextSize?: boolean;
  handleClick?: () => void;
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

const ActionButton = ({
  text,
  variant = 'primary',
  arrowPosition,
  arrowRotation = 'right',
  className = '',
  overrideTextSize = false,
  reloadIconPosition,
  handleClick,
}: Readonly<Props>) => {
  const baseClass = `group inline-flex items-center justify-center h-16 px-8 py-5 rounded-full cursor-pointer gap-x-5 ${
    overrideTextSize ? 'text-button' : '!text-button'
  } font-heading font-bold`;
  const currentMergedClass = tm(baseClass, currentClass[variant], className);

  return (
    <button type='button' className={currentMergedClass} onClick={handleClick}>
      {reloadIconPosition === RELOAD_ICON_POSITION.left && (
        <svg
          className={`w-6 h-6 dark:invert ${currentIconClass[variant]} `}
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <mask
            id='mask0_9426_5673_right'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='25'
            height='24'>
            <rect x='0.5' width='24' height='24' fill='#D9D9D9' />
          </mask>
          <g mask='url(#mask0_9426_5673_right)'>
            <path
              d='M12.5 20C10.2667 20 8.375 19.225 6.825 17.675C5.275 16.125 4.5 14.2333 4.5 12C4.5 9.76667 5.275 7.875 6.825 6.325C8.375 4.775 10.2667 4 12.5 4C13.65 4 14.75 4.2375 15.8 4.7125C16.85 5.1875 17.75 5.86667 18.5 6.75V4H20.5V11H13.5V9H17.7C17.1667 8.06667 16.4375 7.33333 15.5125 6.8C14.5875 6.26667 13.5833 6 12.5 6C10.8333 6 9.41667 6.58333 8.25 7.75C7.08333 8.91667 6.5 10.3333 6.5 12C6.5 13.6667 7.08333 15.0833 8.25 16.25C9.41667 17.4167 10.8333 18 12.5 18C13.7833 18 14.9417 17.6333 15.975 16.9C17.0083 16.1667 17.7333 15.2 18.15 14H20.25C19.7833 15.7667 18.8333 17.2083 17.4 18.325C15.9667 19.4417 14.3333 20 12.5 20Z'
              fill='#1C1B1F'
            />
          </g>
        </svg>
      )}
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
      {reloadIconPosition === RELOAD_ICON_POSITION.right && (
        <svg
          className={`w-6 h-6 dark:invert ${currentIconClass[variant]} `}
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <mask
            id='mask0_9426_5674_left'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='25'
            height='24'>
            <rect x='0.5' width='24' height='24' fill='#D9D9D9' />
          </mask>
          <g mask='url(#mask0_9426_5674_left)'>
            <path
              d='M12.5 20C10.2667 20 8.375 19.225 6.825 17.675C5.275 16.125 4.5 14.2333 4.5 12C4.5 9.76667 5.275 7.875 6.825 6.325C8.375 4.775 10.2667 4 12.5 4C13.65 4 14.75 4.2375 15.8 4.7125C16.85 5.1875 17.75 5.86667 18.5 6.75V4H20.5V11H13.5V9H17.7C17.1667 8.06667 16.4375 7.33333 15.5125 6.8C14.5875 6.26667 13.5833 6 12.5 6C10.8333 6 9.41667 6.58333 8.25 7.75C7.08333 8.91667 6.5 10.3333 6.5 12C6.5 13.6667 7.08333 15.0833 8.25 16.25C9.41667 17.4167 10.8333 18 12.5 18C13.7833 18 14.9417 17.6333 15.975 16.9C17.0083 16.1667 17.7333 15.2 18.15 14H20.25C19.7833 15.7667 18.8333 17.2083 17.4 18.325C15.9667 19.4417 14.3333 20 12.5 20Z'
              fill='#1C1B1F'
            />
          </g>
        </svg>
      )}
    </button>
  );
};

export default ActionButton;
