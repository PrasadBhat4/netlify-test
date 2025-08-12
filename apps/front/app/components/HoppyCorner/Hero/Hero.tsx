import Container from '@/app/components/Common/Container';
import { HoppyHero } from '@/app/lib/types';
import StrapiImage from '@/app/components/Common/StrapiImage';
import InnerContainer from '@/app/components/Common/InnerContainer';

interface Props {
  data: HoppyHero;
}

const Hero = ({ data }: Readonly<Props>) => {
  return (
    <Container className=' gap-6   '>
      <InnerContainer>
        <div className=' flex space-y-6 flex-col md:flex-row items-center'>
          {data?.Image?.data?.attributes?.url && (
            <div className='mt-6 lg:mt-0'>
              <StrapiImage
                src={data?.Image?.data?.attributes?.url}
                alt='hero background'
                width={650}
                height={591}
                className=' hidden md:block '
              />
              <StrapiImage
                src={data?.Image?.data?.attributes?.url}
                alt='hero background'
                width={300}
                height={251}
                className='flex mr-10 md:hidden'
              />
            </div>
          )}
          <div className='flex space-y-6 flex-col items-center md:items-start w-full max-w-[69rem]'>
            <h1 className='font-bold text-balance text-center text-heading-lg-sm  md:text-left font-heading  md:text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0'>
              {data?.Title}
            </h1>
            <p className=' text-center md:text-left max-w-[30.75rem]  lg:mt-6 text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
              {data?.Description}
            </p>
          </div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default Hero;
