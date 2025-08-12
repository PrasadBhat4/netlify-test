import { twMerge as tm } from 'tailwind-merge';

interface Props {
  placeholder: string;
  hasError?: boolean;
  isDarkBackground?: boolean;
  className?: string;
}

const Placeholder = ({ placeholder, hasError = false, isDarkBackground = false, className = '' }: Readonly<Props>) => (
  <p
    className={tm(
      `flex items-center w-full h-full group-focus-within:h-5 !text-body-md ${hasError ? 'text-[#FF1515]' : ''} 
      ${isDarkBackground ? 'text-neutral-0' : 'text-neutral-900 dark:text-neutral-0'}
      transition-all duration-300 ease-in-out group-focus-within:text-pink-600 dark:group-focus-within:text-pink-500 
    disabled:text-neutral-400 text-nowrap overflow-hidden
    disabled:pointer-events-none m-0`,
      className
    )}>
    {placeholder}
  </p>
);

export default Placeholder;
