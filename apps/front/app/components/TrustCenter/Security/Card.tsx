import Button from '@/app/components/Common/Button';
import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  security: any;
}

const Card = ({ security }: Readonly<Props>) => (
  <div className='flex flex-col items-start md:flex-row lg:items-center md:justify-center gap-y-4 md:gap-x-6 lg:gap-x-10 xl:gap-x-[10.25rem] xl:justify-start md:even:flex-row-reverse'>
    <StrapiImage
      src={security?.Image?.data?.attributes?.url}
      alt='security'
      width={546}
      height={400}
      className='hidden object-cover rounded-3xl lg:block dark:hidden'
    />
    <StrapiImage
      src={security?.ImageDark?.data?.attributes?.url}
      alt='security'
      width={546}
      height={400}
      className='hidden object-cover rounded-3xl dark:lg:block'
    />

    <StrapiImage
      src={security?.Image?.data?.attributes?.url}
      alt='security'
      width={371}
      height={280}
      className='hidden object-cover rounded-2xl md:max-lg:block dark:hidden'
    />
    <StrapiImage
      src={security?.ImageDark?.data?.attributes?.url}
      alt='security'
      width={371}
      height={280}
      className='hidden object-cover rounded-2xl dark:md:max-lg:block'
    />

    <StrapiImage
      src={security?.Image?.data?.attributes?.url}
      alt='security'
      width={343}
      height={251}
      className='object-cover rounded-2xl md:hidden dark:hidden'
    />
    <StrapiImage
      src={security?.ImageDark?.data?.attributes?.url}
      alt='security'
      width={343}
      height={251}
      className='hidden object-cover dark:block rounded-2xl dark:md:hidden'
    />

    <div className='max-w-[34.125rem] xl:w-full'>
      {security?.Title && <h3 className='font-semibold text-body-xl-sm lg:text-body-xl'>{security?.Title}</h3>}
      {security?.Description && <p className='mt-4 text-body-md-sm lg:text-body-md'>{security?.Description}</p>}
      {security?.Button && (
        <Button
          text={security?.Button?.Text}
          href={security?.Button?.Url}
          isExternal={security?.Button?.isExternal}
          className='w-full mt-4 lg:mt-6 md:w-auto'
          variant='secondary'
          arrowPosition='right'
          arrowRotation='down'
        />
      )}
    </div>
  </div>
);

export default Card;
