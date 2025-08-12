import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Button from '@/app/components/Common/Button';
import BigCard from '@/app/components/Home/Features/Cards/Big';
import MediumCard from '@/app/components/Home/Features/Cards/Medium';
import SmallCard from '@/app/components/Home/Features/Cards/Small';

interface Props {
  data: any;
}

const Features = ({ data = {} }: Readonly<Props>) => (
  <Container id='features'>
    <InnerContainer className='lg:max-xl:max-w-[68.25rem]'>
      {data?.Title && (
        <h2 className='flex justify-center self-center mb-14 font-bold font-heading text-heading-sm md:text-heading-md lg:text-heading-lg'>
          {data.Title}
        </h2>
      )}

      <div className='flex flex-wrap gap-6'>
        {data?.Features?.map((feature: any, index: number) => {
          if (index === 0 || index === 3 || index === 4)
            return <MediumCard data={feature} key={feature.id} index={index} />;
          if (index === 1 || index === 2 || index === 5)
            return <SmallCard data={feature} key={feature.id} index={index} />;
          if (index === 6) return <BigCard data={feature} key={feature.id} index={index} />;
          return <BigCard data={feature} key={feature.id} index={index} />;
        })}
      </div>
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

export default Features;
