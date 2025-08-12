import Container from '@/app/components/Common/Container';
import FaqList from '@/app/components/Common/Faq/FaqList';
import Button from '@/app/components/Common/Button';
import { FaqType, StrapiButton } from '@/app/lib/types';

interface Props {
  data: {
    Title: string;
    Faqs: FaqType[];
    Button?: StrapiButton;
  };
}

const Faq = ({ data }: Readonly<Props>) => (
  <Container className='justify-between relative xl:justify-between lg:flex my-[4.5rem]'>
    <div className='lg:max-w-[24.3125rem] xl:max-w-[34rem]'>
      <div className='sticky top-32 space-y-4 transition-all duration-300'>
        {!!data.Title && <h2 className='font-bold font-heading text-heading-lg-sm lg:text-heading-md'>{data.Title}</h2>}
      </div>
    </div>

    {!!data.Faqs && (
      <div className='flex flex-col mt-8 lg:mt-0 lg:w-[50.125rem] xl:w-[69.5rem]'>
        <FaqList faqs={data.Faqs} />
        {data.Button && (
          <div className='mt-8'>
            <Button
              text={data.Button.Text}
              variant='secondary'
              href={data.Button.Url}
              isExternal={data.Button.isExternal}
              className='w-full md:w-auto'
            />
          </div>
        )}
      </div>
    )}
  </Container>
);

export default Faq;
