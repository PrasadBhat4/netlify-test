import Container from '@/app/components/Common/Container';
import Card from '@/app/components/HelpDesk/LinkCard';
import { StrapiCard } from '@/app/lib/types';

interface Props {
  data: StrapiCard[];
  className?: string;
}

const CardList = ({ data, className = '' }: Readonly<Props>) => (
  <Container className={`${className}`}>
    <div className='flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6'>
      {data?.map((content: StrapiCard, index: number) => (
        <div
          className={`${
            index === 2 || index === 3 ? 'mt-10 md:mt-16 lg:mt-[4.75rem] xl:mt-[5.5rem]' : ''
          } md:basis-1/2-gap-6`}
          key={content.id}>
          {index > 2 && <div className='w-full h-px bg-cream-500 dark:bg-neutral-700 md:hidden' />}
          <Card card={content} index={index} {...(index < 2 && { withWhiteBg: true, withColoredShadow: true })} />
        </div>
      ))}
    </div>
  </Container>
);

export default CardList;
