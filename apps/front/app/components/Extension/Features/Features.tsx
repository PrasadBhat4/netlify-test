import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Card from '@/app/components/Extension/Benefits/Card';
import Button from '@/app/components/Common/Button';

interface Props {
  data: any;
}

const Benefits = ({ data = {} }: Readonly<Props>) => (
  <Container className='!mt-16'>
    <InnerContainer>
      <div>
        {data?.Title && (
          <h2 className='font-bold text-center font-heading text-heading-lg-sm lg:text-heading-md'>{data.Title}</h2>
        )}
      </div>

      {data?.Benefits?.length > 0 && (
        <div className='flex flex-col gap-y-10 mt-10 lg:gap-y-14 lg:mt-20 justify-center'>
          {data.Benefits.map((security: any) => (
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
      <div className='w-full md:w-auto justify-center mt-12 lg:justify-start'>
        {data?.Button && (
          <Button
            text={data.Button.Text}
            variant='primary'
            href={data.Button.Url}
            isExternal={data.Button.isExternal}
            arrowPosition='right'
            className='w-full md:w-auto'
          />
        )}
      </div>
    </InnerContainer>
  </Container>
);

export default Benefits;
