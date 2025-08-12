import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Card from '@/app/components/TrustCenter/Security/Card';

interface Props {
  data: any;
}

const Security = ({ data = {} }: Readonly<Props>) => (
  <Container>
    <InnerContainer>
      <div>
        {data.Title && <h2 className='font-bold font-heading text-heading-lg-sm lg:text-heading-md'>{data.Title}</h2>}
      </div>

      {data.Securities?.length > 0 && (
        <div className='flex flex-col gap-y-10 mt-10 lg:gap-y-30 lg:mt-20'>
          {data.Securities.map((security: any) => (
            <Card key={security.id} security={security} />
          ))}
        </div>
      )}
      {/* TODO: move to a separate component or refactor globally */}
      {data.ContentWithImages?.length > 0 && (
        <div className='flex flex-col gap-y-10 mt-10 lg:gap-y-30 lg:mt-20'>
          {data.ContentWithImages.map((content: any) => (
            <Card key={content.id} security={content} />
          ))}
        </div>
      )}
    </InnerContainer>
  </Container>
);

export default Security;
