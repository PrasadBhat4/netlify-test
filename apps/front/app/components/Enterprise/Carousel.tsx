'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Card from '@/app/components/Enterprise/Card';

export const SWIPER_CONFIG = {
  speed: 500,
  spaceBetween: 24,
  slidesPerView: 1,
  grabCursor: false,
  loop: true,
};

interface Props {
  items: any;
  className?: string;
}

const MIN_ITEMS_BEFORE_SHOW_ARROW = 1;

const Carousel = ({ items = [] }: Readonly<Props>) => {
  const swiperRef = useRef<SwiperRef>(null);
  if (!items.length) return null;

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <div className='relative '>
      <div className='relative mx-auto md:max-w-[26.25rem] lg:max-w-[34rem]'>
        <Swiper {...SWIPER_CONFIG} ref={swiperRef} className='!h-fit'>
          {items?.map((testimonial: any) => (
            <SwiperSlide key={testimonial?.id}>
              <Card testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
        {items?.length > MIN_ITEMS_BEFORE_SHOW_ARROW ? (
          <div className='absolute right-0 flex items-center justify-between gap-x-6 -top-6 md:top-[40.5rem]'>
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
      </div>

      <Image
        src='/images/shapes/double-halfmoon-smaller1.png'
        alt='shape'
        width={400}
        height={470}
        className='absolute -bottom-16 -left-28 md:-bottom-24 md:-left-8 lg:left-0 xl:left-20 xl:-bottom-20 max-w-[10.0625rem] max-h-[11.875rem] md:max-w-[18.5rem] md:max-h-[21.75rem]  lg:max-w-full lg:max-h-full object-cover'
        priority
      />
      <Image
        src='/images/shapes/circle-square1.png'
        alt='shape'
        width={400}
        height={400}
        className='absolute top-4 -right-6 md:top-8 md:right-0 lg:-top-8 lg:right-0 xl:right-32 max-w-[11.6875rem] md:max-w-[19.625rem] lg:max-w-full object-cover'
        priority
      />
    </div>
  );
};

export default Carousel;
