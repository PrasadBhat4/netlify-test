import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Button from '@/app/components/Common/Button';
import { ComicData } from '@/app/lib/types';

interface Props {
  data: ComicData;
}

const Comic = ({ data }: Readonly<Props>) => {
  return (
    <Container className=' gap-6 '>
      <InnerContainer>
        <div className='flex space-y-6 flex-col items-center w-full '>
          {data?.Title && (
            <h2 className='font-bold text-balance text-center font-heading text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0'>
              {data?.Title}
            </h2>
          )}
          {data?.Description && (
            <p className='text-center  text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
              {data?.Description}
            </p>
          )}
          {data?.Image?.data?.attributes?.url && (
            <div className='mt-6 lg:mt-0'>
              <StrapiImage
                src={data?.Image?.data?.attributes?.url}
                alt={data?.Image?.data?.attributes.alternativeText || 'Comic cover image'}
                width={650}
                height={591}
                className=''
              />
            </div>
          )}
          {data?.Button && (
            <div className=''>
              <Button
                text={data?.Button?.Text}
                variant='secondary'
                href={data?.Button?.Url}
                isExternal={data?.Button?.isExternal}
                className='w-full md:w-auto no-underline py-2 !h-12'
              />
            </div>
          )}
        </div>
      </InnerContainer>
    </Container>
  );
};

export default Comic;
