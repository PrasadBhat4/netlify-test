import InnerContainer from '@/app/components/Common/InnerContainer';
import AnimatedIntro from '@/app/components/AboutUs/AnimatedIntro';
import ShapeImage from '@/app/components/Common/ShapeImage';

interface Props {
  data: {
    intro1: string;
    intro2: string;
    intro3: string;
  };
}

const Intro = ({ data }: Readonly<Props>) => {
  return (
    <InnerContainer className='relative px-4 !mb-56 lg:!mb-0'>
      <div className='max-h-20 max-w-20'>
        <ShapeImage shape='terminal-sm' h={80} w={80} className='w-full ' />
      </div>
      <div className='flex flex-col justify-between gap-6 lg:gap-10 xl:gap-[19rem] md:flex-row mt-4'>
        {data?.intro1 && <p className='flex-1 font-semibold text-body-xl-sm lg:text-body-xl'>{data.intro1}</p>}
        {data?.intro2 && <p className='flex-1 text-body-md-sm lg:text-body-md'>{data.intro2}</p>}
      </div>
      {data?.intro3 && <AnimatedIntro data={data?.intro3} />}

      <div className='hidden lg:block absolute bottom-[-9.47rem] right-0 max-w-[22rem] max-h-[22rem]'>
        <ShapeImage shape='halfmoon-2' h={352} w={352} className='w-full h-full' />
      </div>
      <div className='lg:hidden absolute -bottom-56 right-0 max-w-[14.5rem] max-h-[14.5rem]'>
        <ShapeImage shape='halfmoon-2' h={232} w={232} className='w-full h-full' />
      </div>
    </InnerContainer>
  );
};

export default Intro;
