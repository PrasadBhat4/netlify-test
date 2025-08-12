import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { CaseHomeProps } from '@/app/lib/types';

const CaseHome = ({ data }: { data: CaseHomeProps }) => {
  return (
    <Container className='my-6'>
      <div className='flex flex-col lg:flex-row items-center gap-8 w-full lg:mt-20 mt-10'>
        <div className='flex-1 flex justify-center items-center w-full lg:hidden'>
          {data?.Image && (
            <StrapiImage src={data?.Image?.data?.attributes?.url} alt='Case visual' width={650} height={400} />
          )}
        </div>
        <div className='flex-1 flex flex-col gap-3 justify-center'>
          <div className='flex items-center gap-4 mb-2'>
            {data?.ClientLogo && (
              <StrapiImage
                src={data?.ClientLogo?.data?.attributes?.url}
                alt='Client Logo'
                width={148}
                height={60}
                className='dark:hidden object-contain object-center max-h-20'
              />
            )}

            {data?.ClientLogoDark && (
              <StrapiImage
                src={data?.ClientLogoDark?.data?.attributes?.url}
                alt='Client Logo Dark'
                width={148}
                height={60}
                className='hidden dark:block object-contain object-center max-h-20'
              />
            )}
          </div>
          <h1 className=' md:text-heading-md text-heading-sm-sm font-heading font-medium'>{data?.CaseTitle}</h1>
          <div>
            <p className='text-base md:text-lg text-gray-700'>{data?.CaseDescription}</p>
          </div>
        </div>
        <div className='flex-1 justify-center items-center w-full hidden lg:block'>
          {data?.Image && (
            <StrapiImage src={data?.Image?.data?.attributes?.url} alt='Case visual' width={650} height={400} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default CaseHome;
