import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import { formatString } from '@/app/lib/utils';
import Button from '@/app/components/Common/Button';
import { OpenSourceProject, StrapiButton } from '@/app/lib/types';

interface Props {
  data: OpenSourceProject;
}

const OpenSource = ({ data }: Readonly<Props>) => (
  <Container>
    <div className='relative flex flex-col md:flex-row p-10 md:p-20 lg:px-[10rem] xl:py-14 dark:bg-neutral-900 bg-cream-400 rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[5rem] xl:rounded-[5.5rem] overflow-hidden'>
      <div className='md:w-[18.125rem] lg:w-[46.4375rem]'>
        <h2
          className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg dark:text-neutral-0 text-neutral-900 md:inline-table md:[&>span]:mr-3'
          dangerouslySetInnerHTML={{
            __html: formatString(data.Title, 3, data.Title.length, 'color'),
          }}
        />
        <div className='mt-4'>
          <p
            className='text-body-xl-sm lg:text-body-xl dark:text-neutral-0 text-neutral-900'
            dangerouslySetInnerHTML={{
              __html: formatString(data.Description_1, 2, 3, 'color-bold'),
            }}
          />
          <p className='text-body-xl-sm lg:text-body-xl dark:text-neutral-0 text-neutral-900'>{data.Description_2}</p>
        </div>

        <div className='mt-8 md:mt-[3.5rem] flex flex-col gap-4 lg:flex-row '>
          {data?.Buttons?.map((button: StrapiButton) => (
            <Button
              text={button.Text}
              variant='primary'
              href={button.Url}
              isExternal={button.isExternal}
              arrowPosition='right'
              key={button.id}
              className='w-full md:w-72'
            />
          ))}
        </div>

        <p
          className='mt-6 md:mt-8 text-body-md-sm lg:text-body-md dark:text-neutral-0 text-neutral-900'
          dangerouslySetInnerHTML={{
            __html: formatString(data.TextDetails, 0, 1, 'bold'),
          }}
        />
      </div>

      {data?.Image?.data?.attributes?.url && (
        <>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={449}
            height={572}
            className='hidden object-cover absolute inset-y-0 right-80 h-full xl:block'
          />
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt='get started bg'
            width={449}
            height={572}
            className='hidden object-cover absolute inset-y-0 right-0 h-full lg:max-xl:block'
          />
          <StrapiImage
            src={data?.ImageSM?.data?.attributes?.url}
            alt='get started bg'
            width={316}
            height={584}
            className='hidden object-cover object-left-top absolute inset-y-0 top-2 -right-8 h-full md:max-lg:block'
          />
        </>
      )}
      {data?.ImageSM?.data?.attributes?.url && (
        <StrapiImage
          src={data?.ImageSM?.data?.attributes?.url}
          alt='get started bg'
          width={263}
          height={318}
          className='-mb-10 mx-auto object-cover md:hidden mt-[6.25rem]'
        />
      )}
    </div>
  </Container>
);

export default OpenSource;
