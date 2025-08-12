'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { twMerge as tm } from 'tailwind-merge';
import 'swiper/css';
import 'swiper/css/autoplay';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiImage as StrapiImageInterface } from '@/app/lib/types';

export const SWIPER_CONFIG = {
  speed: 5000,
  spaceBetween: 24,
  slidesPerView: 3.5,
  grabCursor: false,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    stopOnLastSlide: false,
    waitForTransition: true,
  },
  modules: [Autoplay],
  breakpoints: {
    834: {
      slidesPerView: 3.5,
      spaceBetween: 24,
    },
    1425: {
      slidesPerView: 10,
      spaceBetween: 32,
    },
  },
};

interface CustomerItem {
  id: string | number;
  Image?: StrapiImageInterface;
}

interface CarouselItems {
  Customers?: CustomerItem[];
  CustomersDark?: CustomerItem[];
}

interface Props {
  items: CarouselItems;
  className?: string;
}
const Carousel = ({ items, className = '' }: Readonly<Props>) => {
  const lightModeLogos = items?.Customers || [];
  const darkModeLogos = items?.CustomersDark?.length ? items.CustomersDark : lightModeLogos;

  if (!lightModeLogos?.length) return null;

  return (
    <Swiper {...SWIPER_CONFIG} className={tm('partners-carousel', className)}>
      {lightModeLogos?.map(item => (
        <SwiperSlide key={item.id} className='dark:hidden'>
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={136}
            height={56}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='object-contain object-center m-auto dark:hidden'
          />
        </SwiperSlide>
      ))}
      {darkModeLogos?.map(item => (
        <SwiperSlide key={item.id} className='hidden dark:block'>
          <StrapiImage
            src={item?.Image?.data?.attributes?.url}
            width={136}
            height={56}
            alt={item?.Image?.data?.attributes?.alternativeText}
            className='object-contain object-center m-auto hidden dark:block'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
