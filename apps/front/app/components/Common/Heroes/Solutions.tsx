import Container from '@/app/components/Common/Container';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import { StrapiButton } from '@/app/lib/types';

interface Props {
  data: {
    Buttons?: StrapiButton[];
    Description: string;
    Image: { data: { attributes: { url: string } } };
    Title: string;
  };
}

const Hero = ({ data }: Readonly<Props>) => {
  const buttons = data?.Buttons || [];
  return (
    <Container className='mt-14 md:mt-10'>
      <div className='flex flex-col items-center justify-between md:flex-row mx-auto w-full lg:max-w-[76.8125rem] xl:max-w-[87.25rem] md:items-center'>
        <div className='w-full md:max-w-[23.3125rem] lg:max-w-[41.125rem] xl:max-w-[42.875rem]'>
          <h1 className='font-bold font-heading text-heading-xl-sm md:text-heading-lg-sm lg:text-heading-lg'>
            {data.Title}
          </h1>
          <p className='lg:max-w-[34.125rem] mt-6 lg:mt-9 text-subtitle md:max-lg:text-body-lg-sm'>
            {data.Description}
          </p>
          <div className='flex items-start lg:flex-row lg:items-center gap-6 mt-[3.1875rem] mr-8'>
            {buttons.map((button, index: number) => (
              <>
                {index === 0 && (
                  <Button
                    text={button.Text}
                    variant='primary'
                    href={button.Url}
                    isExternal={button.isExternal}
                    key={button.id}
                    className={`mb-8 ${buttons.length <= 1 ? 'w-full md:w-auto' : ''}`}
                  />
                )}
                {index === 1 && (
                  <Button
                    text={button.Text}
                    variant='secondary'
                    href={button.Url}
                    isExternal={button.isExternal}
                    key={button.id}
                    className='mb-8'
                  />
                )}
              </>
            ))}
          </div>
        </div>
        <div>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={705}
            height={691}
            className='hidden object-cover xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            width={594}
            height={677}
            className='hidden object-cover lg:max-xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            height={534}
            width={769}
            className='hidden object-cover mb-4 md:max-lg:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='hero background'
            height={534}
            width={769}
            className='object-cover md:hidden'
            priority
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
