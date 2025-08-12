import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import { Creative as ICreative } from '@/app/lib/types';
import { formatString } from '@/app/lib/utils';
import Carousel from '@/app/components/HoppyCorner/Creatives/Carousel';

interface Props {
  data: ICreative;
}

const Creatives = ({ data }: Readonly<Props>) => {
  return (
    <Container className='pb-8  gap-6 '>
      <InnerContainer>
        <div className='flex space-y-6 flex-col items-center w-full '>
          <h2
            className='font-bold text-balance text-center font-heading text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0'
            dangerouslySetInnerHTML={{
              __html: formatString(data?.Title, 'last', undefined, 'color'),
            }}
          />
          <p className='text-center  text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
            {data?.Description}
          </p>
          <Container className='space-y-16 lg:space-y-[6.25rem] !mt-9 md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] '>
            <Carousel items={data} />
          </Container>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default Creatives;
