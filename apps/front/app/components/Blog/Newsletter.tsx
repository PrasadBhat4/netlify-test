import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import Newsletter from '@/app/components/Common/Form/Newsletter';
import { formatString } from '@/app/lib/utils';
import { StrapiNewsLetter } from '@/app/lib/types';

interface Props {
  data: StrapiNewsLetter;
  className?: string;
}

const NewsletterSection = ({ data, className = '' }: Readonly<Props>) => {
  return (
    <Container className={className}>
      <div className='relative p-10 pb-30 md:py-[3.75rem] md:pl-10 md:pr-[18.75rem] lg:py-20 lg:pl-28 lg:pr-[28.25rem] xl:pr-[49.25rem] dark:bg-neutral-900 bg-cream-400 rounded-[2.5rem] overflow-hidden'>
        <h2
          className='font-bold font-heading text-heading-md-sm lg:text-heading-md dark:text-neutral-0 text-neutral-900'
          dangerouslySetInnerHTML={{
            __html: formatString(data.Title, 0, 1, 'color'),
          }}
        />
        <p className='mt-4 text-body-xl-sm lg:text-body-xl dark:text-neutral-0 text-neutral-900'>{data.Description}</p>
        <Newsletter data={data.Newsletter} className='mt-2 lg:mt-4' inputClassName='mt-1' />
        <Image
          src='/images/shapes/double-halfmoon-smaller3.png'
          alt='shape'
          width={200}
          height={235}
          className='absolute top-[1.3rem] right-0 lg:top-[3.3rem] lg:right-[6.25rem] hidden md:block object-cover'
          priority
        />
        <Image
          src='/images/shapes/circle-square2.png'
          alt='shape'
          width={200}
          height={235}
          className='absolute top-[1.3rem] right-0 lg:top-[4.5rem] lg:right-[-6.28rem] hidden lg:block object-cover'
          priority
        />
        <div className='flex absolute inset-x-0 -bottom-20 justify-center md:hidden'>
          <Image
            src='/images/shapes/double-halfmoon-smaller3.png'
            alt='shape'
            width={131.5}
            height={154.7}
            className='object-cover w-[8.21875rem] h-[9.66875rem]'
            priority
          />
          <Image
            src='/images/shapes/circle-square2.png'
            alt='shape'
            width={131.5}
            height={131.5}
            className='object-cover w-[8.21875rem] h-[8.21875rem]'
            priority
          />
        </div>
      </div>
    </Container>
  );
};

export default NewsletterSection;
