import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import Card from '@/app/components/Customers/Card';
import Button from '@/app/components/Common/Button';
import ShapeImage from '../Common/ShapeImage';
import { StrapiButton } from '@/app/lib/types';

interface Props {
  data: {
    Cases: any;
    Button: StrapiButton;
  };
}

const CaseStudies = ({ data }: Readonly<Props>) => (
  <Container>
    <div className='relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mx-auto w-full lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      <Image
        src='/images/shapes/circle1.png'
        alt='shape'
        width={249}
        height={249}
        className='hidden md:block absolute -z-10 -left-28 -top-[1.875rem] object-cover'
        priority
      />

      <div className='absolute -z-10 -right-[3.25rem] bottom-[10rem] md:right-[-4rem] md:bottom-[16rem] lg:-right-[5rem] lg:bottom-[14.5rem] xl:bottom-[18rem] max-w-[4.5rem] max-h-[9.125rem] lg:max-w-[6.0625rem] lg:max-h-[12.25rem]'>
        <ShapeImage
          shape='halfmoon-1'
          h={196}
          w={97}
          className='hidden object-cover w-full h-full rotate-180 xl:block'
        />
        <ShapeImage
          shape='halfmoon-1'
          h={196}
          w={97}
          className='hidden object-cover w-full h-full rotate-180 lg:max-xl:block'
        />
        <ShapeImage
          shape='halfmoon-1'
          h={146}
          w={72}
          className='hidden object-cover w-full h-full rotate-180 md:max-lg:block'
        />
      </div>

      {data?.Cases?.length > 0 && data?.Cases?.map((cases: any) => <Card key={cases?.id} cases={cases} />)}
    </div>
    <div className='flex justify-center mt-[3.25rem] lg:mt-20'>
      <Button
        className='text-neutral-900'
        text={data?.Button?.Text}
        variant='secondary'
        href={data?.Button?.Url}
        isExternal={data?.Button?.isExternal}
        arrowPosition='right'
        key={data?.Button?.id}
      />
    </div>
  </Container>
);

export default CaseStudies;
