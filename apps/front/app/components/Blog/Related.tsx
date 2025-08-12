import { twMerge as tm } from 'tailwind-merge';
import { Post } from '@/generated/graphql';
import Carousel from '@/app/components/Blog/Carousel';
import Container from '@/app/components/Common/Container';

interface Props {
  title: string;
  items: Post[];
  className?: string;
}

const Related = ({ title, items = [], className = '' }: Readonly<Props>) => {
  return (
    <Container className='md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      <div className={tm(`flex flex-col gap-y-6 lg:gap-y-10`, className)}>
        <h2 className='font-medium font-heading text-subtitle-sm md:text-heading-sm-sm lg:text-heading-sm'>{title}</h2>
        <Carousel items={items} />
      </div>
    </Container>
  );
};

export default Related;
