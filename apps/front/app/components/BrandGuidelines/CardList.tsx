'use client';

import Card, { BrandCardData } from '@/app/components/BrandGuidelines/Card';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Container from '@/app/components/Common/Container';

interface TitleSection {
  Title?: string;
  Category?: string;
}

const CardList = ({ cards, titleSection }: { cards: BrandCardData[]; titleSection?: TitleSection }) => {
  return (
    <Container className='!mt-14 md:!mt-14'>
      <InnerContainer>
        <div className=' md:p-4 bg-gray-900 '>
          <h2 className='font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-md lg:text-heading-xl-sm max-h-[15.2rem] overflow-hidden'>
            {titleSection?.Title}
          </h2>
          <p className='mt-4 text-body-xl-sm font-[400]'>{titleSection?.Category}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-24'>
            {cards.map(card => {
              return (
                <div key={card.id}>
                  <Card data={card} />
                </div>
              );
            })}
          </div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default CardList;
