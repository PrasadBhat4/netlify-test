import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import CardList from '@/app/components/Common/TrustCenter/Card-Center/CardList';

interface Props {
  data: any;
}

const SecurityDevelopment = ({ data = {} }: Readonly<Props>) => (
  <Container>
    <InnerContainer>
      <div className='md:w-[44rem] lg:w-[48.375rem] xl:w-auto'>
        {data.Title && <h2 className='font-bold font-heading text-heading-md-sm lg:text-heading-md'>{data.Title}</h2>}
      </div>
    </InnerContainer>

    {data.Cards?.length > 0 && <CardList data={data?.Cards} />}
  </Container>
);

export default SecurityDevelopment;
