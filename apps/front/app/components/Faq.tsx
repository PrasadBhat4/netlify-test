'use client';

import { Suspense, useState } from 'react';
import Container from '@/app/components/Common/Container';
import CategoriesFilter from '@/app/components/Common/CategoriesFilter';
import FaqList from '@/app/components/Common/Faq/FaqList';
import { FaqType } from '@/app/lib/types';
import { INITIAL_ACTIVE_CATEGORY } from '@/app/lib/constants';

interface Props {
  data: FaqType[];
}

const Faq = ({ data = [] }: Readonly<Props>) => {
  const [initialData, setInitialData] = useState(data);
  const categories = data?.reduce((acc: string[], item: FaqType) => {
    if (!acc?.includes(item.Category)) {
      acc.push(item.Category);
    }
    return acc;
  }, []);

  const uniqueCategories = new Set(categories);
  const categoriesArray: string[] = ['All'];
  uniqueCategories.forEach((value: string) => categoriesArray.push(value));

  const categoryHandler = (category: string) => {
    if (category === INITIAL_ACTIVE_CATEGORY) setInitialData(data);
    else {
      const filteredData = data.filter((item: FaqType) => item.Category === category);
      setInitialData(filteredData);
    }
  };

  return (
    <Container className='!mt-[5.5rem]'>
      <div className='mx-auto w-full lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
        <Suspense>
          <CategoriesFilter categoryHandler={categoryHandler} categories={categoriesArray} withBackground />
        </Suspense>
        {!!data && <FaqList faqs={initialData} className='mt-8' />}
      </div>
    </Container>
  );
};

export default Faq;
