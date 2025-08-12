import InnerContainer from '@/app/components/Common/InnerContainer';
import Bullets from '@/app/components/Common/Bullets';
import { CaseBulletsProps } from '@/app/lib/types';

interface CaseBulletsComponentProps {
  data: CaseBulletsProps;
  isLast?: boolean;
}

const CaseBullets: React.FC<CaseBulletsComponentProps> = ({ data, isLast }) => {
  return (
    <InnerContainer>
      {data?.SectionName && <p className='mb-4'>{data?.SectionName}</p>}
      {data?.Title && <h2 className='font-heading text-body-xl font-medium mb-3 leading-tight'>{data?.Title}</h2>}
      {data?.Description && <p className='mb-6 leading-relaxed'>{data?.Description}</p>}
      {data?.Bullets && <Bullets items={data?.Bullets} className='space-y-4' />}
      {!isLast && <div className='w-[90%] md:w-[80%] h-[2px] my-6 md:my-10 bg-neutral-200 mx-auto' />}
    </InnerContainer>
  );
};

export default CaseBullets;
