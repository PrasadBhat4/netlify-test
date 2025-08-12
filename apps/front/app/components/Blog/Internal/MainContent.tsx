import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { twMerge as tm } from 'tailwind-merge';
import Title from '@/app/components/Blog/Internal/Title';
import AuthorDate from '@/app/components/Blog/Internal/AuthorDate';

const ClientContent = dynamic(() => import('./ClientContent'), {
  ssr: false,
  loading: () => <div className='h-screen' />,
});

interface Props {
  data: any;
  className?: string;
}

const MainContent = ({ data, className = '' }: Readonly<Props>) => {
  return (
    <article
      className={tm(
        'w-full md:max-w-[35.75rem] lg:max-w-[47.875rem] xl:max-w-[51.75rem] max-w-[51.75rem] mx-auto lg:mr-auto lg:ml-8 xl:ml-28 prose',
        className
      )}>
      <Title text={data.title} />

      <AuthorDate
        date={data.publishedAt}
        readTime={data.readTimeInMinutes}
        author={data.author}
        coAuthors={data.coAuthors}
      />

      {data?.coverImage?.url && (
        <div className='relative mt-0 mb-12 md:mt-0 md:mb-[5.25rem] w-full' style={{ aspectRatio: '16 / 9' }}>
          <Image
            src={data.coverImage.url}
            alt='Cover image'
            className='rounded-[1.25rem] object-cover'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 572px, (max-width: 1280px) 766px, 828px'
            quality={30}
            priority
            fetchPriority='high'
            decoding='async'
          />
        </div>
      )}

      <Suspense>
        <ClientContent data={data} />
      </Suspense>
    </article>
  );
};

export default MainContent;
