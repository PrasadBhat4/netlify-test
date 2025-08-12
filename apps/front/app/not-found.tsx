import { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import Button from '@/app/components/Common/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

const NotFound = () => {
  return (
    <div className='my-16 md:my-30 lg:my-38'>
      <Container className='flex flex-col items-center'>
        <Image
          src='/images/notFound/404.png'
          alt='not found'
          height={300}
          width={411}
          className='hidden lg:block dark:hidden'
        />
        <Image
          src='/images/notFound/404-dark.png'
          alt='not found'
          height={300}
          width={411}
          className='hidden lg:dark:block'
        />

        <Image
          src='/images/notFound/404.png'
          alt='not found'
          height={280}
          width={383}
          className='hidden md:max-lg:block dark:hidden'
        />
        <Image
          src='/images/notFound/404-dark.png'
          alt='not found'
          height={280}
          width={383}
          className='hidden md:max-lg:dark:block'
        />

        <Image
          src='/images/notFound/404.png'
          alt='not found'
          height={240}
          width={411}
          className='md:hidden dark:hidden'
        />
        <Image
          src='/images/notFound/404-dark.png'
          alt='not found'
          height={240}
          width={411}
          className='hidden dark:block md:dark:hidden'
        />

        <h1 className='mt-10 font-bold text-heading text-heading-xl xl:mt-16'> 404 </h1>
        <p className='mt-2 xl:mt-6 text-heading text-subtitle'>The page you are looking for can’t be found</p>
        <Button
          className='w-[13.375rem] md:w-auto mt-6'
          text='Go back home'
          variant='secondary'
          href='/'
          isExternal={false}
        />
      </Container>
    </div>
  );
};

export default NotFound;
