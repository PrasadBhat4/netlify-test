'use client';

import { useEffect, useState } from 'react';
import { twMerge as tm } from 'tailwind-merge';
import { Post } from '@/generated/graphql';
import Carousel from '@/app/components/Blog/Carousel';
import Container from '@/app/components/Common/Container';

interface Props {
  title: {
    title: string;
    subtitle?: string;
  };
  items: Post[];
  className?: string;
  slidesPerView?: number;
  slidesPerViewTablet?: number;
  slidesPerViewDesktop?: number;
  showBrief?: boolean;
  applyOverlay?: boolean;
  isCaseStudy?: boolean;
}

const CategoryCarousel = ({
  title,
  items = [],
  className = '',
  slidesPerView = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  showBrief = false,
  applyOverlay = false,
  isCaseStudy = false,
}: Readonly<Props>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Container className='!mt-9 space-y-16 md:!p-0 lg:space-y-[6.25rem] md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      <div className={tm(`flex flex-col gap-y-6 lg:gap-y-10`, className)}>
        <h2 className='font-bold font-heading text-subtitle-sm md:text-heading-sm-sm lg:text-heading-md'>
          {title?.title}
        </h2>
        {title?.subtitle && (
          <h2 className='font-medium font-heading text-aqua-500 text-subtitle-sm md:text-heading-sm-sm lg:text-heading-sm mt-[-1rem] lg:mt-[-2rem]'>
            {title.subtitle}
          </h2>
        )}
        {isMounted ? (
          <Carousel
            items={items}
            slidesPerView={slidesPerView}
            slidesPerViewTablet={slidesPerViewTablet}
            slidesPerViewDesktop={slidesPerViewDesktop}
            showBrief={showBrief}
            applyOverlay={applyOverlay}
            isCaseStudy={isCaseStudy}
          />
        ) : (
          <div className='h-[450px] w-full' />
        )}
      </div>
    </Container>
  );
};

export default CategoryCarousel;
