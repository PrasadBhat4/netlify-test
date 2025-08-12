import { twMerge as tm } from 'tailwind-merge';
import Container from '@/app/components/Common/Container';
import { formatString } from '@/app/lib/utils';
import AnimatedNumber from '@/app/components/Home/Stats/AnimatedNumber';

type Stat = {
  id: string;
  Number: string;
  Description: string;
};
interface Props {
  data: {
    Title: string;
    Description: string;
    Stats: Stat[];
  };
  className?: string;
}

const Stats = ({ data, className = '' }: Readonly<Props>) => {
  return (
    <Container
      className={tm(
        'flex flex-col items-center w-full md:flex-row md:flex-wrap gap-6 lg:flex-row lg:items-center xl:max-w-[87.25rem] xl:p-0',
        className
      )}>
      <div className='flex flex-col self-stretch justify-center md:basis-1/2-gap-6 p-8 w-full rounded-[1.25rem] bg-pink-400 dark:bg-neutral-900 border border-pink-400 dark:border-neutral-900 shadow-border shadow-pink-400 dark:shadow-neutral-900'>
        <h2 className='font-bold font-heading text-heading-sm-sm lg:text-heading-sm'>{data.Title}</h2>
        <p
          className='text-body-md'
          dangerouslySetInnerHTML={{
            __html: formatString(data.Description, 2, 2, 'bold'),
          }}
        />
      </div>
      {data.Stats.map((stat: Stat, index: number) => {
        const number = stat.Number.match(/\d+/g) ?? 0;
        const unit = stat.Number.match(/[a-zA-Z]+/g) ?? 'k';
        return (
          <div
            key={stat.id}
            className='flex md:basis-1/4-gap-6 flex-col self-stretch justify-center w-full px-11 py-8 md:pl-6 md:py-10 md:pr-2 rounded-[1.25rem] bg-neutral-0 dark:bg-neutral-900 border even:border-orange-500 odd:border-pink-700 shadow-border even:shadow-orange-500 odd:shadow-pink-700'>
            <AnimatedNumber number={number as number} unit={unit as string} />
            <p
              className='text-body-md'
              dangerouslySetInnerHTML={{
                __html: formatString(stat.Description, 0, index === 0 ? undefined : 1, 'bold'),
              }}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default Stats;
