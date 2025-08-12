import { twMerge as tm } from 'tailwind-merge';

interface Props {
  isBlack?: boolean;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Card = ({ isBlack = false, className = '', children }: Readonly<Props>) => (
  <div
    className={tm(
      `relative w-full p-6 md:p-12  border border-cream-600 dark:border-neutral-800 shadow-default shadow-cream-600 dark:shadow-neutral-900 rounded-[1.25rem] overflow-hidden`,
      `${isBlack ? 'bg-neutral-900 lg:max-w-[19.875rem]' : 'bg-neutral-0 dark:bg-neutral-900 w-full'} ${className}`
    )}>
    {children}
  </div>
);

export default Card;
