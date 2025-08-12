import InnerContainer from '@/app/components/Common/InnerContainer';
import { CaseConclusionProps } from '@/app/lib/types';
import ConclusionCard from '@/app/components/CaseStudy/Internal/ConclusionCard';

const Conclusion = ({ data }: { data: CaseConclusionProps }) => {
  return (
    <InnerContainer>
      {data?.SectionName && <p className='mb-4'>{data?.SectionName}</p>}
      {data?.Title && <h2 className='font-heading text-body-xl font-medium mb-3 leading-tight'>{data?.Title}</h2>}
      {data?.Description && <p className='mb-6 leading-relaxed'>{data?.Description}</p>}

      {data?.Conclusion && data?.Conclusion?.length > 0 && (
        <div className='flex flex-col md:flex-row gap-10 mt-8'>
          {data.Conclusion.map((conclusion, index) => (
            <ConclusionCard key={conclusion?.Title} conclusion={conclusion} isFirst={index === 0} />
          ))}
        </div>
      )}
    </InnerContainer>
  );
};

export default Conclusion;
