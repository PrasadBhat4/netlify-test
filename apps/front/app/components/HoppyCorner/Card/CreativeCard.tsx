import { twMerge as tm } from 'tailwind-merge';
import { Creatives } from '@/app/lib/types';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';

interface Props {
  post: Creatives;
  className?: string;
  cardClassName?: string;
}

const CreativeCard = ({ post, className = '', cardClassName = '' }: Readonly<Props>) => {
  const { Title, CreativeImage, UserImage, Slogan } = post;
  return (
    <Container>
      <InnerContainer className='relative px-4  lg:!mb-0'>
        <div className={tm(`group flex flex-col  space-y-8`, className)}>
          <div className={tm(`  mx-auto mt-10 md:mt-0  ${cardClassName}`)}>
            <StrapiImage
              src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
              alt='Creative illustration'
              width={425}
              height={330}
              className={tm(
                `hidden max-h-[26rem] h-80 w-80 xl:block object-cover border border-neutral-100 shadow-sm rounded-[.75rem]`
              )}
            />

            <StrapiImage
              src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
              alt='Creative illustration'
              width={345}
              height={330}
              className={tm(
                ` hidden max-h-[26rem] h-80 w-80 lg:max-xl:block object-cover border border-neutral-200 rounded-[.75rem]`
              )}
            />

            <StrapiImage
              src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
              alt='Creative illustration'
              width={354}
              height={201}
              className={tm(
                ` hidden md:max-lg:block h-80 w-80 object-cover border border-neutral-100 shadow-sm rounded-[1.25rem]`
              )}
            />

            <StrapiImage
              src={CreativeImage?.data?.attributes?.url ?? '/images/blog/placeholder.png'}
              alt='Creative illustration'
              width={425}
              height={330}
              className={tm(` md:hidden h-80 w-80 object-cover border border-neutral-100 shadow-sm rounded-[1.25rem]`)}
            />

            <div className={tm('flex flex-wrap gap-1 mt-3 justify-between items-center mr-6')}>
              <p className=' line-clamp-1 text-ellipsis max-w-[calc(100%-48px)]'>{Title}</p>
              {UserImage?.data?.attributes?.url && (
                <StrapiImage
                  src={UserImage?.data?.attributes?.url}
                  alt={UserImage?.data?.attributes.alternativeText || 'User Avatar'}
                  width={30}
                  height={30}
                />
              )}
            </div>
            <h1
              className={tm(
                'text-heading-h4 md:text-heading-sm text-center font-bold font-heading mt-4',
                'w-full  md:max-lg:max-w-[416px] lg:max-w-[416px] text-left md:leading-10	'
              )}>
              {Slogan}
            </h1>
          </div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default CreativeCard;
