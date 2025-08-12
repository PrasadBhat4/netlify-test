import InnerContainer from '@/app/components/Common/InnerContainer';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { TestimonialSectionProps } from '@/app/lib/types';

const TestimonialSection = ({ data }: { data: TestimonialSectionProps }) => {
  return (
    <InnerContainer>
      <div className=' mx-auto'>
        {data?.SectionName && <p className='mb-4'>{data?.SectionName}</p>}
        {data?.Title && <h2 className='font-heading text-body-xl font-medium mb-3 leading-tight'>{data?.Title}</h2>}
        {data?.Description && <p className='mb-6 leading-relaxed'>{data?.Description}</p>}
        {data?.Testimonial && (
          <div className='border-l-2 border-neutral-400 pl-6 gap-y-5 flex flex-col'>
            <blockquote className='text-body-md-sm italic font-medium leading-relaxed'>{data?.Testimonial}</blockquote>
            <div className='flex items-center space-x-3'>
              {data?.Image?.data && (
                <div className='w-8 h-8  flex-shrink-0'>
                  <StrapiImage
                    src={data?.Image?.data?.attributes?.url}
                    alt='Client Logo'
                    className='rounded-full'
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {data?.NameAndPosition && (
                <div>
                  <p>{data?.NameAndPosition}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </InnerContainer>
  );
};

export default TestimonialSection;
