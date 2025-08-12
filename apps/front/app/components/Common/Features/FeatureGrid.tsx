import Container from '@/app/components/Common/Container';
import FeatureCardList from './FeatureCardList';
import Button from '@/app/components/Common/Button';

interface Props {
  data: any;
}

const FeatureGrid = ({ data = {} }: Readonly<Props>) => {
  return (
    <Container>
      {data.Title && (
        <h2 className='font-bold text-left font-heading text-heading-lg-sm lg:text-heading-md'>{data.Title}</h2>
      )}
      {data.Features?.length > 0 && <FeatureCardList data={data.Features} />}
      {data?.Button && (
        <div className='mx-auto lg:ml-0'>
          <Button
            text={data.Button.Text}
            variant='primary'
            href={data.Button.Url}
            isExternal={data.Button.isExternal}
            className='w-[21.4375rem] md:w-[18.9375rem] lg:w-auto'
            arrowPosition='right'
          />
        </div>
      )}
    </Container>
  );
};

export default FeatureGrid;
