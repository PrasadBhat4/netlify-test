import Link from 'next/link';
import Image from 'next/image';
import { twMerge as tm } from 'tailwind-merge';
import { format } from 'date-fns';
import { Post } from '@/generated/graphql';
import Tag from '@/app/components/Blog/Card/Tag';

interface Props {
  post: Post;
  isFeatured?: boolean;
  className?: string;
  cardClassName?: string;
  showBrief?: boolean;
  isCaseStudy?: boolean;
}

const Card = ({
  post,
  isFeatured = false,
  className = '',
  cardClassName = '',
  showBrief = true,
  isCaseStudy = false,
}: Readonly<Props>) => {
  const { title, brief, coverImage, slug, publishedAt, subtitle } = post;
  return (
    <Link
      href={`/${isCaseStudy ? 'case-studies' : 'blog'}/${slug}`}
      className={tm(`group flex flex-col w-full ${isFeatured && 'md:flex-row-reverse md:gap-x-10'}`, className)}>
      <div
        className={tm(
          `w-full overflow-hidden rounded-[1.25rem]`,
          isFeatured ? 'md:w-1/2' : 'aspect-[438/250]',
          cardClassName
        )}>
        <Image
          src={coverImage?.url ?? '/images/blog/placeholder.png'}
          blurDataURL={coverImage?.url ?? '/images/blog/placeholder.png'}
          alt='Article Card Image'
          width={isFeatured ? 701 : 438}
          height={isFeatured ? 450 : 250}
          priority={isFeatured}
          className='h-full w-full object-cover'
        />
      </div>
      <div className={tm('flex flex-col w-full', isFeatured && 'md:w-1/2')}>
        <div className={tm('flex flex-wrap gap-1 mt-4')}>
          <Tag text={format(new Date(publishedAt), 'MMMM dd, yyyy')} isDate />
        </div>
        <h3
          className={tm(
            'overflow-hidden mt-4 font-medium font-heading group-hover:text-pink-600',
            isFeatured ? 'text-heading-sm-sm lg:text-heading-md lg:mt-6' : 'text-subtitle-sm lg:text-subtitle'
          )}>
          {title}
        </h3>
        {showBrief && (
          <p className='text-body-md-sm lg:text-body-md text-neutral-600 dark:text-neutral-300 text-ellipsis overflow-hidden max-h-[4.5em] line-clamp-3 mt-3 md:mt-4'>
            {subtitle || brief}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Card;
