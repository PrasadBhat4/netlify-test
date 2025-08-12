import InnerContainer from '@/app/components/Common/InnerContainer';
import { StatsSectionProps } from '@/app/lib/types';

const Stats = ({ data }: { data: StatsSectionProps }) => {
  return (
    <InnerContainer className='space-y-10'>
      <div className='flex flex-col md:flex-row items-center w-full'>
        {data?.Stats?.map((stat, index) => (
          <div
            key={stat?.id}
            className='text-center space-y-8 md:space-y-3 flex flex-col items-center justify-center flex-1 relative'>
            {index > 0 && <div className='absolute left-0 top-0 bottom-0 w-[2px] bg-neutral-200 hidden md:block' />}
            <div className='max-w-[15rem] flex flex-col gap-4'>
              {stat?.Number && (
                <div className='font-bold text-heading-md-sm text-pink-600 dark:text-aqua-500'>{stat?.Number}</div>
              )}
              {stat?.Description && <div className='leading-relaxed'>{stat?.Description}</div>}
            </div>
          </div>
        ))}
      </div>
      {data?.Brief && <p className='mb-6 leading-relaxed '>{data?.Brief}</p>}
      <div className='w-[90%] md:w-[80%] h-[2px] !my-6 md:!my-10 bg-neutral-200 mx-auto' />
    </InnerContainer>
  );
};

export default Stats;
