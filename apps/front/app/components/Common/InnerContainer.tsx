import { twMerge as tm } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const InnerContainer = ({ children, className = '' }: Readonly<Props>) => {
  return (
    <div className={tm(`mx-auto w-full md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]`, className)}>
      {children}
    </div>
  );
};

export default InnerContainer;
