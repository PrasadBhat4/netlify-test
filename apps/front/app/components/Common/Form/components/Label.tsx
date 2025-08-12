import { twMerge as tm } from 'tailwind-merge';

interface Props {
  label: string;
  isRequired?: boolean;
  isDarkBackground?: boolean;
  className?: string;
}

const Label = ({ label, isRequired = false, isDarkBackground = false, className = '' }: Readonly<Props>) => (
  <p
    className={tm(
      `text-body-sm ${isDarkBackground ? 'text-neutral-0' : 'text-neutral-900 dark:text-neutral-0'}
       disabled:text-neutral-400 cursor-pointer ${
         isRequired ? 'after:content-["*"] after:ml-0.5 after:text-orange-500' : ''
       }`,
      className
    )}>
    {label}
  </p>
);

export default Label;
