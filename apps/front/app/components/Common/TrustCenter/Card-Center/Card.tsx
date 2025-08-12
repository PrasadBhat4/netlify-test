import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  card: any;
}

const Card = ({ card }: Readonly<Props>) => (
  <div className='flex flex-col justify-between md:max-lg:items-center md:max-lg:flex-row md:max-lg:justify-start md:max-lg:gap-x-6 p-6 md:py-8 md:pt-5 lg:pt-8 xl:p-10 bg-neutral-0 dark:bg-neutral-900 border border-cream-600 dark:border-neutral-800 rounded-[1.25rem] w-full min-h-full   md:max-lg:min-h-[10.25rem] lg:min-h-[32rem] xl:min-h-[36.3125rem] xl:max-h-[44.5625rem]'>
    <div className='hidden md:max-lg:block'>
      <StrapiImage
        src={card?.Icon?.data?.attributes?.url}
        alt={card?.Icon?.data?.attributes?.alternativeText}
        width={80}
        height={80}
        className='hidden md:max-lg:block md:max-lg:max-h-[5rem] md:max-lg:max-w-[5rem]'
      />
    </div>
    <div className='flex flex-col items-center md:max-lg:items-start gap-y-6  md:max-lg:gap-y-0 justify-between h-full  mt-2 md:max-lg:mt-0 '>
      <h3 className='block font-bold  md:max-lg:mt-5 font-heading text-heading-sm-sm lg:text-heading-sm xl:text-heading-md dark:text-neutral-0 text-center'>
        {card?.Title}
      </h3>
      <StrapiImage
        src={card?.Icon?.data?.attributes?.url}
        alt={card?.Icon?.data?.attributes?.alternativeText}
        width={180}
        height={180}
        className='block md:max-lg:hidden '
      />
      <p className='md:max-lg:mt-3 md:max-lg:text-left  text-body-md-sm lg:text-body-md xl:text-body-lg dark:text-neutral-0 text-center'>
        {card?.Description}
      </p>
    </div>
  </div>
);

export default Card;
