'use client';

import Container from '@/app/components/Common/Container';
import FaqList from '@/app/components/Common/Faq/FaqList';
import { SolutionFaqItem } from '@/app/lib/types';

interface Props {
  data: SolutionFaqItem;
}

const Faq = ({ data }: Readonly<Props>) => {
  return (
    <Container className='my-[4.5rem]'>
      <h2 className='font-bold text-center font-heading text-heading-lg-sm lg:text-heading-md'>{data.Title}</h2>
      <div className='mx-auto w-full lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
        {!!data && <FaqList faqs={data?.Faqs} className='mt-8' />}
      </div>
    </Container>
  );
};

export default Faq;
