import Link from 'next/link';
import { twMerge as tm } from 'tailwind-merge';
import { format } from 'date-fns';
import Tag from '@/app/components/Blog/Card/Tag';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { ComicPostData } from '@/app/lib/types';

interface Props {
  post: ComicPostData;
  className?: string;
  cardClassName?: string;
}

const Card = ({ post, className = '', cardClassName = '' }: Readonly<Props>) => {
  const { title, brief, coverImage, slug, publishedAt } = post;
  return (
    <Link href={`/hoppy/comics/${slug}`} className={tm(`group flex flex-col w-full `, className)}>
      <div className={tm(`md:aspect-[343/201]  xl:aspect-[438/250] max-h-[16rem] md:mt-[2rem] ${cardClassName}`)}>
        <StrapiImage
          src={coverImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt={coverImage?.data?.attributes?.alternativeText || 'Comic cover image'}
          width={438}
          height={250}
          className={tm(`hidden object-cover h-[16.5rem] xl:block rounded-[1.25rem] max-w-[27.374rem]`)}
        />
        <StrapiImage
          src={coverImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt={coverImage?.data?.attributes?.alternativeText || 'Comic cover image'}
          width={345}
          height={250}
          className={tm(`hidden   object-cover '!h-[13rem]' lg:max-xl:block rounded-[1.25rem]`)}
        />
        <StrapiImage
          src={coverImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt={coverImage?.data?.attributes?.alternativeText || 'Comic cover image'}
          width={354}
          height={201}
          className={tm(`hidden  object-cover '!h-[13.2rem]' md:max-lg:block rounded-[1.25rem]`)}
        />
        <StrapiImage
          src={coverImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt={coverImage?.data?.attributes?.alternativeText || 'Comic cover image'}
          width={701}
          height={201}
          className={tm(` object-cover '!h-[13.1rem]' md:hidden rounded-[1.25rem]`)}
        />
      </div>
      <div className={tm('flex flex-col w-full')}>
        <div className={tm('flex flex-wrap gap-1 mt-4')}>
          <Tag text={format(new Date(publishedAt), 'MMMM dd, yyyy')} isDate />
        </div>
        <h3
          className={tm(
            'overflow-hidden mt-4 font-medium font-heading group-hover:text-pink-600 text-subtitle-sm lg:text-subtitle'
          )}>
          {title}
        </h3>
        <p className='text-body-md-sm lg:text-body-md text-neutral-600 dark:text-neutral-300 text-ellipsis overflow-hidden max-h-[4.5em] line-clamp-3 mt-3 md:mt-4'>
          {brief}
        </p>
      </div>
    </Link>
  );
};

export default Card;
