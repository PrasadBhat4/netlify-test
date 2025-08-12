import Container from '@/app/components/Common/Container';
import Carousel from '@/app/components/Enterprise/Carousel';

interface Props {
  data: any;
  className?: string;
}

const Impact = ({ data = {} }: Readonly<Props>) => (
  <Container className='mx-auto w-full mb-32 lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
    <div>
      <h2 className='flex flex-grow w-3/4 font-bold lg:w-full font-heading text-heading-lg-sm lg:text-heading-md text-neutral-900 dark:text-neutral-0'>
        {data.Title}
      </h2>
    </div>
    <div>
      <Carousel items={data.Slider} />
    </div>
  </Container>
);

export default Impact;
