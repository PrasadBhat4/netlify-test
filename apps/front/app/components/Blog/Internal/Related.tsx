import { twMerge as tm } from 'tailwind-merge';
import { Post } from '@/generated/graphql';
import Card from '@/app/components/Blog/Card';

interface Props {
  title: string;
  items: Post[];
  className?: string;
}

const Related = ({ title, items = [], className = '' }: Readonly<Props>) => {
  return (
    <div className={tm(`flex flex-col lg:flex-row`, className)}>
      <h2 className='min-w-[17rem] font-medium font-heading text-heading-md-sm lg:text-heading-sm'>{title}</h2>
      <div className='flex flex-col mt-10 lg:flex-row gap-y-10 md:gap-y-12 lg:gap-y-0 lg:gap-x-10 lg:mt-0'>
        {items?.length > 0 &&
          items?.map((item: Post) => (
            <div className='w-full lg:w-1/3 lg:min-w-[300px] lg:max-w-[420px]' key={item.id}>
              <Card post={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Related;
