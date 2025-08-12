import StrapiImage from '@/app/components/Common/StrapiImage';
import { CaseStudyFeatureProps } from '@/app/lib/types';
import Container from '@/app/components/Common/Container';

const Features = ({ data }: { data: CaseStudyFeatureProps[] }) => {
  return (
    <Container className='py-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10  px-10 md:px-0'>
        {data?.map(feature => (
          <div key={feature?.id} className='flex flex-col items-start text-left p-4 space-y-8'>
            {feature?.Icon?.data && (
              <StrapiImage
                src={feature?.Icon?.data?.attributes?.url}
                alt='Feature icon'
                width={56}
                height={56}
                className='h-14 w-14 object-contain'
              />
            )}
            {feature?.Description && <p className=' text-left leading-relaxed'>{feature?.Description}</p>}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Features;
