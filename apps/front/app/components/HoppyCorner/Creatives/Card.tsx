import { twMerge as tm } from 'tailwind-merge';
import Image from 'next/image';
import Links from '@/app/components/Footer/Socials';
import { Creatives, StrapiButton } from '@/app/lib/types';
import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  post: Creatives;
  className?: string;
  cardClassName?: string;
  Socials?: StrapiButton[];
}
const Card = ({ post, className = '', cardClassName = '', Socials }: Readonly<Props>) => {
  const { Title, CreativeImage, UserImage, slug } = post;
  return (
    <div className={tm(`group flex flex-col w-full relative cursor-pointer`, className)}>
      <a href={`/hoppy/${slug}`} className='absolute inset-0 z-0'>
        <span className='sr-only'>{Title}</span>
      </a>

      <div className={tm(`md:aspect-[343/201] xl:aspect-[438/250] max-h-[26rem] md:mt-[2rem] ${cardClassName}`)}>
        <StrapiImage
          src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt='Creative illustration'
          width={345}
          height={350}
          className={tm(`hidden object-cover max-h-[22rem] xl:block rounded-[1.25rem]`)}
        />
        <StrapiImage
          src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt='Creative illustration'
          width={345}
          height={350}
          className={tm(`hidden max-h-[22rem] object-cover lg:max-xl:block rounded-[1.25rem]`)}
        />
        <StrapiImage
          src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt='Creative illustration'
          width={354}
          height={201}
          className={tm(`hidden max-h-[20rem] object-cover md:max-lg:block rounded-[1.25rem]`)}
        />
        <StrapiImage
          src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
          alt='Creative illustration'
          width={701}
          height={201}
          className={tm(`object-cover max-h-[20rem] md:hidden rounded-[1.25rem]`)}
        />

        {Socials && Socials.length > 0 && (
          <div
            role='button'
            tabIndex={0}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
            className='absolute top-3 md:top-11 flex flex-col right-4 md:right-8 lg:right-4 gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10'>
            <Links imageClassName='dark:invert' links={Socials} className='w-6 h-6' />
          </div>
        )}

        <div className='absolute top-2 md:top-10 flex flex-col right-4 md:right-8 lg:right-4 gap-2 opacity-100 translate-y-2 group-hover:opacity-0 group-hover:translate-y-0 transition-all duration-300 ease-in-out'>
          <Image src='/images/shapes/share.png' alt='joinus circle' height={22} width={22} />
        </div>
      </div>

      <div className={tm('flex flex-col w-full')}>
        <div className={tm('flex flex-wrap gap-1 mt-3 justify-between items-center mr-1.5')}>
          <p className='line-clamp-1 text-ellipsis max-w-[calc(100%-48px)]'>{Title}</p>
          {UserImage?.data?.attributes?.url && (
            <div>
              <StrapiImage
                src={UserImage?.data?.attributes?.url}
                alt={UserImage?.data?.attributes.alternativeText || 'User Avatar'}
                width={30}
                height={30}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
