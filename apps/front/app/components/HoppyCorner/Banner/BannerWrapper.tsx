'use client';

import BannerCard from '@/app/components/HoppyCorner/Banner/Banner';
import { BannerProps } from '@/app/lib/types';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Container from '@/app/components/Common/Container';

const BannerWrapper = ({ data }: BannerProps) => (
  <Container>
    <InnerContainer className='relative px-4  lg:!mb-0'>
      <BannerCard data={data} className=' p-6 md:p-10 md:gap-10 md:px-16' />
    </InnerContainer>
  </Container>
);

export default BannerWrapper;
