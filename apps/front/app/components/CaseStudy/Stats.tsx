import { twMerge as tm } from 'tailwind-merge';
import Container from '@/app/components/Common/Container';

interface Props {
  data: Array<{
    id: string;
    Number: string;
    Description: string;
  }>;
  className?: string;
}

const Stats = ({ data, className = '' }: Readonly<Props>) => {
  return (
    <Container
      className={tm(
        'flex flex-col justify-center items-center md:flex-row md:flex-wrap gap-8 lg:flex-row lg:items-center lg:max-w-[75.5rem] xl:max-w-[87.25rem] xl:p-0',
        className
      )}>
      {data?.map(stat => {
        return (
          <div
            key={stat.id}
            className='flex w-full md:flex-1 flex-col self-stretch justify-center px-11 py-6
              rounded-[1.25rem] bg-neutral-0 dark:bg-neutral-900 border-b-2 border-r-2 border-t border-l border-b-orange-500 border-r-orange-500 border-t-cream-600 border-l-cream-600'>
            <p className='font-bold text-heading-md text-center'>{stat.Number}</p>
            <p className='text-body-md text-center'>{stat.Description}</p>
          </div>
        );
      })}
    </Container>
  );
};

export default Stats;
