import Container from '@/app/components/Common/Container';
import Plan from '@/app/components/Common/Plans/Plan';
import { formatString } from '@/app/lib/utils';

interface Props {
  data: any;
  className?: string;
}

const Plans = ({ data = {}, className = '' }: Readonly<Props>) => (
  <Container className={`${className}`}>
    {data?.Title && (
      <h2
        className='mb-10 lg:mb-[6.25rem] font-bold font-heading text-heading-lg-sm lg:text-heading-md'
        dangerouslySetInnerHTML={{
          __html: formatString(data.Title, 'last', data.Title.length, 'color'),
        }}
      />
    )}
    <div className='flex flex-col gap-4 lg:flex-row md:gap-8 lg:gap-6'>
      {data?.Plans?.map((plan: any) => (
        <Plan key={plan.id} data={plan} />
      ))}
    </div>
  </Container>
);

export default Plans;
