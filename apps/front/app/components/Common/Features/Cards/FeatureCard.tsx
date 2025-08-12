import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';

interface Props {
  card: any;
}

const FeatureCard = ({ card }: Readonly<Props>) => {
  return (
    <div className='flex flex-col  md:max-lg:justify-start md:max-lg:gap-x-6 p-6 md:py-8 md:pt-5 lg:pt-8 xl:p-10 bg-neutral-0 dark:bg-neutral-900 border border-cream-600 dark:border-neutral-800 rounded-[1.25rem] w-full min-h-[21.3125rem] md:min-h-[28rem] lg:min-h-[28rem] xl:max-h-[44.5625rem]'>
      <div className='flex flex-col gap-5 h-full  mt-2 md:max-lg:mt-0'>
        <StrapiImage
          src={card?.Image?.data?.attributes?.url}
          alt={card?.Image?.data?.attributes?.alternativeText}
          width={60}
          height={60}
          className='md:max-lg:max-h-[5rem] md:max-lg:max-w-[5rem] '
        />
        <h3 className=' font-bold md:max-lg:block md:max-lg:mt-5 font-heading text-heading-sm-sm lg:text-heading-sm-sm xl:text-heading-sm-sm dark:text-neutral-0'>
          {card?.Title}
        </h3>
        <p className=' md:max-lg:mt-3 text-body-md-sm lg:text-body-md xl:text-body-lg dark:text-neutral-0'>
          {card?.Description}
        </p>
      </div>
      <div>
        {card?.Button && (
          <Button
            className='mt-6 md:inline-flex justify-start'
            text={card?.Button?.Text}
            variant='buttonLink'
            href={card?.Button?.Url}
            isExternal={card?.Button?.isExternal}
            arrowPosition='right'
          />
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
