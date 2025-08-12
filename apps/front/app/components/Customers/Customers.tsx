/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import Tooltip from '@/app/components/Common/Tooltip';
import { formatString } from '@/app/lib/utils';
import 'swiper/css';

export const SWIPER_CONFIG = {
  speed: 500,
  spaceBetween: 0,
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  modules: [Navigation],
  navigation: { nextEl: '.arrow-right', prevEl: '.arrow-left' },
};

interface Props {
  data: any;
}

const Customers = ({ data = {} }: Readonly<Props>) => {
  const [sliderChunk, setSliderChunk] = useState(8);

  const chunkedArray = data?.Images?.data?.reduce((acc: any[][], current: any, index: number) => {
    const chunkIndex = Math.floor(index / sliderChunk);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(current);
    return acc;
  }, []);
  const chunkedArrayDark = data?.ImagesDark?.data?.reduce((acc: any[][], current: any, index: number) => {
    const chunkIndex = Math.floor(index / sliderChunk);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(current);
    return acc;
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1425) {
      setSliderChunk(18);
      return;
    }
    if (window.innerWidth >= 834) {
      setSliderChunk(15);
      return;
    }
    setSliderChunk(8);
  }, []);

  return (
    <Container>
      <div className='flex flex-col md:items-center'>
        <h2
          className='w-3/4 font-medium md:text-center lg:w-full font-heading md:text-heading-md sm:text-heading-sm text-heading-sm-sm'
          dangerouslySetInnerHTML={{
            __html: formatString(data.Title, 2, data.Title.length, 'color'),
          }}
        />

        <div className='relative block w-full mt-10 md:mt-6 lg:mt-8 dark:hidden'>
          <Swiper {...SWIPER_CONFIG} className={`!pb-[15px] dark:pb-0 ${data?.Grayscale ? 'grayscale' : ''} `}>
            {chunkedArray?.map((slide: any) => (
              <SwiperSlide key={slide?.id}>
                <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 rows-3 gap-y-6 md:gap-0'>
                  {slide.map((item: any) => (
                    <div
                      className='relative flex items-center justify-center min-h-[3.75rem] max-h-[3.75rem] md:min-h-[5rem] md:max-h-[5rem] md:max-w-[9.25rem] lg:min-h-[8.75rem] lg:max-h-[8.75rem] lg:max-w-[14rem] xl:max-w-[17.5rem]'
                      key={item?.id}>
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={148}
                        height={60}
                        alt={item?.attributes?.alternativeText}
                        className='hidden object-contain object-center m-auto max-h-20 peer xl:block'
                      />
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={148}
                        height={60}
                        alt={item?.attributes?.alternativeText}
                        className='hidden object-contain object-center m-auto max-h-20 peer lg:max-xl:block'
                      />
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={102}
                        height={42}
                        alt={item?.attributes?.alternativeText}
                        className='hidden object-contain object-center max-h-[2.625rem] m-auto peer md:max-lg:block'
                      />
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={150}
                        height={60}
                        alt={item?.attributes?.alternativeText}
                        className='object-contain object-center max-h-[3.75rem] m-auto peer md:hidden'
                      />
                      {item?.attributes?.caption && <Tooltip text={item?.attributes?.caption} />}
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='absolute right-0 flex items-center justify-between gap-x-6 -top-[4.5rem] md:top-[17rem] lg:right-16 lg:top-[28rem]'>
            <div className='[&_.swiper-button-lock]:hidden'>
              <Image
                src='/images/icons/arrow-right-orange.svg'
                width={24}
                height={24}
                alt='arrow-left'
                className='w-6 h-6 rotate-180 cursor-pointer arrow arrow-left'
              />
            </div>
            <div className='[&_.swiper-button-lock]:hidden'>
              <Image
                src='/images/icons/arrow-right-orange.svg'
                width={24}
                height={24}
                alt='arrow-right'
                className='w-6 h-6 cursor-pointer arrow arrow-right'
              />
            </div>
          </div>
        </div>
        <div className='relative hidden w-full mt-10 md:mt-6 lg:mt-8 dark:block'>
          <Swiper
            {...SWIPER_CONFIG}
            navigation={{ nextEl: '.arrow-right-dark', prevEl: '.arrow-left-dark' }}
            className={`hidden dark:block dark:!pb-[15px] ${data?.Grayscale ? 'grayscale' : ''} `}>
            {chunkedArrayDark?.map((slide: any) => (
              <SwiperSlide key={slide?.id}>
                <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 rows-3 gap-y-6 md:gap-0'>
                  {slide.map((item: any) => (
                    <div
                      className='relative flex items-center justify-center min-h-[3.75rem] max-h-[3.75rem] md:min-h-[5rem] md:max-h-[5rem] md:max-w-[9.25rem] lg:min-h-[8.75rem] lg:max-h-[8.75rem] lg:max-w-[14rem] xl:max-w-[17.5rem]'
                      key={item?.id}>
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={148}
                        height={60}
                        alt={item?.attributes?.alternativeText}
                        className='hidden object-contain object-center m-auto max-h-20 peer xl:block'
                      />
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={148}
                        height={60}
                        alt={item?.attributes?.alternativeText}
                        className='hidden object-contain object-center m-auto max-h-20 peer lg:max-xl:block'
                      />
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={102}
                        height={42}
                        alt={item?.attributes?.alternativeText}
                        className='hidden object-contain object-center max-h-[2.625rem] m-auto peer md:max-lg:block'
                      />
                      <StrapiImage
                        src={item?.attributes?.url}
                        width={150}
                        height={60}
                        alt={item?.attributes?.alternativeText}
                        className='object-contain object-center max-h-[3.75rem] m-auto peer md:hidden'
                      />
                      {item?.attributes?.caption && <Tooltip text={item?.attributes?.caption} />}
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='absolute right-0 flex items-center justify-between gap-x-6 -top-[4.5rem] md:top-[17rem] lg:right-16 lg:top-[28rem]'>
            <div className='[&_.swiper-button-lock]:hidden'>
              <Image
                src='/images/icons/arrow-right-orange.svg'
                width={24}
                height={24}
                alt='arrow-left'
                className='w-6 h-6 rotate-180 cursor-pointer arrow arrow-left-dark'
              />
            </div>
            <div className='[&_.swiper-button-lock]:hidden'>
              <Image
                src='/images/icons/arrow-right-orange.svg'
                width={24}
                height={24}
                alt='arrow-right'
                className='w-6 h-6 cursor-pointer arrow arrow-right-dark'
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Customers;
