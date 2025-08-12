import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import CardList from '@/app/components/Common/TrustCenter/Card-Center/CardList';
import { formatString } from '@/app/lib/utils';
import Button from '@/app/components/Common/Button';

interface Props {
  data: any;
}

const TrustCenter = ({ data = {} }: Readonly<Props>) => {
  return (
    <Container>
      <InnerContainer>
        <div>
          {data.Title && (
            <h2
              className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg'
              dangerouslySetInnerHTML={{
                __html: formatString(data.Title, 'last', undefined, 'color'),
              }}
            />
          )}
          {data.Description && (
            <p className='text-body-xl-sm lg:text-body-xl mt-2 md:mt-4 lg:mt-6'>{data.Description}</p>
          )}
        </div>
      </InnerContainer>

      {data.Cards?.length > 0 && <CardList data={data.Cards} />}

      {data?.Button && (
        <InnerContainer className='flex justify-center md:justify-start mt-9 lg:mt-12'>
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
        </InnerContainer>
      )}
    </Container>
  );
};

export default TrustCenter;
