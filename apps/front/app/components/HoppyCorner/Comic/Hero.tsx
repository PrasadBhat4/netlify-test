import InnerContainer from '@/app/components/Common/InnerContainer';
import Container from '@/app/components/Common/Container';
import Share from '@/app/components/Blog/Internal/Share';
import { ComicHero, StrapiButton } from '@/app/lib/types';

interface Props {
  data: ComicHero;
  Socials: StrapiButton[];
}
const Hero = ({ data, Socials }: Readonly<Props>) => (
  <Container>
    <InnerContainer className='flex flex-col gap-6 md:flex-row md:items-center justify-between'>
      <h1 className='text-heading-sm w-full md:w-[70%] leading-[1.3] md:text-heading-md font-[500] text-balance font-heading text-neutral-900 dark:text-neutral-0'>
        {data?.title}
      </h1>
      <Share
        links={Socials}
        text={data?.Share}
        className=' w-[12rem] md:w-[15.5rem] xl:w-[19.375rem] justify-around'
        iconClassName='justify-around'
      />
    </InnerContainer>
  </Container>
);
export default Hero;
