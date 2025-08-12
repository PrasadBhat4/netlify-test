import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import { formatString } from '@/app/lib/utils';
import Button from '@/app/components/Common/Button';
import { StrapiButton, StrapiGetStarted } from '@/app/lib/types';

interface Props {
  data: StrapiGetStarted;
  className?: string;
}

const GetStarted = ({ data, className = '' }: Readonly<Props>) => (
  <Container className={className}>
    <div className='relative flex flex-col md:flex-row p-10 md:p-20 lg:py-[7.875rem] lg:pr-[10rem] xl:py-[12.3125rem] xl:px-[10.5rem] dark:bg-neutral-900 bg-cream-400 rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[5rem] xl:rounded-[5.5rem] overflow-hidden'>
      <div className='md:max-w-[400px] lg:max-w-[750px] xl:max-w-[950px]'>
        <h2
          className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg dark:text-neutral-0 text-neutral-900'
          dangerouslySetInnerHTML={{
            __html: formatString(data.Title, 'last', undefined, 'color'),
          }}
        />
        <div className='flex flex-col gap-4 mt-4 lg:flex-row lg:items-center'>
          <p className='font-semibold text-body-xl-sm lg:text-body-xl dark:text-neutral-0 text-neutral-900'>
            {data.Description_1}
          </p>
          {data.Description_2 && <div className='w-4 h-px lg:w-px lg:h-4 dark:bg-neutral-0 bg-neutral-900' />}
          <p className='text-body-xl-sm lg:text-body-xl dark:text-neutral-0 text-neutral-900'>{data.Description_2}</p>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-6 mt-8 md:mt-[5.5rem]'>
          {data?.Buttons?.map((button: StrapiButton, index: number) => (
            <>
              {index === 0 && (
                <Button
                  text={button.Text}
                  variant='primary'
                  href={button.Url}
                  isExternal={button.isExternal}
                  arrowPosition='right'
                  key={button.id}
                />
              )}
              {index === 1 && (
                <Button
                  className='dark:text-neutral-0 text-neutral-900'
                  text={button.Text}
                  variant='secondary'
                  href={button.Url}
                  isExternal={button.isExternal}
                  key={button.id}
                />
              )}
            </>
          ))}
        </div>

        <p
          className='mt-6 md:mt-8 text-body-md-sm lg:text-body-md dark:text-neutral-0 text-neutral-900'
          dangerouslySetInnerHTML={{
            __html: formatString(data.TextDetails, 0, 1, 'bold'),
          }}
        />
      </div>

      {data.Image?.data?.attributes?.url && (
        <>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={543}
            height={715}
            className='absolute inset-y-0 right-0 hidden object-cover h-full xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={449}
            height={572}
            className='absolute inset-y-0 right-0 hidden object-cover h-full lg:max-xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={304}
            height={662}
            className='absolute inset-y-0 right-0 hidden object-cover object-left-top h-full md:max-lg:block'
          />
        </>
      )}
      {data.ImageSM?.data?.attributes?.url && (
        <StrapiImage
          src={data?.ImageSM?.data?.attributes?.url}
          alt='get started bg'
          width={263}
          height={318}
          className='relative -bottom-10 mx-auto object-cover md:hidden mt-[2.125rem]'
        />
      )}
    </div>
  </Container>
);

export default GetStarted;
