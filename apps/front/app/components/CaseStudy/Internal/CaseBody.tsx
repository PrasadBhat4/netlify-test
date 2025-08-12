import InnerContainer from '@/app/components/Common/InnerContainer';
import { CaseBodyProps } from '@/app/lib/types';
import { MarkdownToHtml } from '../../markdown-to-html';

interface CaseBodyComponentProps {
  data: CaseBodyProps;
  isLast?: boolean;
}

const Body: React.FC<CaseBodyComponentProps> = ({ data, isLast }) => {
  return (
    <InnerContainer>
      <MarkdownToHtml className='!max-w-full' contentMarkdown={data?.Description} />
      {!isLast && <div className='w-[90%] md:w-[80%] h-[2px] !my-6 md:!my-10 bg-neutral-200 mx-auto' />}
    </InnerContainer>
  );
};

export default Body;
