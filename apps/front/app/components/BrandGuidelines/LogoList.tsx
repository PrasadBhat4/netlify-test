'use client';

import InnerContainer from '@/app/components/Common/InnerContainer';
import Container from '@/app/components/Common/Container';
import LogoGuidelines, { LogoLayoutData } from './LogoGuidelines';

const LogoList = ({ logos }: { logos: LogoLayoutData }) => {
  return (
    <Container className='!mt-20'>
      <InnerContainer>
        <div className=' md:p-4 bg-gray-900 '>
          <h2 className='font-bold text-center font-heading md:text-start text-heading-lg-sm md:text-heading-md lg:text-heading-xl-sm max-h-[15.2rem] overflow-hidden'>
            {logos?.Title}
          </h2>
          <p className='mt-4 text-body-xl-sm font-[400]'>{logos?.Description}</p>
          <div className='gap-24 md:gap-16'>
            {logos?.LogoLayoutCard?.map((card, index) => {
              return (
                <div key={card.id}>
                  <LogoGuidelines data={card} showCloseIcon={index === 1} />
                </div>
              );
            })}
          </div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default LogoList;
