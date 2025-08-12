import InnerContainer from '@/app/components/Common/InnerContainer';
import Card from '@/app/components/Common/TrustCenter/Card';

interface Props {
  data: any;
}

const CardList = ({ data }: Readonly<Props>) => (
  <InnerContainer className='mt-[4.5rem]'>
    <div className='flex flex-col w-full gap-4 lg:flex-row lg:justify-space-between'>
      {data?.map((content: any) => (
        <Card card={content} key={content.id} />
      ))}
    </div>
  </InnerContainer>
);

export default CardList;
