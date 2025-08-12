import Container from '@/app/components/Common/Container';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 md:mt-10'>
    <div className='flex flex-col justify-center items-center'>
      {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
      {data.Title && (
        <h1 className='mt-6 font-bold text-center lg:mt-8 font-heading text-heading-lg-sm lg:text-heading-lg'>
          {data.Title}
        </h1>
      )}
    </div>
  </Container>
);

export default Hero;
