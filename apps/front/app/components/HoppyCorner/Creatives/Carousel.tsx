'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { twMerge as tm } from 'tailwind-merge';
import 'swiper/css';

import Card from '@/app/components/HoppyCorner/Creatives/Card';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Creative, Creatives } from '@/app/lib/types';
import { generateSocialLinksForHoppy } from '@/app/lib/utils';

export const SWIPER_CONFIG = {
  speed: 500,
  spaceBetween: 24,
  slidesPerView: 1,
  grabCursor: false,
  loop: true,
  breakpoints: {
    834: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1425: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};

interface Props {
  items: Creative;
  className?: string;
}

const MOBILE_SCREEN = 550;
const TABLET_SCREEN = 834;
const DESKTOP_SCREEN = 1425;

const SLIDES_PER_SCREEN = {
  [MOBILE_SCREEN]: 1,
  [TABLET_SCREEN]: 2,
  [DESKTOP_SCREEN]: 3,
};

const Carousel = ({ items, className = '' }: Readonly<Props>) => {
  const { windowSize } = useWindowSize(MOBILE_SCREEN);
  const swiperRef = useRef<SwiperRef>(null);
  const minSlidersBeforeArrow = useMemo(() => {
    if (!windowSize) return 1;
    if (windowSize >= DESKTOP_SCREEN) return SLIDES_PER_SCREEN[DESKTOP_SCREEN];
    if (windowSize >= TABLET_SCREEN && windowSize < DESKTOP_SCREEN) return SLIDES_PER_SCREEN[TABLET_SCREEN];
    return SLIDES_PER_SCREEN[MOBILE_SCREEN];
  }, [windowSize]);
  if (!items?.Creatives?.length) return null;

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <div className='relative'>
      {minSlidersBeforeArrow < items?.Creatives?.length ? (
        <div className='absolute right-1.5 left-2  flex items-center justify-between  top-[47%] md:-translate-y-1/2 md:-inset-x-14 md:-right-[2.5rem] lg:-inset-x-14 md:top-1/2'>
          <button
            type='button'
            className='flex h-10 w-10 items-center justify-center rounded-[4rem] bg-neutral-200 z-50 left-[0.5%] transform -translate-y-1/2'
            onClick={handlePrev}
            aria-label='Previous slide'>
            <Image
              src='/images/icons/arrow-right-black.svg'
              width={24}
              height={24}
              alt='Previous'
              className='w-6 h-6 rotate-180 cursor-pointer'
            />
          </button>
          <button
            type='button'
            aria-label='Next slide'
            className=' flex h-10 w-10 items-center justify-center rounded-[4rem] bg-neutral-200 z-50  left-[0.5%] transform -translate-y-1/2 '
            onClick={handleNext}>
            <Image
              src='/images/icons/arrow-right-black.svg'
              width={24}
              height={24}
              alt='Next'
              className='w-6 h-6 cursor-pointer'
            />
          </button>
        </div>
      ) : null}

      <Swiper {...SWIPER_CONFIG} className={tm('categories-carousel', className)} ref={swiperRef}>
        {items?.Creatives.filter(c => !c.IsQuote)?.map((item: Creatives) => {
          const updatedSocials = generateSocialLinksForHoppy(items?.Socials, item, undefined);
          return (
            <SwiperSlide key={item?.id} className='!ml-px'>
              <Card post={item} Socials={updatedSocials} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
