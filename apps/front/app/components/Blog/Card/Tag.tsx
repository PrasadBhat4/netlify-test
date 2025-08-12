import { twMerge as tm } from 'tailwind-merge';

interface Props {
  text: string;
  isDate?: boolean;
}

const Tag = ({ text, isDate = false }: Readonly<Props>) => (
  <span
    data-category={text}
    className={tm(
      'px-3 py-2 text-body-sm-sm bg-aqua-300 dark:bg-aqua-900 text-aqua-600 dark:text-aqua-300 border border-aqua-600 rounded-full',
      isDate && 'bg-transparent text-neutral-600 dark:text-neutral-300 border-cream-600 dark:border-neutral-700'
    )}>
    {text}
  </span>
);

export default Tag;
