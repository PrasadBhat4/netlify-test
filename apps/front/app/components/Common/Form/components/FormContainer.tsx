import { twMerge as tm } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const FormContainer = ({ children, className = '' }: Readonly<Props>) => (
  <div
    className={tm(
      'relative px-4 py-8 md:px-12 md:py-20 bg-neutral-0 dark:bg-neutral-950 rounded-[2rem] md:rounded-[5rem] w-full overflow-hidden',
      className
    )}>
    {children}
  </div>
);

export default FormContainer;
