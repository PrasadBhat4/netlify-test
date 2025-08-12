'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Container from '@/app/components/Common/Container';
import Image from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import { StrapiButton, StrapiSimpleHero } from '@/app/lib/types';
import 'swiper/css/autoplay';
import 'swiper/css';

interface Props {
  data: StrapiSimpleHero;
}

const SLIDES_PER_VIEW = 1;
const AUTOPLAY_DELAY = 3000;

const Hero = ({ data }: Readonly<Props>) => {
  return (
    <Container className='mt-4 md:mt-10'>
      <div className='flex flex-col md:py-0 lg:pt-0 lg:gap-x-6 lg:flex-row items-center justify-between px-6 md:p-20 lg:px-[4rem] lg:py-[7rem] xl:p-20 rounded-[2rem] md:rounded-[5rem] overflow-hidden'>
        <div className='flex flex-col self-start items-center md:items-start lg:w-[40%] xl:max-w-[45.6875rem]'>
          <h1 className='mt-[40px] font-bold font-heading text-heading-lg-sm md:text-heading-xl-sm text-neutral-900 dark:text-neutral-0 max-h-[16rem] overflow-hidden'>
            {data?.Title}
          </h1>
          <h2 className='mt-6 font-normal lg:mt-4 xl:mt-6 font-heading md:text-start text-body-md lg:text-body-xl-sm text-neutral-900 dark:text-neutral-0'>
            {data?.Description}
          </h2>
          <div className='flex flex-col items-center w-full mt-10 md:flex-row md:gap-6 md:mt-6'>
            {data?.Buttons?.map((button: StrapiButton, index: number) => (
              <>
                {index === 0 && (
                  <Button
                    text={button?.Text}
                    variant='primary'
                    href={button?.Url}
                    isExternal={button?.isExternal}
                    key={button?.id}
                    className='w-full md:w-auto'
                    arrowPosition='right'
                  />
                )}
                {index === 1 && (
                  <Button
                    text={button?.Text}
                    variant='buttonLink'
                    href={button?.Url}
                    isExternal={button?.isExternal}
                    key={button?.id}
                    className='w-full mt-6 md:w-auto md:mt-0'
                    arrowPosition='right'
                  />
                )}
              </>
            ))}
          </div>
        </div>
        <div className='w-full lg:max-w-[60%] mt-6 lg:mt-0 dark:hidden'>
          <Swiper slidesPerView={SLIDES_PER_VIEW} autoplay={{ delay: AUTOPLAY_DELAY }} modules={[Autoplay]}>
            {data.CarouselWithTooltips.map((item: StrapiButton) => {
              return (
                <SwiperSlide key={item?.id} className='relative mt-[21px]'>
                  <Image
                    src={item?.Image?.data?.attributes?.url ?? ''}
                    alt={item?.Image?.data?.attributes?.alternativeText ?? ''}
                    title={item?.Image?.data?.attributes?.alternativeText ?? ''}
                    height={item?.Image?.data?.attributes?.height ?? 0}
                    width={item?.Image?.data?.attributes?.width ?? 0}
                    className='w-full border rounded-md border-cream-600 shadow-cream-600'
                  />
                  {item?.Text && (
                    <div className='absolute flex items-center gap-[24px] top-[-20px] rounded-[20px] right-[20px] p-6 text-orange-500 bg-pink-400 border border-cream-600 font-bold font-heading'>
                      <div className='w-[16px] h-[32px] rounded-[232px] bg-noise-pattern inline-block' />
                      {item?.Text}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className='w-full lg:max-w-[60%] mt-6 lg:mt-0 hidden dark:block'>
          <Swiper slidesPerView={SLIDES_PER_VIEW} autoplay={{ delay: AUTOPLAY_DELAY }} modules={[Autoplay]}>
            {data.CarouselWithTooltipsDark.map((item: StrapiButton) => {
              return (
                <SwiperSlide key={item?.id} className='relative mt-[21px]'>
                  <Image
                    src={item?.Image?.data?.attributes?.url ?? ''}
                    alt={item?.Image?.data?.attributes?.alternativeText ?? ''}
                    title={item?.Image?.data?.attributes?.alternativeText ?? ''}
                    height={item?.Image?.data?.attributes?.height ?? 0}
                    width={item?.Image?.data?.attributes?.width ?? 0}
                    className='w-full border rounded-md border-neutral-800'
                  />
                  {item?.Text && (
                    <div className='absolute flex items-center gap-[24px] top-[-20px] rounded-[20px] right-[20px] p-6 text-orange-500 bg-pink-400 border border-neutral-800 font-bold font-heading'>
                      <div className='w-[16px] h-[32px] rounded-[232px] bg-noise-pattern inline-block' />
                      {item?.Text}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
