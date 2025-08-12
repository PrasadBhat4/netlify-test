import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import { NewsletterField } from '@/app/lib/types';
import CtaHyperlink from './CtaHyperlink';

interface Props {
  data: NewsletterField;
  className?: string;
}

const GetStarted = ({ data, className = '' }: Readonly<Props>) => {
  return (
    <Container className={className}>
      <div className='grid lg:grid-cols-[auto_1fr_auto] lg:items-center px-8 md:px-12 lg:px-30 pt-6 lg:pt-14 gap-y-10 lg:gap-x-16 dark:bg-neutral-900 bg-white rounded-[2.5rem] max-w-[80rem] m-auto'>
        <div className='self-end'>
          <Image
            src='/images/shapes/code-type.svg'
            alt='shape'
            width={200}
            height={235}
            className='hidden lg:block object-cover'
            priority
          />
        </div>
        <div className='lg:mb-20'>
          <div className='flex items-center gap-x-4'>
            <Image
              src='/images/shapes/halfmoon-double.svg'
              alt='shape'
              width={60}
              height={60}
              className='hidden md:block lg:hidden'
              priority
            />
            <h2 className='font-bold text-heading-h4 md:text-heading-md-sm lg:text-heading-md dark:text-neutral-0 text-neutral-900 break-words'>
              {data?.Title}
            </h2>
          </div>
          <p className='mt-4 text-body-xl-sm lg:text-body-xl dark:text-neutral-0 text-neutral-900'>
            {data?.Description}
          </p>
        </div>
        <CtaHyperlink data={data} inputClassName='mt-1' />
      </div>
    </Container>
  );
};

export default GetStarted;
