import { twMerge as tm } from 'tailwind-merge';

const Tag = ({ text, className = '' }: { text: string; className?: string }) => (
  <span
    className={tm(
      'w-fit px-6 py-2 font-semibold text-body-md text-pink-700 dark:text-pink-500 bg-pink-400 dark:bg-pink-900 rounded-[5rem] uppercase',
      className
    )}>
    {text}
  </span>
);

export default Tag;
