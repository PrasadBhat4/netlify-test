'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { twMerge as tm } from 'tailwind-merge';
import 'swiper/css';

import Card from '@/app/components/Blog/Card';
import { Post } from '@/generated/graphql';
import { useWindowSize } from '@/hooks/useWindowSize';

interface Props {
  items: Post[];
  className?: string;
  slidesPerView?: number;
  slidesPerViewTablet?: number;
  slidesPerViewDesktop?: number;
  showBrief?: boolean;
  applyOverlay?: boolean;
  isCaseStudy?: boolean;
}

const MOBILE_SCREEN = 550;
const TABLET_SCREEN = 834;
const DESKTOP_SCREEN = 1425;

const Carousel = ({
  items = [],
  className = '',
  slidesPerView = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  showBrief = true,
  applyOverlay = false,
  isCaseStudy = false,
}: Readonly<Props>) => {
  const { windowSize } = useWindowSize(MOBILE_SCREEN);
  const swiperRef = useRef<SwiperRef>(null);

  const swiperConfig = {
    speed: 500,
    spaceBetween: 24,
    slidesPerView,
    grabCursor: false,
    loop: true,
    breakpoints: {
      834: {
        slidesPerView: slidesPerViewTablet,
        spaceBetween: 24,
      },
      1425: {
        slidesPerView: slidesPerViewDesktop,
        spaceBetween: 40,
      },
    },
  };

  const hasPartialSlides = slidesPerViewDesktop % 1 !== 0;

  const minSlidersBeforeArrow = useMemo(() => {
    if (!windowSize) return slidesPerView;
    if (windowSize >= DESKTOP_SCREEN) return slidesPerViewDesktop;
    if (windowSize >= TABLET_SCREEN && windowSize < DESKTOP_SCREEN) return slidesPerViewTablet;
    return slidesPerView;
  }, [windowSize, slidesPerView, slidesPerViewTablet, slidesPerViewDesktop]);
  if (!items.length) return null;

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <div className='relative'>
      {minSlidersBeforeArrow < items.length ? (
        <div className='absolute right-0 flex items-center justify-between gap-x-6 -top-12 md:-translate-y-1/2 md:-inset-x-6 lg:-inset-x-10 md:top-1/2'>
          <div onClick={handlePrev}>
            <Image
              src='/images/icons/arrow-right-orange.svg'
              width={24}
              height={24}
              alt='arrow-left'
              className='w-6 h-6 rotate-180 cursor-pointer'
            />
          </div>
          <div onClick={handleNext}>
            <Image
              src='/images/icons/arrow-right-orange.svg'
              width={24}
              height={24}
              alt='arrow-right'
              className='w-6 h-6 cursor-pointer'
            />
          </div>
        </div>
      ) : null}

      <Swiper {...swiperConfig} className={tm('categories-carousel', className)} ref={swiperRef}>
        {items?.map((item: Post) => (
          <SwiperSlide key={item?.slug} className='!ml-px'>
            <Card post={item} showBrief={showBrief} isCaseStudy={isCaseStudy} />
          </SwiperSlide>
        ))}
      </Swiper>
      {hasPartialSlides && applyOverlay && (
        <div className='absolute top-0 right-0 z-10 w-96 h-full md:bg-gradient-to-l from-cream-300 dark:from-neutral-1000 pointer-events-none' />
      )}
    </div>
  );
};

export default Carousel;
