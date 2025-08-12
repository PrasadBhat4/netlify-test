import Link from 'next/link';
import Image from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import { StrapiButton, StrapiImage } from '@/app/lib/types';

type StrapiCase = {
  CustomerLight: StrapiImage;
  CustomerDark: StrapiImage;
  CoverLight: StrapiImage;
  CoverDark: StrapiImage;
  Button: StrapiButton;
  Title: string;
};

interface Props {
  cases: StrapiCase;
}

const Card = async ({ cases }: Readonly<Props>) => (
  <Link
    href={cases?.Button.Url}
    target={cases?.Button.isExternal ? '_blank' : '_self'}
    className='inline-block p-6 lg:p-8 xl:p-10 bg-neutral-0 dark:bg-neutral-900 border-cream-600 dark:border-neutral-800 rounded-2xl max-w-[42.875rem] hover:shadow-trust-card'>
    <div className='flex flex-col'>
      <div className='flex items-center justify-center w-full max-w-[9.5rem] lg:max-w-[11.875rem] h-[4.5rem] lg:h-20'>
        <Image
          src={cases?.CustomerLight?.data?.attributes?.url}
          alt={cases?.CustomerLight?.data?.attributes?.alternativeText}
          width={190}
          height={80}
          className='object-cover dark:hidden'
        />
        <Image
          src={cases?.CustomerDark?.data?.attributes?.url}
          alt={cases?.CustomerDark?.data?.attributes?.alternativeText}
          width={190}
          height={80}
          className='hidden object-cover dark:inline'
        />
      </div>
      <div className='w-full md:max-w-[20.375rem] lg:max-w-[30.125rem] xl:max-w-[37.875rem] h-[11.25rem] lg:h-[14.375rem] mt-6 lg:mt-8 xl:mt-10 rounded-2xl xl:rounded-[1.25rem] overflow-hidden'>
        <Image
          src={cases?.CoverLight?.data?.attributes?.url}
          alt={cases?.CoverLight?.data?.attributes?.alternativeText}
          width={606}
          height={230}
          className='object-cover w-full h-full dark:hidden'
        />
        <Image
          src={cases?.CoverDark?.data?.attributes?.url}
          alt={cases?.CoverDark?.data?.attributes?.alternativeText}
          width={606}
          height={230}
          className='hidden object-cover w-full h-full dark:inline'
        />
      </div>
      <h1 className='mt-[1.25rem] font-medium font-heading text-subtitle-sm lg:text-subtitle dark:text-neutral-0'>
        {cases.Title}
      </h1>
    </div>
    {cases?.Button && (
      <Button
        className='mt-10 text-neutral-900 dark:text-neutral-0'
        text={cases?.Button.Text}
        variant='buttonLink'
        href={cases?.Button.Url}
        isExternal={cases?.Button.isExternal}
        arrowPosition='right'
        key={cases?.Button.id}
      />
    )}
  </Link>
);

export default Card;
